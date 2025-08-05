from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, constr, EmailStr
from typing import Annotated, Optional
import bcrypt
import psycopg2 as pg
from psycopg2.extras import RealDictCursor
import jwt
from jwt import PyJWTError
import os
from chatapis import router as chat_router
from dotenv import load_dotenv
from datetime import timedelta, datetime, timezone
load_dotenv()

app = FastAPI()
app.include_router(chat_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_details = {
}

# create new user
class CreateUser(BaseModel):
    username: Annotated[str, constr(strip_whitespace=True, min_length=3)]
    password: Annotated[str, constr(min_length=6)]
    email: Optional[EmailStr] = None

@app.post("/register")
def register_new_user(user: CreateUser):
    try:
        # hash password
        hashed_pw = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        # connect to db
        conn = pg.connect(**db_details)
        cur = conn.cursor(cursor_factory=RealDictCursor)

        print(f"Connection: {cur}")
        # check if user exists
        cur.execute("SELECT id FROM public.users WHERE email = %s", (user.username,))
        if cur.fetchone():
            raise HTTPException(status_code=409, detail="Username already exists!")
        # if not, sql queries to insert new user with hashed password

        cur.execute("INSERT INTO public.users(username, email, hashed_pw) VALUES (%s, %s, %s);",
                    (user.username, user.email, hashed_pw)
                    )

        conn.commit()

        print(f"message: User {user.username} registered successfully")

        return{"message": "User registered successfully", "username": user.username} 
    
    except HTTPException:
        raise  # re-raise HTTP exceptions
    except pg.Error as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# login 
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/login")
def login(user: UserLogin):
    print("📥 Received login payload:", user)

    conn = pg.connect(**db_details)
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute("SELECT * FROM public.users WHERE email = %s;", (user.email,))
        db_user = cur.fetchone()
        print("Found DB user:", db_user)

        if not db_user:
            print("User not found")
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not bcrypt.checkpw(user.password.encode(), db_user["hashed_pw"].encode()):
            print("Password mismatch")
            raise HTTPException(status_code=401, detail="Invalid credentials")

        print("Credentials verified. Creating token...")
    
        access_token = jwt.encode(
            payload = {
                "sub": user.email,
                "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            },
            key=SECRET_KEY,
            algorithm=ALGORITHM
        )
        print("Token generated:", access_token)

        res = JSONResponse(content={
            "message": "Login successful",
            "email": user.email
        })
        res.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            max_age=3600,  
            secure=False,  # Set to True in production (requires HTTPS)
            samesite="Lax"
        )
        return res

    except Exception as e:
        print("Internal error during login:", str(e))
        raise HTTPException(status_code=500, detail="Server error")

    finally:
        cur.close()
        conn.close()


def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")

    try:
        payload = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        conn = pg.connect(**db_details)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT username FROM public.users WHERE email = %s;", (email,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {"email": email, "username": user["username"]}

    except PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@app.get("/profile")
def get_profile(current_user: dict = Depends(get_current_user)):
    return {
        "message": "Profile loaded",
        "email": current_user["email"],
        "username": current_user["username"]
    }


class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

@app.post("/change-password")
def change_password(data: PasswordChange, request: Request, current_user: dict = Depends(get_current_user)):
    if data.new_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    conn = pg.connect(**db_details)
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        # Fetch current hashed password
        cur.execute("SELECT hashed_pw FROM public.users WHERE email = %s;", (current_user["email"],))
        user = cur.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if not bcrypt.checkpw(data.current_password.encode(), user["hashed_pw"].encode()):
            raise HTTPException(status_code=401, detail="Current password is incorrect")

        new_hashed = bcrypt.hashpw(data.new_password.encode(), bcrypt.gensalt()).decode()

        cur.execute("UPDATE public.users SET hashed_pw = %s WHERE email = %s;", (new_hashed, current_user["email"]))
        conn.commit()

        return { "message": "Password updated successfully" }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error: " + str(e))

    finally:
        cur.close()
        conn.close()




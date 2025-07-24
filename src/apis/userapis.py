from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, constr, EmailStr
from typing import Annotated, Optional
import bcrypt
import psycopg2 as pg
from psycopg2.extras import RealDictCursor
import jwt
import time
import os
from dotenv import load_dotenv
from datetime import timedelta, datetime, timezone
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_details = {}

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
        cur.execute("SELECT id FROM moneytipstest.email WHERE email = %s", (user.username,))
        if cur.fetchone():
            raise HTTPException(status_code=409, detail="Username already exists!")
        # if not, sql queries to insert new user with hashed password

        cur.execute("INSERT INTO moneytipstest.users(username, email, hashed_pw) VALUES (%s, %s, %s);",
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
        cur.execute("SELECT * FROM moneytipstest.users WHERE email = %s;", (user.email,))
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
            payload={"sub": user.email},
            key=SECRET_KEY,
            algorithm=ALGORITHM
        )
        print("Token generated:", access_token)

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "username": user.email
        }

    except Exception as e:
        print("Internal error during login:", str(e))
        raise HTTPException(status_code=500, detail="Server error")

    finally:
        cur.close()
        conn.close()
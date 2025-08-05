from fastapi import HTTPException, APIRouter
from pydantic import BaseModel, field_validator
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File

router = APIRouter()
received_texts: List[str] = []


class TextInput(BaseModel):
    text: str

    @field_validator('text')
    @classmethod
    def validate_text(cls, v: str) -> str:
        if len(v) > 1000:
            raise ValueError('Text too long')
        if not v.strip():
            raise ValueError('Text cannot be empty')
        return v.strip()

@router.post("/receive_text")
async def receive_text(input: TextInput):
    try:
        received_texts.append(input.text)
        message = process_text_input(input.text)  
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/upload_file")
async def upload_file(file: UploadFile = File(...)):
    try:
        processed_file = await process_uploaded_file(file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return processed_file


@router.get("/display_received_texts")
def display_received_texts():
    return {"received_texts": received_texts}


def process_text_input(text: str) -> str:
    # function to simulate model processing user input
    return f"Model's response to query: {text}"


async def process_uploaded_file(file: UploadFile) -> dict:
    # function to handle files uploaded by user
    # For now, just return file metadata

    content = await file.read()

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(content)
    }







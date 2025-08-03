from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text

from gemini_client import get_improved_resume, get_tailored_resume, get_cover_letter

app = FastAPI()

# CORS config: allows frontend to connect to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],  # allows any frontend domain. '*' for any domains. Ex: "http://localhost:3000"
    allow_credentials = False,  # allows frontend to ask for credentials. Ex: Cookies
    allow_methods = ["*"],  # httmp methods like GET, POST, PUT
    allow_headers = ["*"]   # allow frontend to send HTTP headers that include metadata
)

@app.get("/")
def root():
    return {"message" : "Backend is running"}

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text(file.filename, contents)
    return {"filename": file.filename, "extracted text": text}

@app.post("/improve-resume/")
async def improve_resume(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text(file.filename, contents)
    gemini_response = get_improved_resume(text)
    return {"filename": file.filename, "improved_resume": gemini_response}
    
@app.post("/tailor-resume/")
async def tailor_resume(file_resume: UploadFile = File(...), file_job: UploadFile = File(...)):
    contents_resume = await file_resume.read()
    contents_job= await file_job.read()
    text_resume = extract_text(file_resume.filename, contents_resume)
    text_job = extract_text(file_job.filename, contents_job)
    gemini_response = get_tailored_resume(text_resume, text_job)
    return {"filename": file_resume.filename, "tailored_resume": gemini_response}
    
@app.post("/cover-letter/")
async def generate_cover_letter(file_resume: UploadFile = File(...), file_job: UploadFile = File(...)):
    contents_resume = await file_resume.read()
    contents_job= await file_job.read()
    text_resume = extract_text(file_resume.filename, contents_resume)
    text_job = extract_text(file_job.filename, contents_job)
    gemini_response = get_cover_letter(text_resume, text_job)
    return {"filename": file_resume.filename, "cover_letter": gemini_response}
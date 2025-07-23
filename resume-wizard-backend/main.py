from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text

app = FastAPI()

# CORS config: allows frontend to connect to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], # * for any domains. Ex: "http://localhost:3000"
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def root():
    return {"message" : "Backend is running"}

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text(file.filename, contents)
    return {"filename": file.filename, "extracted text": text}

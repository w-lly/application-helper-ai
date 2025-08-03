# **AI Application Helper**

An AI-powered tool that helps you improve and tailor your resume to specific job descriptions, and even generate personalized cover letters. The application uses **Gemini API** for resume improvements and provides helpful advice based on the resume content.

---

## **Project Overview**

This project consists of two main components:

1. **Backend (FastAPI)**: Handles file uploads, extracts text from resumes (PDF, DOCX), and integrates with Gemini API for text improvement and tailoring.
2. **Frontend (Next.js)**: A user-friendly interface that allows users to upload their resumes, enter job descriptions, and receive AI-driven improvements.

---

## **Features**

- **Resume Improvement**: Upload your resume (PDF or DOCX) and get it improved by the AI, focusing on grammar, clarity, and formatting.
- **Resume Tailoring**: Upload your resume along with a job description to tailor your resume for the specific role, highlighting relevant experiences and skills.
- **Cover Letter Generation**: Upload your resume and job description to generate a personalized cover letter, ensuring it's aligned with the job you're applying for.

---

## **Tech Stack**

- **Frontend**:  
  - **Next.js**: React-based framework for building the user interface
  - **TailwindCSS**: Utility-first CSS framework for styling
  - **`Link`**: For client-side navigation between pages in Next.js
  - **`ReactMarkdown`**: For rendering Markdown content in React components

- **Backend**:  
  - **FastAPI**: High-performance web framework for Python, used to handle the API requests
  - **Gemini API**: Used to process and improve resumes, generate tailored resumes, and create cover letters
  - **`PyMuPDF`**: For PDF file parsing
  - **`python-docx`**: For DOCX file parsing

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/application-helper-ai.git
cd application-helper-ai
```

### **2. Backend Setup**

* **Create a virtual environment**:
    ```bash
    python -m venv env
    env\Scripts\activate  # On Linux/macOS: source env/bin/activate
    ```

* **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

* **Set up your .env file** with your Gemini API key:
    Create a `.env` file in the `backend` folder and add:
    ```ini
    GEMINI_API_KEY=your-gemini-api-key-here
    ```

* **Run the backend**:
    ```bash
    uvicorn main:app --reload
    ```
    The backend should now be running at `http://localhost:8000`.

---

## **3. Frontend Setup**

* **Install frontend dependencies**:
    Navigate to the `frontend` directory:
    ```bash
    cd frontend
    npm install
    ```

* **Run the frontend**:
    ```bash
    npm run dev
    ```
    The frontend should now be running at `http://localhost:3000`.

---

## **Endpoints**

### **Backend Endpoints**:

1. **POST `/improve-resume/`**
    * **Description**: Upload a resume and receive improvements (grammar, clarity, and formatting).
    * **Request**:
        - `file`: Resume file (PDF or DOCX).
    * **Response**:
        - `improved_resume`: The improved resume text.

2. **POST `/tailor-resume/`**
    * **Description**: Upload a resume and a job description to tailor the resume.
    * **Request**:
        - `file`: Resume file (PDF or DOCX).
        - `job_desc`: Job description text.
    * **Response**:
        - `tailored_resume`: Tailored resume text.

3. **POST `/generate-cover-letter/`**
    * **Description**: Upload a resume and a job description to generate a personalized cover letter.
    * **Request**:
        - `file`: Resume file (PDF or DOCX).
        - `job_desc`: Job description text.
    * **Response**:
        - `cover_letter`: Generated cover letter text.

---

## **How It Works**

1. **User Uploads Resume**: The user uploads a resume in either PDF or DOCX format.
2. **AI Processing**: The backend sends the resume to the Gemini API for improvement, tailoring, or cover letter generation.
3. **Results**: The frontend displays the AI-generated output, such as an improved resume, tailored resume, or cover letter.

---

## **Example Use Cases**

- **Improving Resume**: Upload your resume to fix grammatical issues, improve wording, and enhance formatting.
- **Tailoring Resume to Job**: Upload both your resume and the job description to highlight the most relevant skills and experiences.
- **Generating Cover Letter**: Upload your resume and job description to generate a personalized cover letter that matches the job.

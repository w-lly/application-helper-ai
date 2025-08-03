import os
from dotenv import load_dotenv
from google import genai

# Load and get environment variables
load_dotenv()
model = os.getenv("MODEL", default="gemini-2.5-flash")
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

improve_resume_prompt = """You are a helpful assistant who improves resumes without adding or inventing information.
    Improve the wording and formatting of the resume below while keeping in mind space constraints.
    Do not use unnecessary line breaks and do not use horizontal lines.
    Note that there need to be multiple spaces before a linebreak for it to register properly. Ex: '  \n' instead of just '\n'.
    Also provide a separate bullet-point list of advice about wording or structure.

    Resume:
    {resume}

    Format the output in markdown as:

    ## ---Improved Resume---
    [Improved resume here]

    [horizontal line]
    ## ---Advice---
    * bullet 1
    * bullet 2
    """

    # return (
    #     "Please improve the wording and effectiveness of this resume."
    #     "Do not remake the resume or make up experiences or info. "
    #     "You should only improve the wording and formatting. "
    #     f"\n\n {text}"
    # )

tailor_resume_prompt = """You are a helpful assistant who tailors resumes based on a job description without adding or inventing information.
    Improve the wording and formatting of the resume below while keeping in mind space constraints.
    Tailor the resume using keywords, terminology, etc. 
    You may remove any unnecessary information (experience, skills, etc..) but do not hallucinate information or remove too much.
    Do not use unnecessary line breaks and do not use horizontal lines.
    Important: note that there need to be multiple spaces before a linebreak for it to register properly. Ex: '  \n' instead of just '\n'.
    Also provide a separate bullet-point list of advice about wording or structure.

    Resume:
    {resume}

    Job Description:
    {job_desciption}

    Format the output in markdown as follows:

    ## ---Tailored Resume---
    [Tailored resume here]

    [horizontal line]
    ## ---Advice---
    * bullet 1
    * bullet 2
    """

cover_letter_prompt = """You are a helpful assistant who generates a cover letter based on a resume and job description without adding or inventing information.
    Ensure the wording and formatting of the cover letter is consistent and not superfluous and keep in mind space constraints.
    Tailor using keywords, terminology, etc..
    You may omit any unnecessary information (experience, skills, etc..) but do not hallucinate information or remove too much.
    Do not use unnecessary line breaks and do not use horizontal lines.
    Important: note that there need to be multiple spaces before a linebreak for it to register properly. Ex: '  \n' instead of just '\n'.
    Also provide a separate bullet-point list of advice about wording, structure, or improvements on the user's end.

    Resume:
    {resume}

    Job Description:
    {job_desciption}

    Format the output in markdown as follows:

    ## ---Cover Letter---
    [Generated cover letter]

    [horizontal line]
    ## ---Advice---
    * bullet 1
    * bullet 2
    """

    

def get_improved_resume(text: str) -> str:
    # Use Gemini to improve the extracted resume text
    response = client.models.generate_content(
        model = model,
        contents = improve_resume_prompt.format(resume=text)
    )
    return response.text

def get_tailored_resume(resume: str, job: str) -> str:
    response = client.models.generate_content(
        model = model,
        contents = tailor_resume_prompt.format(resume=resume, job_desciption=job)
    )
    return response.text

def get_cover_letter(resume: str, job: str) -> str:
    response = client.models.generate_content(
        model = model,
        contents = cover_letter_prompt.format(resume=resume, job_desciption=job)
    )
    return response.text
import os
from dotenv import load_dotenv
from google import genai

# Load and get environment variables
load_dotenv()
model = os.getenv("MODEL", default="gemini-2.5-flash")
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def improve_resume_prompt(text):return f"""You are a helpful assistant who improves resumes without adding or inventing information.
    Improve the wording and formatting of the resume below while keeping in mind space constraints.
    Also provide a separate bullet-point list of advice about wording or structure.

    Resume:
    {text}

    Format the output as:

    ---Improved Resume---
    [Improved text here]

    ---Advice---
    - bullet 1
    - bullet 2
    """

    # return (
    #     "Please improve the wording and effectiveness of this resume."
    #     "Do not remake the resume or make up experiences or info. "
    #     "You should only improve the wording and formatting. "
    #     f"\n\n {text}"
    # )

    

def get_improved_resume(text: str) -> str:
    # Use Gemini to improve the extracted resume text
    response = client.models.generate_content(
        model = model,
        contents = improve_resume_prompt(text)
    )
    return response.text
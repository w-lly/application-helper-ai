import pymupdf 
from docx import Document
import io   # input/output
import re   # regular expression - for matching strings
import unicodedata  # for identifying invisible characters

def extract_text(filename: str, file_bytes: bytes) -> str:
    if (filename.endswith(".pdf")):
        pdf = pymupdf.open(stream=file_bytes, filetype="pdf")
        return clean_text("\n".join(page.get_text() for page in pdf))
    elif filename.endswith(".docx"):
        doc = Document(io.BytesIO(file_bytes))  # BytesIO creates data stream in memory -> no need to save file. Ex: open pdf in email vs saving locally
        return clean_text("\n".join(p.text for p in doc.paragraphs))
    else:
        return "Unsupported file type."

# invisible_characters = [
#     '\u00A0',             # non-breaking space
#     '\u2000-\u200A',      # en quad to hair space
#     '\x7F',               # Delete character (also Cc)
#     '\t', '\v', '\f'      # tabs, vertical tabs, form feed
# ]

def clean_text(text: str) -> str:
    text = ''.join(c for c in text if 'Cf' != unicodedata.category(c))  # remove invisible/formatting characters
    # text = re.sub(r'[' + ''.join(invisible_characters) + ']', '', text.strip())
    text = re.sub(r'[\s]*\n(?:[\s]*\n[\s]*)', '\n\n', text.strip())  # 2+ newlines with whitespace attached
    text = re.sub(r'[^\S\n]+', ' ', text)   # raw string matching not (^) [white space (\S) or newline] - all whitespace excpet for newlines
    return text
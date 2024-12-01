from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
from PyPDF2 import PdfReader

router = APIRouter(
    prefix="/pdf-text",
    tags=["pdf-text"]
)

class PDFInput(BaseModel):
    pdf_path: str

@router.post("/", response_model=dict)
def extract_pdf_text(input_data: PDFInput):
    print("Inside extract_pdf")
    pdf_path = Path(input_data.pdf_path)

    # Check if the file exists
    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="PDF file not found")

    # Check if the file is a PDF
    if pdf_path.suffix.lower() != ".pdf":
        raise HTTPException(status_code=400, detail="File is not a valid PDF")

    try:
        # Extract text from the PDF
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {str(e)}")

    return {"text": text}

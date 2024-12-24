from fastapi import APIRouter, File, UploadFile, HTTPException
import os
import httpx

router = APIRouter()

# Define the base directory explicitly
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_DIR = os.path.join(PROJECT_ROOT, "data")

RESUME_DIR = os.path.join(DATA_DIR, "resume")
JOB_DESCRIPTION_DIR = os.path.join(DATA_DIR, "jobDescription")

# Ensure the directories exist
os.makedirs(RESUME_DIR, exist_ok=True)
os.makedirs(JOB_DESCRIPTION_DIR, exist_ok=True)

PDF_TEXT_URL = "http://localhost:8000/pdf-text/"  

@router.post('/upload-files')
async def upload_files(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...)
):
    print(f"Received files: {resume.filename}, {job_description.filename}")

    # Save the resume file
    resume_content = await resume.read()
    resume_path = os.path.join(RESUME_DIR, resume.filename)
    with open(resume_path, 'wb') as f:
        f.write(resume_content)

    # Save the job description file
    # jd_content = await job_description.read()
    jd_path = os.path.join(JOB_DESCRIPTION_DIR, job_description.filename)
    # with open(jd_path, 'wb') as f:
    #     f.write(jd_content)

    print("pdf_path", resume_path)
    print("pdf_path", jd_path)

    async with httpx.AsyncClient() as client:
        # Process resume text
        try:
            print(f"Sending resume to {PDF_TEXT_URL}")
            resume_text_response = await client.post(
                PDF_TEXT_URL,
                headers={"Content-Type": "application/json"},
                json={"pdf_path": resume_path},
                timeout=10  
            )
            resume_text_response.raise_for_status()
            print(f"Resume API Response: {resume_text_response.status_code}, {resume_text_response.text}")
            resume_text = resume_text_response.json().get("text", "")
        except httpx.RequestError as e:
            print(f"Request error: {e}")
            raise HTTPException(status_code=500, detail="Error processing resume PDF file.")
        except httpx.HTTPStatusError as e:
            print(f"HTTP error: {e}")
            raise HTTPException(status_code=e.response.status_code, detail="Error from PDF text extraction service for resume.")

        # Conditionally process job description text only if it's not dummy and is a PDF
        job_description_text = ""
        print("jd_path : ",jd_path)
        if job_description.filename.lower() == "dummy_job_description.txt" or jd_path.lower().endswith(".pdf"):
            try:
                print(f"Sending job description to {PDF_TEXT_URL}")
                job_description_text_response = await client.post(
                    PDF_TEXT_URL,
                    headers={"Content-Type": "application/json"},
                    json={"pdf_path": jd_path},
                    timeout=10 
                )
                job_description_text_response.raise_for_status()
                print(f"Job Description API Response: {job_description_text_response.status_code}")
                job_description_text = job_description_text_response.json().get("text", "")
            except httpx.RequestError as e:
                print(f"Request error: {e}")
                raise HTTPException(status_code=500, detail="Error processing job description PDF file.")
            except httpx.HTTPStatusError as e:
                print(f"HTTP error: {e}")
                raise HTTPException(status_code=e.response.status_code, detail="Error from PDF text extraction service for job description.")
        else:
            print("Skipping job description PDF text extraction (dummy or not a PDF).")

    return {
        'message': 'Files uploaded successfully',
        'resume_path': resume_path,
        'job_description_path': jd_path,
        'resume_text': resume_text,
        'job_description_text': job_description_text
    }




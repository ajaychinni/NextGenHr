from fastapi import APIRouter, File, UploadFile
import os

router = APIRouter()

# Calculate the path to the 'data' directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, '..', 'data')

RESUME_DIR = os.path.join(DATA_DIR, 'resume')
JOB_DESCRIPTION_DIR = os.path.join(DATA_DIR, 'jobDescription')

# Ensure the directories exist
os.makedirs(RESUME_DIR, exist_ok=True)
os.makedirs(JOB_DESCRIPTION_DIR, exist_ok=True)

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
    jd_content = await job_description.read()
    jd_path = os.path.join(JOB_DESCRIPTION_DIR, job_description.filename)
    with open(jd_path, 'wb') as f:
        f.write(jd_content)

    return {'message': 'Files uploaded successfully'}

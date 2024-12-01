from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from ..sendEmail import send_email
import os

# Initialize router
router = APIRouter(
    prefix="/emailText",
    tags=["emailText"]
)

# Request model
class EmailRequest(BaseModel):
    email_address: EmailStr
    start_date: str  # Format: "YYYY-MM-DD"
    end_date: str  # Format: "YYYY-MM-DD"
    job_role: str
    job_description: str  # Path to the job description PDF

# Response model
class EmailResponse(BaseModel):
    email_text: str
    status: str

# Utility function to generate email text
def generate_email_text(job_role: str, start_date: str, end_date: str, job_description: str) -> str:
    """
    Generates a personalized email text for the candidate.
    """
    return (
        f"Dear Candidate,\n\n"
        f"Congratulations! Your resume has been shortlisted for the {job_role} role. "
        f"We are excited to move forward with the next steps in the hiring process.\n\n"
        f"Please select a any time slot (24 hours) from {start_date} to {end_date} that works best for you. "
        f"You can review the job description (JD) for more information here: {job_description}.\n\n\n\n"
        f"This will be an AI screening round where you will be asked a few introduction questions and one coding question. "
        f"We look forward to your participation.\n\n"
        f"Best regards,\nNextGenHr Team"
    )

@router.post("/generate", response_model=EmailResponse)
async def generate_email_text_handler(request_body: EmailRequest) -> EmailResponse:
    """
    API endpoint to generate and send a personalized email to the candidate.
    """
    email_text = generate_email_text(
        job_role=request_body.job_role,
        start_date=request_body.start_date,
        end_date=request_body.end_date,
        job_description=request_body.job_description,
    )

    sender_email = "nextgenhr247@gmail.com"
    sender_password = os.getenv("EMAIL_PASSWORD")  # Securely fetch from environment variables
    subject = f"Congratulations on being shortlisted for the {request_body.job_role} role!"

    email_sent = send_email(
        sender_email=sender_email,
        sender_password=sender_password,
        recipient_email=request_body.email_address,
        subject=subject,
        body=email_text,
    )

    status = "Email sent successfully" if email_sent else "Failed to send email"
    return EmailResponse(email_text=email_text, status=status)

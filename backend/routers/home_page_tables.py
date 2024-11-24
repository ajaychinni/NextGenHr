from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.application import Application
from ..models.interview import Interview
from ..models.job import Job
from ..models.candidate import Candidate

router = APIRouter(
    prefix="/tables",
    tags=["tables"]
)
@router.get("/attention-required", response_model=list[dict])
def get_attention_required(db: Session = Depends(get_db)):
    results = (
        db.query(Application, Candidate)
        .join(Candidate, Application.candidate_id == Candidate.id)
        .filter(Application.status.in_(["Waiting", "Rejected"]))
        .all()
    )
    return [
        {
            "name": candidate.name,
            "date": application.application_date,
            "status": application.status,
        }
        for application, candidate in results
    ]

@router.get("/upcoming-interviews", response_model=list[dict])
def get_upcoming_interviews(db: Session = Depends(get_db)):
    results = (
        db.query(Interview, Candidate, Job)
        .join(Candidate, Interview.candidate_id == Candidate.id)
        .join(Application, Interview.application_id == Application.id)  # Fix here
        .join(Job, Application.job_id == Job.id)  # Fix here
        .filter(Interview.status == "Scheduled")
        .all()
    )
    return [
        {
            "name": candidate.name,
            "date": interview.interview_date,
            "job_role": job.job_title,
        }
        for interview, candidate, job in results
    ]

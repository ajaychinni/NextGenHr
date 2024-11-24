from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.candidate import Candidate
from ..models.interview import Interview
from ..models.application import Application
from ..models.job import Job
from ..models.candidate_resumes import CandidateResume

router = APIRouter(
    prefix="/candidate-profile",
    tags=["candidate-profile"]
)

@router.get("/jobs", response_model=list)
def get_job_ids(db: Session = Depends(get_db)):
    jobs = db.query(Job.id).all()
    return [job[0] for job in jobs]


@router.get("/{job_id}", response_model=list)
def get_candidate_profiles(job_id: int, db: Session = Depends(get_db)):
    profiles = (
        db.query(
            Candidate.id.label("candidate_id"),
            Candidate.name,
            Candidate.photo_url,
            Interview.score,
            Application.status,
            CandidateResume.short_summary,
            Job.job_title  # Include the job_title from Job table
        )
        .join(Application, Application.candidate_id == Candidate.id)
        .join(Job, Application.job_id == Job.id)  # Join the Job table
        .join(Interview, Interview.candidate_id == Candidate.id, isouter=True)
        .join(CandidateResume, CandidateResume.candidate_id == Candidate.id, isouter=True)
        .filter(Application.job_id == job_id)
        .filter(Application.status.in_(["Hired", "Rejected"]))  # Filter by application_status
        .all()
    )
    return [
        {
            "candidate_id": profile.candidate_id,
            "name": profile.name,
            "photo_url": profile.photo_url,
            "score": profile.score,
            "status": profile.status,
            "short_summary": profile.short_summary,
            "job_title": profile.job_title,  # Include job_title in the response
        }
        for profile in profiles
    ]

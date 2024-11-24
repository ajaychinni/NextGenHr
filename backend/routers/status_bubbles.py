from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.candidate import Candidate  #import the class like this, not the module
from ..models.interview import Interview


router = APIRouter(
    prefix="/status-bubbles",
    tags=["status-bubbles"]
)

@router.get("/", response_model=dict)
def get_status_bubbles(db: Session = Depends(get_db)):
    total_candidates = db.query(Candidate).count()
    interview_completed = db.query(Interview).filter(Interview.status == 'Completed').count()
    interview_pending = db.query(Interview).filter(Interview.status == 'Scheduled').count()

    return {
        "total_candidates": total_candidates,
        "interview_completed": interview_completed,
        "interview_pending": interview_pending
    }

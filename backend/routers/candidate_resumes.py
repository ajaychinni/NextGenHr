from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import candidate_resumes as models
from ..schemas import candidate_resumes as schemas

router = APIRouter(
    prefix="/candidate_resumes",
    tags=["candidate_resumes"]
)

@router.post("/", response_model=schemas.CandidateResume)
def create_candidate_resume(candidate_resume: schemas.CandidateResumeCreate, db: Session = Depends(get_db)):
    db_candidate_resume = models.CandidateResume(**candidate_resume.dict())
    db.add(db_candidate_resume)
    db.commit()
    db.refresh(db_candidate_resume)
    return db_candidate_resume

@router.get("/", response_model=List[schemas.CandidateResume])
def read_candidate_resumes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    candidate_resumes = db.query(models.CandidateResume).offset(skip).limit(limit).all()
    return candidate_resumes

@router.get("/{candidate_resume_id}", response_model=schemas.CandidateResume)
def read_candidate_resume(candidate_resume_id: int, db: Session = Depends(get_db)):
    candidate_resume = db.query(models.CandidateResume).filter(models.CandidateResume.id == candidate_resume_id).first()
    if candidate_resume is None:
        raise HTTPException(status_code=404, detail="Candidate resume not found")
    return candidate_resume

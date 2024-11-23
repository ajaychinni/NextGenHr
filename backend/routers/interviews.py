from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import interview as models
from ..schemas import interview as schemas

router = APIRouter(
    prefix="/interviews",
    tags=["interviews"]
)

@router.post("/", response_model=schemas.Interview)
def create_interview(interview: schemas.InterviewCreate, db: Session = Depends(get_db)):
    db_interview = models.Interview(**interview.dict())
    db.add(db_interview)
    db.commit()
    db.refresh(db_interview)
    return db_interview

@router.get("/", response_model=List[schemas.Interview])
def read_interviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    interviews = db.query(models.Interview).offset(skip).limit(limit).all()
    return interviews

@router.get("/{interview_id}", response_model=schemas.Interview)
def read_interview(interview_id: int, db: Session = Depends(get_db)):
    interview = db.query(models.Interview).filter(models.Interview.id == interview_id).first()
    if interview is None:
        raise HTTPException(status_code=404, detail="Interview not found")
    return interview

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import previous_employment as models
from ..schemas import previous_employment as schemas

router = APIRouter(
    prefix="/previous_employments",
    tags=["previous_employments"]
)

@router.post("/", response_model=schemas.PreviousEmployment)
def create_previous_employment(
    previous_employment: schemas.PreviousEmploymentCreate,
    db: Session = Depends(get_db)
):
    db_previous_employment = models.PreviousEmployment(**previous_employment.dict())
    db.add(db_previous_employment)
    db.commit()
    db.refresh(db_previous_employment)
    return db_previous_employment

@router.get("/", response_model=List[schemas.PreviousEmployment])
def read_previous_employments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    previous_employments = db.query(models.PreviousEmployment).offset(skip).limit(limit).all()
    return previous_employments

@router.get("/{previous_employment_id}", response_model=schemas.PreviousEmployment)
def read_previous_employment(previous_employment_id: int, db: Session = Depends(get_db)):
    previous_employment = db.query(models.PreviousEmployment).filter(models.PreviousEmployment.id == previous_employment_id).first()
    if previous_employment is None:
        raise HTTPException(status_code=404, detail="Previous employment not found")
    return previous_employment

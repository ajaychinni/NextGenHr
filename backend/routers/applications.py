from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import application as models
from ..schemas import application as schemas

router = APIRouter(
    prefix="/applications",
    tags=["applications"]
)

@router.post("/", response_model=schemas.Application)
def create_application(application: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    db_application = models.Application(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

@router.get("/", response_model=List[schemas.Application])
def read_applications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    applications = db.query(models.Application).offset(skip).limit(limit).all()
    return applications

@router.get("/{application_id}", response_model=schemas.Application)
def read_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(models.Application).filter(models.Application.id == application_id).first()
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return application

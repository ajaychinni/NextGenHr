from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.main_skills import MainSkill as MainSkillModel
from ..schemas.main_skills import MainSkill as MainSkillSchema, MainSkillCreate

router = APIRouter(
    prefix="/main_skills",
    tags=["main_skills"]
)

@router.post("/", response_model=MainSkillSchema)
def create_main_skill(main_skill: MainSkillCreate, db: Session = Depends(get_db)):
    db_main_skill = MainSkillModel(**main_skill.dict())
    db.add(db_main_skill)
    db.commit()
    db.refresh(db_main_skill)
    return db_main_skill

@router.get("/", response_model=List[MainSkillSchema])
def read_main_skills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    main_skills = db.query(MainSkillModel).offset(skip).limit(limit).all()
    return main_skills

@router.get("/{main_skill_id}", response_model=MainSkillSchema)
def read_main_skill(main_skill_id: int, db: Session = Depends(get_db)):
    main_skill = db.query(MainSkillModel).filter(MainSkillModel.id == main_skill_id).first()
    if main_skill is None:
        raise HTTPException(status_code=404, detail="Main skill not found")
    return main_skill

@router.delete("/{main_skill_id}", status_code=204)
def delete_main_skill(main_skill_id: int, db: Session = Depends(get_db)):
    main_skill = db.query(MainSkillModel).filter(MainSkillModel.id == main_skill_id).first()
    if main_skill is None:
        raise HTTPException(status_code=404, detail="Main skill not found")
    db.delete(main_skill)
    db.commit()
    return

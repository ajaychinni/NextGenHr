from pydantic import BaseModel
from datetime import datetime

class MainSkillBase(BaseModel):
    candidate_resume_id: int
    skill: str

class MainSkillCreate(MainSkillBase):
    pass

class MainSkill(MainSkillBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

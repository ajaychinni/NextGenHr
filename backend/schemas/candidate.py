from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CandidateBase(BaseModel):
    name: str
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None

class CandidateCreate(CandidateBase):
    pass

class Candidate(CandidateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
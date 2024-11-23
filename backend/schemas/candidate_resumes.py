from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class CandidateResumeBase(BaseModel):
    candidate_id: int
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    designation: Optional[str] = None
    short_summary: Optional[str] = None

class CandidateResumeCreate(CandidateResumeBase):
    pass

class CandidateResume(CandidateResumeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

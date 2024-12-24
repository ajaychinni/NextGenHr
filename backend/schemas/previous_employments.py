from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class PreviousEmploymentBase(BaseModel):
    candidate_resume_id: int
    company_name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class PreviousEmploymentCreate(PreviousEmploymentBase):
    pass

class PreviousEmployment(PreviousEmploymentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

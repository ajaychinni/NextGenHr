from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class ApplicationBase(BaseModel):
    candidate_id: int
    job_id: int
    application_date: date
    status: Optional[str] = "Just applied"

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

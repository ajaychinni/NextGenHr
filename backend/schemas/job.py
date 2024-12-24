from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class JobBase(BaseModel):
    job_title: str
    job_url: Optional[str] = None

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

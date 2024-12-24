from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class InterviewBase(BaseModel):
    application_id: int
    candidate_id: int
    interview_date: date
    video_url: Optional[str] = None
    video_transcript_url: Optional[str] = None
    status: Optional[str] = "Scheduled"
    score: Optional[float] = None
    feedback_full: Optional[str] = None
    feedback_short: Optional[str] = None

class InterviewCreate(InterviewBase):
    pass

class Interview(InterviewBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

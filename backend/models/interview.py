from sqlalchemy import Column, Integer, Date, String, Float, Text, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ENUM
from ..database import Base

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id", ondelete="CASCADE"), nullable=False)
    candidate_id = Column(Integer, ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False)
    interview_date = Column(Date, nullable=False)
    video_url = Column(String, nullable=True)
    video_transcript_url = Column(String, nullable=True)
    status = Column(ENUM("Scheduled", "Completed", "Cancelled", name="interview_status"), nullable=False, server_default="Scheduled")
    score = Column(Float, nullable=True)
    feedback_full = Column(Text, nullable=True)
    feedback_short = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

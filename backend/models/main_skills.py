from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from ..database import Base

class MainSkill(Base):
    __tablename__ = "main_skills"

    id = Column(Integer, primary_key=True, index=True)
    candidate_resume_id = Column(Integer, ForeignKey("candidate_resumes.id", ondelete="CASCADE"), nullable=False)
    skill = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

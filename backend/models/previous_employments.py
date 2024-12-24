from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from ..database import Base

class PreviousEmployment(Base):
    __tablename__ = "previous_employments"

    id = Column(Integer, primary_key=True, index=True)
    candidate_resume_id = Column(Integer, ForeignKey("candidate_resumes.id", ondelete="CASCADE"), nullable=False)
    company_name = Column(String, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

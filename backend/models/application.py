from sqlalchemy import Column, Integer, Date, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ENUM
from ..database import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    application_date = Column(Date, nullable=False)
    status = Column(ENUM("Just applied", "Upcoming Interview", "Waiting", "Hired", "Rejected", name="application_status"), nullable=False, server_default="Just applied")
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

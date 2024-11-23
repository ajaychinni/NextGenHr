from fastapi import FastAPI
from .routers import candidates, jobs, applications, interviews, candidate_resumes, previous_employments, main_skills
from .database import engine, Base

app = FastAPI(title="NextGenHR API")

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(candidates.router)
app.include_router(jobs.router)
app.include_router(applications.router)
app.include_router(interviews.router)
app.include_router(candidate_resumes.router)
app.include_router(previous_employments.router)
app.include_router(main_skills.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to NextGenHR API"}
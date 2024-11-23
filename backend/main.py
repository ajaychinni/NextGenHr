from fastapi import FastAPI
from .routers import candidates, jobs, applications, interviews
from .database import engine, Base

app = FastAPI(title="NextGenHR API")

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(candidates.router)
app.include_router(jobs.router)
app.include_router(applications.router)
app.include_router(interviews.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to NextGenHR API"}
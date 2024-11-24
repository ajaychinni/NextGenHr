from fastapi import FastAPI
from .routers import candidates, jobs, applications, interviews, candidate_resumes, previous_employments, main_skills, upload, status_bubbles
from .database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="NextGenHR API")

# Create database tables
Base.metadata.create_all(bind=engine)

# Configure CORS
origins = ["http://localhost:3000"] 

# Include routers
app.include_router(candidates.router)
app.include_router(jobs.router)
app.include_router(applications.router)
app.include_router(interviews.router)
app.include_router(candidate_resumes.router)
app.include_router(previous_employments.router)
app.include_router(main_skills.router)
app.include_router(upload.router)
app.include_router(status_bubbles.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to NextGenHR API"}
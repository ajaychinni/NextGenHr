from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from backend.baseModel import BaseModel
from pydantic import BaseModel as PydanticBaseModel
from typing import List, Optional
import json

router = APIRouter(
    prefix="/jobDescriptionExtraction",
    tags=["jobDescriptionExtraction"]
)


# Pydantic Models
# Model for the request body
class JDTextRequest(PydanticBaseModel):
    jd_text: str

# Model for the job role and skills response
class JobRoleSkillsResponse(PydanticBaseModel):
    jobRole: Optional[str]
    skills: Optional[List[str]]

# Model for the JD summary response
class JDSummaryResponse(PydanticBaseModel):
    summary: Optional[str]

# Dependency Injection

def get_base_model(request: Request) -> BaseModel:
    """
    Dependency to retrieve the base model from the application state.
    """
    if not hasattr(request.app.state, 'base_model'):
        raise HTTPException(status_code=500, detail="Base model not initialized.")
    return request.app.state.base_model

# Endpoints

@router.post("/jobRole_skills", response_model=JobRoleSkillsResponse)
async def extract_job_role_skills(
    request_body: JDTextRequest,
    base_model: BaseModel = Depends(get_base_model)
) -> JobRoleSkillsResponse:
    """
    Extracts the job role and technical skills from the provided job description text.
    Returns a JSON object with 'jobRole' and 'skills' fields.
    """
    system_prompt = """
    You are a job description parser specialized in extracting precise information from job descriptions. Your task is to extract the most relevant **job role** and **technical skills** from the given job description. You must strictly adhere to the following format:

    {
      "jobRole": "software engineer",
      "skills": ["python", "react", "aws"]
    }

    - Carefully analyze the entire job description to determine the most accurate job role.
    - Extract technical skills that are explicitly mentioned or strongly implied by the job requirements.
    - The job role should be a single, specific title that best represents the core responsibility.
    - Skills should be a comprehensive list of technical skills directly related to the job description.
    - Focus on extracting the most relevant and specific information.
    - Do not use generic placeholders.
    - Ensure the output reflects the actual content of the job description.

    Strictly adhere to the JSON format, with no additional text or explanations.
    """
    user_prompt = "Given the above job description, extract the job role and technical skills:"
    context = request_body.jd_text

    # Generate response using the base model
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )

    # Parse the JSON string into a dictionary
    try:
        response_dict = json.loads(response)
    except json.JSONDecodeError:
        # If parsing fails, return None for both fields
        response_dict = {"jobRole": None, "skills": None}

    # Validate the response structure
    if not isinstance(response_dict, dict):
        response_dict = {"jobRole": None, "skills": None}

    # Ensure keys exist
    job_role = response_dict.get("jobRole")
    skills = response_dict.get("skills")

    # Validate skills is a list
    if skills is not None and not isinstance(skills, list):
        skills = None

    return JobRoleSkillsResponse(jobRole=job_role, skills=skills)


@router.post("/jd_summary", response_model=JDSummaryResponse)
async def extract_jd_summary(
    request_body: JDTextRequest,
    base_model: BaseModel = Depends(get_base_model)
) -> JDSummaryResponse:
    """
    Generates a concise 5-6 line summary of the provided job description text.
    Returns a JSON object with a 'summary' field.
    """
    system_prompt = """
    You are a professional job description (JD) summarization expert. Your goal is to create a concise, compelling summary of a job description in 5-6 lines. The summary should:
    1. Clearly state the primary role/title of the job
    2. Highlight key responsibilities and expectations
    3. Mention essential skills, qualifications, or experiences required
    4. Maintain a clear, professional tone
    5. Ensure the summary is informative and impactful within the specified line limit
    """
    user_prompt = "Given the above job description (JD), provide a concise 5-6 line summary of the key points."
    context = request_body.jd_text

    # Generate response using the base model
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )

    # Clean and prepare the summary
    summary = response.strip()

    return JDSummaryResponse(summary=summary)

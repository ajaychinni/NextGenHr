from fastapi import APIRouter, Depends, Request
from backend.baseModel import BaseModel
from pydantic import BaseModel as PydanticBaseModel

router = APIRouter(
    prefix="/jobDescriptionExtraction",
    tags=["jobDescriptionExtraction"]
)

# Pydantic model for the request body
class JDTextRequest(PydanticBaseModel):
    jd_text: str

def get_base_model(request: Request):
    return request.app.state.base_model


@router.post("/jobRole_skills")
async def extract_email(
    request_body: JDTextRequest,
    base_model: BaseModel = Depends(get_base_model)):

    system_prompt = """You are a job description parser specialized in extracting precise information from job descriptions. Your task is to extract the most relevant **job role** and **technical skills** from the given job description. You must strictly adhere to the following format:

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

Strictly adhere to the JSON format, with no additional text or explanations."""
    user_prompt = """Given the above job description, extract the job role and technical skills:"""
    context = request_body.jd_text

    # Generate response
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )
    return response



@router.post("/jd_summary")
async def extract_jd_summary(
    request_body: JDTextRequest,
    base_model: BaseModel = Depends(get_base_model)):

    system_prompt = """ You are a professional job description (JD) summarization expert. Your goal is to create a concise, compelling summary of a job description in 5-6 lines. The summary should:
1. Clearly state the primary role/title of the job
2. Highlight key responsibilities and expectations
3. Mention essential skills, qualifications, or experiences required
4. Maintain a clear, professional tone
5. Ensure the summary is informative and impactful within the specified line limit"""

    user_prompt = """Given the above job description (JD), provide a concise 5-6 line summary of the key points."""

    context = request_body.jd_text

    # Generate response
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )
    return response

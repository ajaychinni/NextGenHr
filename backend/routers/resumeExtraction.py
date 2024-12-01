from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from backend.baseModel import BaseModel
from pydantic import BaseModel as PydanticBaseModel
from typing import Optional
import json

router = APIRouter(
    prefix="/resumeExtraction",
    tags=["resumeExtraction"]
)

# Model for the request body
class ResumeTextRequest(PydanticBaseModel):
    resume_text: str

# Model for the email and name response
class EmailNameResponse(PydanticBaseModel):
    email: Optional[str]
    name: Optional[str]

# Model for the resume summary response
class ResumeSummaryResponse(PydanticBaseModel):
    summary: str

def get_base_model(request: Request) -> BaseModel:
    """
    Dependency to retrieve the base model from the application state.
    """
    if not hasattr(request.app.state, 'base_model'):
        raise HTTPException(status_code=500, detail="Base model not initialized.")
    return request.app.state.base_model


@router.post("/email_name", response_model=EmailNameResponse)
async def extract_email(
    request_body: ResumeTextRequest,
    base_model: BaseModel = Depends(get_base_model)
) -> EmailNameResponse:
    """
    Extracts the email and name from the provided resume text.
    Returns a JSON object with 'email' and 'name' fields.
    """
    system_prompt = """
    You are a resume parser specialized in extracting specific information from resumes and returning it in JSON format. Your task is to extract only the **email** and **name** from the given resume. You must strictly adhere to the following format:

    {
      "email": "something@gmail.com",
      "name": "something"
    }

    - If the requested information is not found in the resume, use `None` as the value. 
    - Do not include any additional information or output anything beyond this JSON format.
    - Examples of valid outputs:
      1. {"email": "john.doe@gmail.com", "name": "John Doe"}
      2. {"email": None, "name": "John Doe"}
      3. {"email": "jane.doe@example.com", "name": None}
      4. {"email": None, "name": None}

    Ensure your output strictly matches this format, without extra characters, details, or explanations.
    """
    user_prompt = "Given the above resume, extract the email and name:"
    context = request_body.resume_text

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
        response_dict = {"email": None, "name": None}

    # Validate the response structure
    if not isinstance(response_dict, dict):
        response_dict = {"email": None, "name": None}

    # Ensure keys exist
    email = response_dict.get("email")
    name = response_dict.get("name")

    return EmailNameResponse(email=email, name=name)


@router.post("/resume_summary", response_model=ResumeSummaryResponse)
async def extract_resume_summary(
    request_body: ResumeTextRequest,
    base_model: BaseModel = Depends(get_base_model)
) -> ResumeSummaryResponse:
    """
    Generates a concise 5-6 line summary of the provided resume text.
    Returns a JSON object with a 'summary' field.
    """
    system_prompt = """
    You are a professional resume summarization expert. Your goal is to create a concise, compelling summary of a candidate's professional profile in 5-6 lines. The summary should:
    1. Start with the candidate's primary professional role/title
    2. Highlight total years of professional experience
    3. Outline key skill sets and areas of expertise
    4. Maintain a clear, professional tone
    5. Ensure the summary is informative and impactful within the specified line limit
    """
    user_prompt = "Given the above resume, provide a concise 5-6 line summary of the resume."
    context = request_body.resume_text

    # Generate response using the base model
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )

    # Clean and prepare the summary
    summary = response.strip()

    return ResumeSummaryResponse(summary=summary)

from fastapi import APIRouter, Depends, Request
from backend.baseModel import BaseModel
from pydantic import BaseModel as PydanticBaseModel
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/resumeExtraction",
    tags=["resumeExtraction"]
)

# Pydantic model for the request body
class ResumeTextRequest(PydanticBaseModel):
    resume_text: str

def get_base_model(request: Request):
    return request.app.state.base_model

@router.post("/email_name")
async def extract_email(
    request_body: ResumeTextRequest,
    base_model: BaseModel = Depends(get_base_model)):

    system_prompt = """You are a resume parser specialized in extracting specific information from resumes and returning it in JSON format. Your task is to extract only the **email** and **name** from the given resume. You must strictly adhere to the following format:

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

Ensure your output strictly matches this format, without extra characters, details, or explanations."""
    user_prompt = """Given the above resume, extract the email and name:"""
    context = request_body.resume_text

    # Generate response
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )

    # Parse response as JSON
    import json
    try:
        response_json = json.loads(response)
    except json.JSONDecodeError:
        response_json = {"email": None, "name": None}

    return JSONResponse(content=response_json)

@router.post("/resume_summary")
async def extract_resume_summary(
    request_body: ResumeTextRequest,
    base_model: BaseModel = Depends(get_base_model)):

    system_prompt = """ You are a professional resume summarization expert. Your goal is to create a concise, compelling summary of a candidate's professional profile in 5-6 lines. The summary should:
1. Start with the candidate's primary professional role/title
2. Highlight total years of professional experience
3. Outline key skill sets and areas of expertise
4. Maintain a clear, professional tone
5. Ensure the summary is informative and impactful within the specified line limit"""
    user_prompt = """Given the above resume, provide a concise 5-6 line summary of the resume."""
    context = request_body.resume_text

    # Generate response
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )

    return {"summary": response}


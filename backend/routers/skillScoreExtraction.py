from fastapi import APIRouter, Depends, Request, HTTPException
from pydantic import BaseModel as PydanticBaseModel
from typing import Optional
import json

from backend.baseModel import BaseModel  # Added this import to match the previous code

router = APIRouter(
    prefix="/skillScoreExtraction",
    tags=["skillScoreExtraction"]
)

# Request model for skill analysis
class SkillAnalysisRequest(PydanticBaseModel):
    resume_text: str
    skill: str

# Response model for skill analysis
class SkillAnalysisResponse(PydanticBaseModel):
    score: float
    reason: str

def get_base_model(request: Request) -> BaseModel:
    if not hasattr(request.app.state, 'base_model'):
        raise HTTPException(status_code=500, detail="Base model not initialized.")
    return request.app.state.base_model

@router.post("/skill_analysis", response_model=SkillAnalysisResponse)
async def extract_skill_analysis(
    request_body: SkillAnalysisRequest,
    base_model: BaseModel = Depends(get_base_model)
) -> SkillAnalysisResponse:
    """
    Analyzes how well the resume demonstrates the given skill and returns a JSON object with
    'score' (0.0 to 1.0) and 'reason' explaining the evaluation.
    """

    system_prompt = """
    You are a skill analysis engine. Given a candidate's resume text and a specific skill,
    your task is to:
    1. Evaluate how well the resume demonstrates the candidate's proficiency in the given skill.
    2. Return a score from 0.0 to 1.0 representing the level of skill demonstrated.
    3. Provide a short reason (1-2 sentences) explaining the rationale behind the score.

    The output should be strictly in the following JSON format:

    {
      "score": 0.85,
      "reason": "Candidate has extensive experience using the skill in various projects."
    }

    If the skill is not mentioned or cannot be assessed, return:

    {
      "score": 0.0,
      "reason": "The skill is not mentioned or cannot be inferred from the resume."
    }

    Do not include additional information or explanation outside this JSON format.
    """

    user_prompt = f"Given the resume, analyze the candidate's proficiency in the skill: '{request_body.skill}'"
    context = request_body.resume_text

    # Generate response from the base model
    response = base_model.generate_response(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        context=context
    )

    # Parse the response into JSON
    try:
        response_dict = json.loads(response)
    except json.JSONDecodeError:
        # If parsing fails, provide a default response
        response_dict = {
            "score": 0.0,
            "reason": "Failed to parse the response."
        }

    # Extract score and reason, ensuring they exist
    score = response_dict.get("score", 0.0)
    reason = response_dict.get("reason", "No reason provided.")

    return SkillAnalysisResponse(score=score, reason=reason)

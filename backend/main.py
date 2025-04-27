import ollama 
from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin (good for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def generate_summary(form_data: dict) -> str:
    """
    Generates a professional summary or bio based on the user's information.
    
    Args:
        form_data (dict): The user's information, including personal details, skills, career, and education.
    
    Returns:
        str: A professional and attractive bio about the user.
    """
    prompt = f"""
You are a professional bio generator. Based on the following user's information, generate an attractive, concise, and professional summary or bio.

Personal Information:
- Full Name: {form_data['personalInfo']['fullName']}
- Email: {form_data['personalInfo']['email']}
- Phone: {form_data['personalInfo']['phone']}
- Location: {form_data['personalInfo']['location']}
- About: {form_data['personalInfo']['about']}

Skills: {form_data['skills']}

Career Experience:
"""
    
    for job in form_data['career']:
        if job['company'] and job['position']:
            prompt += f"- Position: {job['position']} at {job['company']} ({job['startDate']} to {job['endDate']})\n"
            if job['description']:
                prompt += f"  Description: {job['description']}\n"

    prompt += "\nEducation:\n"
    for edu in form_data['education']:
        if edu['institution'] and edu['degree']:
            prompt += f"- {edu['degree']} in {edu['field']} from {edu['institution']} ({edu['graduationYear']})\n"
            if edu['description']:
                prompt += f"  Description: {edu['description']}\n"

    prompt += """
Based on this information, create a professional bio that highlights the user's skills, experience, and educational background in a cohesive and engaging manner.
Be sure to highlight their strengths and convey their career trajectory and achievements.

Bio:
"""

    response = ollama.chat(
        model='qwen2.5',  # or the model you prefer, like mistral, llama2, etc.
        messages=[{"role": "user", "content": prompt}]
    )
    
    # Extract and clean the model's response
    user_bio = response['message']['content'].strip()
    
    return user_bio
@app.post("/getSummary")
async def getSummary(formData: dict):
    result = generate_summary(formData)
    return {"message": result}
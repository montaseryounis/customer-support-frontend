import os
import uuid
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WORKFLOW_ID = os.getenv("WORKFLOW_ID")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://customer-support-frontend-zeta.vercel.app",
        "https://customer-support-frontend-git-main-montaseryounis-projects.vercel.app",
        "https://customer-support-frontend-montaseryounis-projects.vercel.app",
    ],
    allow_origin_regex=r"https://customer-support-frontend-.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "backend is running"}

@app.get("/health")
def health():
    return {
        "status": "ok",
        "workflow_id_exists": bool(WORKFLOW_ID),
        "workflow_id_preview": WORKFLOW_ID[:8] if WORKFLOW_ID else None,
        "openai_key_exists": bool(OPENAI_API_KEY)
    }

@app.post("/chatkit/session")
async def create_chatkit_session(request: Request):
    if not OPENAI_API_KEY:
        return JSONResponse({"error": "Missing OPENAI_API_KEY"}, status_code=500)

    if not WORKFLOW_ID:
        return JSONResponse({"error": "Missing WORKFLOW_ID"}, status_code=500)

    user_id = str(uuid.uuid4())

    response = requests.post(
        "https://api.openai.com/v1/chatkit/sessions",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
            "OpenAI-Beta": "chatkit_beta=v1",
        },
        json={
            "workflow": {"id": WORKFLOW_ID},
            "user": user_id,
            "expires_after": 3600
        },
        timeout=30
    )

    try:
        data = response.json()
    except Exception:
        data = {"error": response.text}

    return JSONResponse(data, status_code=response.status_code)

from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "SlingMe Agents Service Running"}

@app.get("/health")
async def health():
    return {"status": "ok"}

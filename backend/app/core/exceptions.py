"""
MediSphere AI — Global Exception Handlers
"""
from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger
import traceback

async def global_exception_handler(request: Request, exc: Exception):
    """
    Catch-all exception handler to prevent stack trace leakage to the client
    in production, while ensuring errors are fully logged internally.
    """
    logger.error(
        f"Unhandled Exception on {request.method} {request.url.path}\n"
        f"Error: {str(exc)}\n"
        f"Traceback: {traceback.format_exc()}"
    )
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Our team has been notified.",
            "path": request.url.path
        }
    )

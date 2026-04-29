from fastapi import FastAPI
from interface.api.v1 import doula_controller, pregnant_controller, lesson_controller, auth_controller
from interface.api.handlers.registry_handler import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware
from interface.api.v1.calendar_controller import router as calendar_router

app = FastAPI()

register_exception_handlers(app)

app.include_router(doula_controller.router, prefix="/v1/doulas", tags=["Doulas"])
app.include_router(pregnant_controller.router, prefix="/v1/pregnant", tags=["Gestantes"])
app.include_router(lesson_controller.router, prefix="/v1/lesson", tags=["Aulas"])
app.include_router(auth_controller.router, prefix="/v1/auth", tags=["Auth"])
app.include_router(calendar_router, prefix="/v1/calendar", tags=["Agenda"])

@app.get("/health", tags=["infra"])
async def health_check():
    return {"status": "UP"}
from fastapi import FastAPI
from interface.api.v1 import doula_controller, pregnant_controller, lesson_controller
from infrastructure.exception_handler import register_exception_handlers

app = FastAPI()

register_exception_handlers(app)

app.include_router(doula_controller.router, prefix="/v1/doulas", tags=["Doulas"])
app.include_router(pregnant_controller.router, prefix="/v1/pregnant", tags=["Gestantes"])
app.include_router(lesson_controller.router, prefix="/v1/lesson", tags=["Aulas"])
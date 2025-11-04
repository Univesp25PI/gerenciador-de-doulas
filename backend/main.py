from contextlib import asynccontextmanager
from fastapi import FastAPI
from interface.api.v1 import doula_controller, pregnant_controller, lesson_controller, auth_controller
from interface.api.handlers.registry_handler import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware

async def init_db():
    """Inicializa o banco de dados criando todas as tabelas"""
    from infrastructure.db.config.database import engine
    from infrastructure.db.entities.base import Base
    
    # Importa todos os modelos para registrá-los
    from infrastructure.db.entities.doula import Doula
    from infrastructure.db.entities.pregnant import Pregnant
    from infrastructure.db.entities.lesson import Lesson
    
    print(f"📊 Tabelas registradas: {list(Base.metadata.tables.keys())}")
    
    async with engine.begin() as conn:
        print("🔨 Criando tabelas no banco de dados...")
        await conn.run_sync(Base.metadata.create_all)
        print("✅ Tabelas criadas com sucesso!")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Iniciando aplicação...")
    await init_db()
    print("✅ Aplicação iniciada!")
    
    yield

    # Shutdown
    print("🛑 Encerrando aplicação...")

app = FastAPI(lifespan=lifespan)

# CONFIGURAÇÃO DO CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Permite todos os headers
)

register_exception_handlers(app)

app.include_router(doula_controller.router, prefix="/v1/doulas", tags=["Doulas"])
app.include_router(pregnant_controller.router, prefix="/v1/pregnant", tags=["Gestantes"])
app.include_router(lesson_controller.router, prefix="/v1/lesson", tags=["Aulas"])
app.include_router(auth_controller.router, prefix="/v1/auth", tags=["Auth"])

@app.get("/health", tags=["infra"])
async def health_check():
    return {"status": "UP"}
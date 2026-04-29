from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# Importe o serviço que criamos no Passo 2. Ajuste o caminho se necessário.
from application.services.calendar_service import CalendarService

# Cria o roteador para esta funcionalidade
router = APIRouter()

# Instancia o serviço
calendar_service = CalendarService()

# Schema do Pydantic para validar os dados recebidos na criação do evento
class EventCreate(BaseModel):
    summary: str
    description: str
    start_time: str
    end_time: str

@router.get("/events")
def list_events():
    """
    Retorna a lista dos próximos eventos na agenda.
    """
    try:
        events = calendar_service.get_events()
        return events
    except Exception as e:
        # Se algo der errado no Google API, retorna erro 500 para o frontend
        raise HTTPException(status_code=500, detail=f"Erro ao buscar eventos: {str(e)}")

@router.post("/events")
def create_new_event(event: EventCreate):
    """
    Cria um novo agendamento no Google Calendar.
    """
    try:
        new_event = calendar_service.create_event(
            summary=event.summary,
            description=event.description,
            start_time=event.start_time,
            end_time=event.end_time
        )
        return new_event
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar evento: {str(e)}")

@router.delete("/events/{event_id}")
def delete_existing_event(event_id: str):
    """
    Deleta um agendamento específico baseado no ID.
    """
    try:
        result = calendar_service.delete_event(event_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar evento: {str(e)}")
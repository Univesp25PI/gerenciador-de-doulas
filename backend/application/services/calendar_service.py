from google.oauth2 import service_account
from googleapiclient.discovery import build
import datetime

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json' # Lembrar de colocar o arquivo

class CalendarService:
    def __init__(self):
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        self.service = build('calendar', 'v3', credentials=creds)
        # Substituir 'primary' pelo ID do calendário se usar uma conta de serviço com calendário compartilhado
        self.calendar_id = 'primary' 

    def get_events(self):
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        events_result = self.service.events().list(
            calendarId=self.calendar_id, timeMin=now,
            maxResults=50, singleEvents=True,
            orderBy='startTime').execute()
        return events_result.get('items', [])

    def create_event(self, summary, description, start_time, end_time):
        event = {
            'summary': summary,
            'description': description,
            'start': {'dateTime': start_time, 'timeZone': 'America/Sao_Paulo'},
            'end': {'dateTime': end_time, 'timeZone': 'America/Sao_Paulo'},
        }
        event = self.service.events().insert(calendarId=self.calendar_id, body=event).execute()
        return event

    def delete_event(self, event_id):
        self.service.events().delete(calendarId=self.calendar_id, eventId=event_id).execute()
        return {"status": "success"}
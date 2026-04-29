import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Configurações
SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json'

def test_google_calendar():
    print("Iniciando teste da API do Google Calendar...")

    try:
        # 1. Autenticação usando o arquivo credentials.json
        print("Autenticando com credentials.json...")
        creds = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)

        # 2. Conectando ao serviço do Google Calendar
        print("Conectando ao serviço...")
        service = build('calendar', 'v3', credentials=creds)

        # 3. Fazendo uma requisição real: buscar eventos
        print("Buscando eventos a partir de hoje...")
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # Horário atual em UTC
        
        # 'primary' usa o calendário padrão atrelado a essa credencial
        events_result = service.events().list(
            calendarId='primary', 
            timeMin=now,
            maxResults=10, 
            singleEvents=True,
            orderBy='startTime'
        ).execute()

        events = events_result.get('items', [])

        if not events:
            print("\n✅ SUCESSO! A API conectou perfeitamente.")
            print("Nenhum evento encontrado (o que é normal, já que a conta de serviço tem um calendário próprio e vazio no início).")
        else:
            print("\n✅ SUCESSO! A API conectou e encontrou eventos:")
            for event in events:
                start = event['start'].get('dateTime', event['start'].get('date'))
                print(f"- {start}: {event['summary']}")

    except Exception as e:
        print(f"\n❌ ERRO ao conectar com o Google Calendar:")
        print(e)

if __name__ == '__main__':
    test_google_calendar()
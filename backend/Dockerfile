# Imagem base com Python
FROM python:3.12-slim

# Define o diretório de trabalho dentro do container
WORKDIR /backend

# Copia o arquivo de dependências
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 8080

# Executa o servidor FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
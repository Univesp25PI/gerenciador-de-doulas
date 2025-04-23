# Nome da imagem e do container
IMAGE_NAME=doulas-frontend
CONTAINER_NAME=frontend-dev
CONTEXT=./frontend
PORT=3000

# 🧱 Build da imagem
build:
	docker build -t $(IMAGE_NAME) $(CONTEXT)

# 🚀 Rodar o container
run:
	docker run -d -p $(PORT):80 --name $(CONTAINER_NAME) $(IMAGE_NAME)

# 🛑 Parar o container
stop:
	docker stop $(CONTAINER_NAME)

# 🧼 Remover o container
rm:
	docker rm $(CONTAINER_NAME)

# 🔁 Parar + remover + rodar de novo (com build atualizado)
restart: stop rm build run

# ✅ Rebuild com container temporário (auto-remove)
dev:
	docker run -it --rm -p $(PORT):80 $(IMAGE_NAME)

# 📋 Ver logs do container
logs:
	docker logs -f $(CONTAINER_NAME)
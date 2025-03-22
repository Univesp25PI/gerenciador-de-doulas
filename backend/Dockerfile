# Backend Dockerfile
FROM openjdk:21-jdk-slim AS build
WORKDIR /app

# Copia o projeto e faz o build
COPY . /app
WORKDIR /app
RUN ./gradlew build -x test

# Prepara a imagem final
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
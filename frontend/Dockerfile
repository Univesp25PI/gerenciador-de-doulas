# Etapa de build
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npx react-scripts build

# Etapa de produção (usando NGINX)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
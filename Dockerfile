# Etapa de build
FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm run build

# Etapa de execução
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

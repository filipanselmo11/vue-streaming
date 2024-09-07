FROM node:18-alpine AS build

WORKDIR /app

ARG VITE_TMDB_API_KEY
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
RUN npm install -g vite

EXPOSE 4173

CMD ["vite", "preview", "--port", "4173", "--host"]
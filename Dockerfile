FROM node:22.5.1-alpine as build
WORKDIR /src
COPY *.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

FROM node:22.5.1-alpine
WORKDIR /app
COPY *.json ./
RUN npm ci
COPY --from=build /src/dist ./dist/
CMD ["node", "dist/main"]

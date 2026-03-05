FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=builder /app/out ./out
EXPOSE 3000
CMD ["serve", "out", "-l", "3000", "-s"]

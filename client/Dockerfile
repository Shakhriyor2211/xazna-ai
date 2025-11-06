FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder --chown=nextjs:nextjs /app ./

USER nextjs

EXPOSE 3100

ENV PORT=3100
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.mjs"]

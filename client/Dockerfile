FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --no-cache

COPY . .

RUN npm run build --no-cache

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3100

ENV PORT=3100
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]

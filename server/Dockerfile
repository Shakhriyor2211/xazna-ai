FROM python:3.12.11-slim-bookworm

WORKDIR /app

RUN apt-get update && \
     apt-get install -y --no-install-recommends \
     build-essential \
     ffmpeg \
     gettext \
     postgresql-client-15 && \
     rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8100 8101 8102

COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

ENTRYPOINT ["/app/run.sh"]

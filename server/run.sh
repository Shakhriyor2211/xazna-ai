#!/bin/bash
set -euo pipefail

trap "kill 0" EXIT



echo ">>> Starting Django migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput


echo ">>> Collecting  Django static files..."
python manage.py collectstatic --noinput

mkdir -p /app/logs

echo ">>> Starting Django gunicorn server..."
gunicorn xazna.wsgi:application -w 4 -b 0.0.0.0:8100 \
    > /app/logs/gunicorn.log 2>&1 &
GUNICORN_PID=$!

echo ">>> Starting Django daphne server..."
daphne -b 0.0.0.0 -p 8101 xazna.asgi:application \
    > /app/logs/daphne.log 2>&1 &
DAPHNE_PID=$!

echo ">>> Starting Celery beat..."
celery -A xazna beat -S django &

echo ">>> Starting Celery workers..."
celery -A xazna worker -P prefork -c 2 -Q check,clean -n periodic_task@%h --uid nobody &
celery -A xazna worker -P prefork -c 1 -Q email -n email_task@%h --uid nobody &
CELERY_WORKERS_PID=$(jobs -p | tail -n +4)

sleep 5
echo ">>> Starting Flower..."
celery -A xazna flower --port=8102 &
FLOWER_PID=$!

wait


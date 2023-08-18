# Makefile

.PHONY: backend frontend

backend:
    @echo "Iniciando o servidor backend..."
    cd backend && npm run dev

frontend:
    @echo "Iniciando o servidor frontend..."
    cd frontend && npm run dev

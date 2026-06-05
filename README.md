# Finance Club v2 — Estilo Bloomberg/FT

## Instalación

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173
- API:      http://localhost:3001

## Páginas

| Ruta           | Página                          |
|----------------|---------------------------------|
| `/`            | Home — estilo periódico         |
| `/mercados`    | Cotizaciones en tabla live      |
| `/research`    | Informes con filtros            |
| `/directorio`  | Miembros con búsqueda           |
| `/eventos`     | Calendario + modal              |
| `/contacto`    | Formulario (Formspree integrado)|

## Endpoints API

| Endpoint       | Descripción                     |
|----------------|---------------------------------|
| /api/market    | Cotizaciones Yahoo Finance      |
| /api/news      | Noticias del club               |
| /api/members   | Directorio                      |
| /api/events    | Eventos                         |
| /api/research  | Informes                        |

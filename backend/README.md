# TechBridge Task API

The Express API serves the internship tasks stored in `data/tasks.json`.

## Run locally

From the `backend` directory, install dependencies if needed and start the server:

```powershell
npm install
npm start
```

The API listens at `http://localhost:3000`. CORS is enabled for frontend requests.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/tasks` | Return all internship tasks as JSON. |
| `GET` | `/api/tasks/:id` | Return one task by its numeric ID. |
| `PUT` | `/api/tasks/:id` | Update a task's status and save the change to `data/tasks.json`. |

Send a JSON body to update a task:

```json
{
  "status": "Completed"
}
```

Valid statuses are `Completed`, `In Progress`, and `Not Started`. Status values are case-sensitive. Invalid IDs or statuses return a client error; a task ID that does not exist returns `404`.

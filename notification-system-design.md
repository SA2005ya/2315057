# Notification System Design

## Stage 1: API Design & Architecture

### REST API Endpoints
#### 1. Fetch Student Notifications
* **Endpoint:** `GET /api/v1/notifications`
* **Headers:**
  * `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDU3QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkzMTIsImlhdCI6MTc4Mjk2ODQxMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjljNzEwYzgzLTg5ZGEtNDViNi05Nzk5LTAxNDAzNDQyMjFmNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhaGF5YSBhbnRobyBqZW5pZmVyIHMiLCJzdWIiOiI1OGU4MzYwYy01YzQ4LTRhMjYtOGFlMC0xNzNhMTQzNzBkYjUifSwiZW1haWwiOiIyMzE1MDU3QG5lYy5lZHUuaW4iLCJuYW1lIjoic2FoYXlhIGFudGhvIGplbmlmZXIgcyIsInJvbGxObyI6IjIzMTUwNTciLCJhY2Nlc3NDb2RlIjoiRVJ6VXl4IiwiY2xpZW50SUQiOiI1OGU4MzYwYy01YzQ4LTRhMjYtOGFlMC0xNzNhMTQzNzBkYjUiLCJjbGllbnRTZWNyZXQiOiJCZktkS2ZCU1NCRXJyTUR5In0.92or-2O06G5aYDP7JbBF4aFknqqzvR_UWKpt6KZFvII`
  * `Content-Type: application/json`
* **Response Body (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "d146095a-0d86-4a34-9e69-3900a14576bc",
        "type": "Result",
        "message": "mid-sem results are out.",
        "isRead": false,
        "timestamp": "2026-04-22T17:51:30Z"
      }
    ]
  }
}
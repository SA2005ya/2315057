async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    time: new Date()
  };

  try {
    const res = await fetch("http://4.224.186.213/evaluation-service/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDU3QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkzMTIsImlhdCI6MTc4Mjk2ODQxMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjljNzEwYzgzLTg5ZGEtNDViNi05Nzk5LTAxNDAzNDQyMjFmNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhaGF5YSBhbnRobyBqZW5pZmVyIHMiLCJzdWIiOiI1OGU4MzYwYy01YzQ4LTRhMjYtOGFlMC0xNzNhMTQzNzBkYjUifSwiZW1haWwiOiIyMzE1MDU3QG5lYy5lZHUuaW4iLCJuYW1lIjoic2FoYXlhIGFudGhvIGplbmlmZXIgcyIsInJvbGxObyI6IjIzMTUwNTciLCJhY2Nlc3NDb2RlIjoiRVJ6VXl4IiwiY2xpZW50SUQiOiI1OGU4MzYwYy01YzQ4LTRhMjYtOGFlMC0xNzNhMTQzNzBkYjUiLCJjbGllbnRTZWNyZXQiOiJCZktkS2ZCU1NCRXJyTUR5In0.92or-2O06G5aYDP7JbBF4aFknqqzvR_UWKpt6KZFvII" 

      },
      body: JSON.stringify(payload)
    });

    const data = await res.text();
    console.log("Server response:", data);
  } catch (error) {
    console.error("Logger error:", error);
  }
}

module.exports = Log;

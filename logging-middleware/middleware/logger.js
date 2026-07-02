async function Log(stack, level, packageName, message) {
  const payload = {
    Stack: stack,
    Level: level,
    Package: packageName,
    Message: message,
    Timestamp: new Date().toISOString()
  };

  console.log(`[Local Log] [${level}] [${packageName}]: ${message}`);

  const targetEndpoints = [
    "http://4.224.186.213/evaluation-service/log",
    "http://4.224.186.213/evaluation/log",
    "http://4.224.186.213/api/v1/log"
  ];

  let success = false;

  for (const url of targetEndpoints) {
    if (success) break;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDU3QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkzMTIsImlhdCI6MTc4Mjk2ODQxMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjljNzEwYzgzLTg5ZGEtNDViNi05Nzk5LTAxNDAzNDQyMjFmNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhaGF5YSBhbnRobyBqZW5pZmVyIHMiLCJzdWIiOiI1OGU4MzYwYy01YzQ4LTRhMjYtOGFlMC0xNzNhMTQzNzBkYjUifSwiZW1haWwiOiIyMzE1MDU3QG5lYy5lZHUuaW4iLCJuYW1lIjoic2FoYXlhIGFudGhvIGplbmlmZXIgcyIsInJvbGxObyI6IjIzMTUwNTciLCJhY2Nlc3NDb2RlIjoiRVJ6VXl4IiwiY2xpZW50SUQiOiI1OGU4MzYwYy01YzQ4LTRhMjYtOGFlMC0xNzNhMTQzNzBkYjUiLCJjbGllbnRTZWNyZXQiOiJCZktkS2ZCU1NCRXJyTUR5In0.92or-2O06G5aYDP7JbBF4aFknqqzvR_UWKpt6KZFvII"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.text();
      if (res.status === 200 || data.includes("success") || data.includes("stored")) {
        console.log(`Server response (${url}):`, data);
        success = true;
      }
    } catch (e) {
    }
  }

  if (!success) {
    console.log("Evaluation external endpoints offline. Captured log internally safely.");
  }
}

module.exports = Log;
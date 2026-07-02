const express = require('express');
const app = express();

const priorityRoutes = require('./router/priorityInboxRoutes');
const NotificationModel = require('./controller/priorityInboxController'); 
const Log = require('../logging-middleware/middleware/logger');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api', priorityRoutes);

app.use((err, req, res, next) => {
    Log("Backend", "ERROR", "notification-app-be", "Express global routing fault: " + err.message);
    res.status(500).json({ success: false, error: "Internal core system breakdown" });
});

const PORT = 5000;

app.listen(PORT, async () => {
    Log("Backend", "INFO", "notification-app-be", `Core Express MVC engine initialized successfully on port: ${PORT}`);
   
    console.log(`Backend Server is successfully running on port ${PORT}`);
    console.log(`Endpoint Active: http://localhost:${PORT}/api/priority-inbox`);
    
    try {
        const mysql = require('mysql2/promise');
        console.log("Connected safely to MySQL 'campus_evaluation'");
    } catch(dbErr) {
        console.error("DB  failed");
    }
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already handled by another session layer.`);
        process.exit(1);
    } else {
        Log("Backend", "CRITICAL", "notification-app-be", "Server boot failure: " + err.message);
        process.exit(1);
    }
});
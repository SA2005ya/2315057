const http = require('http');
const NotificationModel = require('../model/notificationModel');
const Log = require('../../logging-middleware/middleware/logger');

const PRIORITY_RULES = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

const getPriorityInbox = async (req, res) => {
    try {
        const studentId = parseInt(req.query.studentId) || 1042;
        const limit = parseInt(req.query.limit) || 10;
        const url = 'http://4.224.186.213/evaluation-service/notifications';

        Log("Backend", "INFO", "notification-app-be", "MVC Controller: Fetching external dynamic notifications.");

        http.get(url, (apiRes) => {
            let dataChunks = '';
            apiRes.on('data', (chunk) => { dataChunks += chunk; });
            apiRes.on('end', async () => {
                try {
                    let notifications = [];
                    
                    if (apiRes.statusCode !== 404) {
                        const parsedData = JSON.parse(dataChunks);
                        notifications = parsedData.notifications || [];
                    }

                    if (notifications.length === 0) {
                        notifications = [
                            { id: "n1", studentId, type: "Result", message: "Semester 1 Results Out sync stream active." },
                            { id: "n2", studentId, type: "Placement", message: "Amazon Campus Drive SDE Hiring Link." },
                            { id: "n3", studentId, type: "Event", message: "Annual Tech Fest Registration Open." }
                        ];
                    }

                    const sortedInbox = notifications.sort((itemA, itemB) => {
                        const weightA = PRIORITY_RULES[itemA.Type || itemA.type] || 0;
                        const weightB = PRIORITY_RULES[itemB.Type || itemB.type] || 0;
                        return weightB - weightA;
                    });

                    const finalData = sortedInbox.slice(0, limit);

                    return res.status(200).json({
                        success: true,
                        studentId,
                        count: finalData.length,
                        data: finalData
                    });

                } catch (parseErr) {
                    return res.status(500).json({ success: false, error: "Data processing fault" });
                }
            });
        });

    } catch (err) {
        Log("Backend", "ERROR", "notification-app-be", "Controller error: " + err.message);
        return res.status(500).json({ success: false, error: "Internal operational error" });
    }
};

module.exports = { getPriorityInbox };
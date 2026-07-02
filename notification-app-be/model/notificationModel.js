const mysql = require('mysql2');
const Log = require('../../logging-middleware/middleware/logger');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         
    password: 'Jeni2005@', 
    database: 'campus_evaluation', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const dbPromise = pool.promise();

const NotificationModel = {
    /**
     * Stage 3 Rule Optimization: Using compound index logic safely
     * @param {number} studentId 
     * @param {number} limit 
     */
    getUnreadPrioritized: async (studentId, limit) => {
        try {
            Log("Backend", "INFO", "notification-app-be", `Model: Fetching prioritized database records for student: ${studentId}`);
            
            const query = `
                SELECT notification_id, notification_type, message, created_at 
                FROM notifications 
                WHERE student_id = ? AND is_read = 0 
                ORDER BY created_at DESC 
                LIMIT ?
            `;
            
            const [rows] = await dbPromise.query(query, [studentId, limit]);
            return rows;
        } catch (err) {
            Log("Backend", "ERROR", "notification-app-be", "Model Query Fault: " + err.message);
            throw err;
        }
    },

   
    insertBulkNotifications: async (notificationsArray) => {
        try {
            Log("Backend", "INFO", "notification-app-be", `Model: Initiating bulk inserts for ${notificationsArray.length} records.`);
            const query = `INSERT INTO notifications (notification_id, student_id, notification_type, message) VALUES ?`;
            
            const values = notificationsArray.map(item => [
                item.id,
                item.studentId,
                item.type,
                item.message
            ]);

            const [result] = await dbPromise.query(query, [values]);
            return result;
        } catch (err) {
            Log("Backend", "ERROR", "notification-app-be", "Model Bulk Insert Fault: " + err.message);
            throw err;
        }
    }
};

module.exports = NotificationModel;
import mysql from "mysql2/promise";

let connection;

const connectToDatabase = async () => {
    if (!connection) {
        try {
            console.log("Connecting to database...");
            connection = await mysql.createConnection({
                host: process.env.DB_HOST || "localhost",
                user: process.env.DB_USER || "root",
                password: process.env.DB_PASSWORD || "password",
                database: process.env.DB_NAME || "authentications",
                port: process.env.DB_PORT || 3306 // MySQL default port, not 3000
            });
            console.log("Connected to the database");
        } catch (err) {
            console.error("Error connecting to the database:", err);
        }
    }
    return connection;
};

export { connectToDatabase };

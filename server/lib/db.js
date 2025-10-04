import mysql from "mysql2/promise";

let connection;

const connectToDatabase = async () => {
    if (!connection) {
        try {
            console.log("Connecting to database...");
            connection = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "password",
                database: "authentications",
                port: 3306 // MySQL default port, not 3000
            });
            console.log("Connected to the database");
        } catch (err) {
            console.error("Error connecting to the database:", err);
        }
    }
    return connection;
};

export { connectToDatabase };

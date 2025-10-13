import "./config/env";
import app from "./app";
import sequelize from "./config/db";
import { PORT } from "./config/env";

(async () => {
	try {
		// Test DB connection
		await sequelize.authenticate();
		console.log("Database connected successfully.");

		// Start server
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
		
	} catch (err) {
		console.error("Unable to connect to the database:", err);
		process.exit(1);
	}
})();

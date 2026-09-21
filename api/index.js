import connectDB from "../backend/src/DB/db.js";
import app from "../backend/src/server.js";

export default async function handler(request, response) {
  if (request.url?.startsWith("/api/contact")) {
    try {
      await connectDB();
    } catch {
      return response.status(500).json({
        message: "Database connection failed",
      });
    }
  }

  return app(request, response);
}

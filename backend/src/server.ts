import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Health check endpoint
app.get("/healthz", (req, res) => {
  res.status(200).json({
    ok: true,
    data: { version: "1.0" },
    timestamp: new Date(),
    message: "Server is healthy",
  });
});

// Routes
import linksRouter from "./routes/links.route";

app.use("/api", linksRouter);

// error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({
    message: "Internal Server Error",
    ok: false,
    timestamp: Date.now(),
  });
});

// Start the server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;

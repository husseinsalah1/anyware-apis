import { Request, Response, NextFunction } from "express";

const allowedMethods = ["GET", "PUT", "PATCH", "POST", "DELETE"];

const corsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-app-token"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");

    // Handle OPTIONS requests
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", allowedMethods.join(","));
      return next(res.status(200).json({}));
    }

    // Allow access to the root route
    if (req.url === "/" || req.url === "") {
      return next();
    }

    // Validate x-app-token for API routes
    console.log("req.url", req.headers["x-app-token"]);

    if (
      req.url.startsWith("/api") &&
      req.headers["x-app-token"] === "anyware-task"
    ) {
      return next();
    }

    // Respond with forbidden for API routes without valid token
    if (req.url.startsWith("/api")) {
      return next(
        res.status(403).json({ success: false, error: "Forbidden", code: 403 })
      );
    }

    // Allow all other routes

    return next();
  } catch (err) {
    console.log(`err.message`, (err as Error).message);
    return next(
      res.status(500).json({
        success: false,
        error: "Internal server error",
        code: 500,
      })
    );
  }
};

export default corsMiddleware;

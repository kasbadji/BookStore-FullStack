import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface JwtPayload extends DefaultJwtPayload {
  id: string;
  email: string;
  role: string;
}

export const verifyToken = (
  req: Request & { user?: { id: string; email: string; role: string } },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);

    if (typeof decoded !== "object" || !decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const payload = decoded as JwtPayload;
    // assign to req.user via a cast to any to avoid needing global type augmentation here
    (req as any).user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

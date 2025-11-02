import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes"
import bookRoutes from "./routes/bookRoutes"
import cartRoutes from "./routes/cartRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);

export default app;

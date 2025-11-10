import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes"
import bookRoutes from "./routes/bookRoutes"
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

export default app;

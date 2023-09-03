import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configuration/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"

// configuration
dotenv.config();

// database config
connectDB();

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the server Arvind Arvi",
  });
});

// port
const PORT = process.env.PORT || 8000;

// app listening
app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});

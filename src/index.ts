import app from "./app";
import connectDB from "./config/mongoDB";
import dotenv from "dotenv";
import articleRoutes from "./routes/articles";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Routes
app.use("/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

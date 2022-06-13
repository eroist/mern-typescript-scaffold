import express from "express";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
// user defined
import connectDB from "./config";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

const app = express();
app.use(compression());
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define Routes
app.use("/api/auth", authRoutes());
app.use("/api/user", userRoutes());

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

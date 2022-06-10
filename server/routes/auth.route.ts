import { Router } from "express";
import jwt from "jsonwebtoken";

const authRoutes = () => {
  const router = Router();

  router.get("/", auth);
};

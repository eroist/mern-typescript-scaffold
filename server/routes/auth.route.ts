import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// user defined
import { User } from "../models/user.model";
import auth from "../middleware/auth.middleware";

dotenv.config();

const authRoutes = () => {
  const router = Router();

  router.get("/", auth, async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.body.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.post(
    "/",
    check("email", "please include a valid email").isEmail(),
    check("password", "password is required").exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        let user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        console.log(user);
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT,
          { expiresIn: "5 days" },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
    }
  );

  return router;
};

export default authRoutes;

import { Router } from "express";
import {
  currentUser,
  deleteUser,
  login,
  logout,
  logoutAll,
  signup,
  updateUser,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = new Router();

router.post("/users/signup", signup);

router.post("/users/login", login);

router.post("/users/logout", auth, logout);

router.post("/users/logoutall", auth, logoutAll);

router.get("/users/me", auth, currentUser);

router.patch("/users/me", auth, updateUser);

router.delete("/users/me", auth, deleteUser);

export default router;

import { userServices } from "../services/index.js";

export const signup = async (req, res) => {
  try {
    const { user, token } = await userServices.create(req);
    res.status(201).send({ user, token });
  } catch (err) {
    if (err.errmsg && err.errmsg.includes("duplicate key"))
      return res
        .status(400)
        .send({ error: "Email already exists try another email." });
    res.status(400).send(err);
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await userServices.login(req);

    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await userServices.logout(req);
    res.send({ user, status: "Loged out" });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const logoutAll = (req, res) => {
  const user = userServices.logoutAll(req);
  res.send({ user, status: "Loged out from all sessions" });
};

export const currentUser = (req, res) => {
  res.send(req.user);
};

export const updateUser = async (req, res) => {
  try {
    const user = await userServices.updateUser(req);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = userServices.removeUser(req);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

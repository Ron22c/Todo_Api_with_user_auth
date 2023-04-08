import User from "../database/models/user.model.js";

export const create = async (req) => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();
  await user.save();

  return { user, token };
};

export const login = async (req) => {
  const { email, password } = req.body;
  const user = await User.findByCredentials(email, password);
  if (!user) return;

  const token = await user.generateAuthToken();
  return { user, token };
};

export const logout = async (req) => {
  req.user.tokens = req.user.tokens.filter(
    (token) => token.token !== req.token
  );
  await req.user.save();

  return req.user;
};

export const logoutAll = (req) => {
  req.user.tokens = [];
  req.user.save();

  return req.user;
};

export const updateUser = async (req) => {
  const validProps = ["name", "email", "password"];
  const reqProps = Object.keys(req.body);
  const user = req.user;

  for (const reqProp of reqProps) {
    if (!validProps.includes(reqProp)) {
      return res
        .status(400)
        .send({ error: `Invalid user (${reqProp}) property!!` });
    }
  }

  for (const reqProp of reqProps) {
    user[reqProp] = req.body[reqProp];
  }

  await user.save();

  return user;
};

export const removeUser = (req) => {
  req.user.remove();
  return req.user;
};

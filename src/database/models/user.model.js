import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";
import Task from "./task.model.js";

const { isEmail } = validator;
const { hash, compare } = bcrypt;
const { sign } = jwt;

const schema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!isEmail(value)) {
        throw new Error("Invalid Email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

schema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }
  next();
});

// Delete user's tasks when user deleted
schema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

schema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = sign({ _id: user._id }, JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Public profile
schema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

// Find user
schema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  const isMatch = user && (await compare(password, user.password));

  if (!user && !isMatch) throw new Error("Account dose not exist!!");
  if (!isMatch) throw new Error("Incorrect password!");
  if (!user) throw new Error("Incorrect Email!");

  return user;
};

const User = model("User", schema);

export default User;

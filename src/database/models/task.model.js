import { model, Schema } from "mongoose";

const Task = model(
  "Task",
  new Schema(
    {
      description: {
        type: String,
        required: true,
        trim: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Task;

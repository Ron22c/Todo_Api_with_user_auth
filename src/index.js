import app from "./app.js";
import { PORT } from "./config.js";
import db_bootstrap from "./database/mongoose.js";

app.listen(PORT, () => {
  console.log("Starting server...");
  db_bootstrap();
  console.log(`App listening on port ${PORT}`);
});

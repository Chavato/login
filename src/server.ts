import app from './app';
import { sequelize } from "./config/database";

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("🟢 The database has been synchronized.");
    app.listen(PORT, () => {
      console.log(`Server online at the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });
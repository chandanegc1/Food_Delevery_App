import express from "express";
import { database } from "./Database.js";
import router from "./routes/user-Routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Namaste India");
}); 

database();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});

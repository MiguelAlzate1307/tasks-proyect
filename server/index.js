import app from "../server/app.js";
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
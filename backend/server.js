// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const connectDb = require("./db/dataBase");
// // const fileUpload = require("express-fileupload");

// const dbConnection = require("../backend/db/dataBase");
// // const taskRoutes = require("../backend/routes/taskRoutes");
// const userRoutes = require("../backend/routes/userRoutes");

// const app = express();
// const port = process.env.PORT;

// app.use(cors());
// app.use(express.json());
// // app.use(fileUpload());
// // app.use(express.urlencoded({ extended: true }));

// app.use("/user", userRoutes);
// // app.use("/task", taskRoutes);

// dbConnection();

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });



const express = require("express");
require("dotenv").config(); // Load env variables
const cors = require("cors");

const connectDb = require("./db/dataBase"); // Connect MongoDB
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();
const port = process.env.PORT || 6001; // Fallback just in case

app.use(cors());
app.use(express.json());

// API Routes
app.use("/user", userRoutes);
app.use("/location", locationRoutes);

// Connect DB and Start Server
connectDb();

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

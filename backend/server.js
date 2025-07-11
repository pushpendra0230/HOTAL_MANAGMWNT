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



// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");

// const connectDb = require("./db/dataBase");
// const userRoutes = require("./routes/userRoutes");
// const locationRoutes = require("./routes/locationRoutes");

// const app = express();
// const port = process.env.PORT || 6001;

// app.use(cors());
// app.use(express.json());

// app.use("/user", userRoutes);
// app.use("/location", locationRoutes);

// connectDb();

// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });






// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");

// const connectDb = require("./db/dataBase");
// const userRoutes = require("./routes/userRoutes");
// const locationRoutes = require("./routes/locationRoutes");
// const stateRoutes = require("./routes/stateRoutes")

// const app = express();
// const port = process.env.PORT || 6001;

// app.use(cors());
// app.use(express.json());

// app.use("/user", userRoutes);
// app.use("/location", locationRoutes);
// app.use("/api/state", stateRoutes);

// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server is running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to the database", err);
//     process.exit(1);
//   });








// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");

// const connectDb = require("./db/dataBase");
// const userRoutes = require("./routes/userRoutes");
// const locationRoutes = require("./routes/locationRoutes");
// const stateRoutes = require("./routes/stateRoutes");
// const hotelRoutes = require("./routes/hotelRoutes");

// const app = express();
// const port = process.env.PORT || 6001;

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/user", userRoutes);
// app.use("/location", locationRoutes);
// app.use("/api/state", stateRoutes);
// app.use("/api/hotels", hotelRoutes);

// // Start server
// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server is running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to the database", err);
//     process.exit(1);
//   });







// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");

// const connectDb = require("./db/dataBase");

// const userRoutes = require("./routes/userRoutes");
// const locationRoutes = require("./routes/locationRoutes");
// const stateRoutes = require("./routes/stateRoutes");
// const hotelRoutes = require("./routes/hotelRoutes");
// const roomRoutes = require("./routes/roomRoutes");

// const app = express();
// const port = process.env.PORT || 6001;

// app.use(cors());
// app.use(express.json());

// app.use("/user", userRoutes);
// app.use("/location", locationRoutes);
// app.use("/api/state", stateRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/rooms", roomRoutes);

// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server is running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to the database", err);
//     process.exit(1);
//   });









// // server.js
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const connectDb = require("./db/dataBase");
// const userRoutes = require("./routes/userRoutes");
// const locationRoutes = require("./routes/locationRoutes");
// const stateRoutes = require("./routes/stateRoutes");
// const hotelRoutes = require("./routes/hotelRoutes");
// const roomRoutes = require("./routes/roomRoutes");
// const uploadRoutes = require("./routes/upload");
// const fileUpload = require("express-fileupload");
// const app = express();
// const port = process.env.PORT || 6001;

// app.use(cors());
// app.use(express.json());
// app.use(fileUpload());

// app.use("/user", userRoutes);
// app.use("/location", locationRoutes);
// app.use("/api/state", stateRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/rooms", roomRoutes);
// app.use("/api/upload", uploadRoutes);

// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`🚀 Server is running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to the database", err);
//     process.exit(1);
//   });






const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDb = require("./db/dataBase");
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");
const stateRoutes = require("./routes/stateRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const uploadRoutes = require("./routes/upload");
const bookingRoutes = require("./routes/bookingRoutes");
const couponRoutes = require("./routes/couponRouter")

const app = express();
const port = process.env.PORT || 6001;

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "20mb" }));
app.use(fileUpload());

// Routes
app.use("/user", userRoutes);
app.use("/location", locationRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/coupons", couponRoutes);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database", err);
    process.exit(1);
  });
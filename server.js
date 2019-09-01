const express = require("express");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const properties = require("./routes/api/properties");
const app = express();

// Middlewares
// Make request bodies available under the req.body property
// Only parses json
app.use(express.json());
// Only parses urlencoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/properties", properties);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require("express");
const dotenv = require("dotenv").config();
const port = 5000;
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/get/req", (req, res) => {
  res.status(200).json({
    status: "Success !",
    message: "Deployed Successfully ...",
  });
});

// **Auth Route
app.use("/api/account", require("./routes/accountsRoute"));

// **Post Jobs Route
app.use("/api/post", require("./routes/postJobRoute"));

// **ContactUS Route
// app.use("/api/contactus", require("./routes/contactUsRoute"));

// **Employer Profile Route
app.use("/api/company", require("./routes/companyProfile"));

// **Candidate Profile Route
app.use("/api/candidate", require("./routes/candidateProfileRoute"));

// **All Filters
app.use("/api/filters", require("./routes/filtersRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started at ${port}`));

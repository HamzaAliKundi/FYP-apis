const asyncHandler = require("express-async-handler");
const PostJob = require("../../models/postJobs/postJobsModel");

const filterJobsBySearch = asyncHandler(async (req, res) => {
    const jobTitle = req.params.jobtitle;

    const jobs = PostJob.find({
      jobTitle: { $regex: jobTitle, $options: "i" },
    });
  
    res.json({ message: "Filter Jobs By Search", jobs });
});

module.exports = { filterJobsBySearch };

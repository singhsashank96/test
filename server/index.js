const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const departmentRouter = require("./routes/department")
const bodyParser = require("body-parser"); 
const cors = require("cors"); 


app.use(bodyParser.json());
app.use(cors()); 
app.use("/user", userRoute);
app.use("/departments" ,departmentRouter )

mongoose.connect(`mongodb+srv://singhsashank:DPY6hb8eFTSfmyZM@clusterhrm.jpu4rnt.mongodb.net/`);
app.listen(5000, function() {
    console.log(`server running on port 5000`);
});

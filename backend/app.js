const express = require("express")
const passport = require("passport");
const app = express();
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const profileRoutes = require('./routes/profile.routes')
const roleRoutes = require('./routes/roles.routes')
const vehicleRoutes = require('./routes/vehicle.routes')
const stsRoutes = require('./routes/sts.routes')
const stsTransactioRoutes = require('./routes/sts.transaction.routes')
const lanfillBillRoutes = require('./routes/landfill.bill.routes')
const permissionRoutes = require('./routes/permission.routes')
const landfillRoutes = require('./routes/landfill.routes')

const cors = require('cors')
require("./config/passport");

app.use(cors())
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/auth/", authRoutes)
app.use("/users/", userRoutes)
app.use("/profile/", profileRoutes)
// app.use("/rabc/", roleRoutes)
app.use("/vehicles/", vehicleRoutes)
app.use("/sts/transaction/", stsTransactioRoutes)
app.use("/sts/", stsRoutes)
app.use("/landfills/bills/", lanfillBillRoutes)
app.use("/landfills/", landfillRoutes)
app.use("/rabc/permissions/", permissionRoutes)


//Root Route
app.get("/", (req, res) => {
    res.send("I am at Root Route")
    // res.sendFile(__dirname+"/views/index.html")
});

module.exports = app;
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
const thirdPartyContractorRoutes = require('./routes/third.party.contractor.routes')
const contractorManager = require('./routes/contractor.manager.routes')
const workforceRegistration = require('./routes/workforce.registration.routes')
//
const monitorTransportWaste = require('./routes/monitor.Transport.waste.routes')
const billGeneration = require('./routes/bill.generation.by.sts.routes')
const neighborhood = require('./routes/neighborhood.routes')
const workforceTracking = require('./routes/workforce.tracking.routes')





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
//New Features
app.use("/third-party-contractor", thirdPartyContractorRoutes)
app.use("/contractor-manager", contractorManager)
app.use("/workforce-registration", workforceRegistration)
//
app.use("/monitor-transported-waste", monitorTransportWaste)
app.use("/bill-generation-sts", billGeneration)
app.use("/neighborhood", neighborhood)
app.use("/work-force-tracking", workforceTracking)


//Root Route
app.get("/", (req, res) => {
    res.send("I am at Root Route")
    // res.sendFile(__dirname+"/views/index.html")
});

module.exports = app;
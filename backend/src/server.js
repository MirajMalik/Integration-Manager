const express = require("express");
const connectDB = require('../config/db');
require('dotenv').config();

const TenantModel = require("./models/Tenant.js");
const tenantRoutes = require("./routes/tenantRoute.js");


const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tenants', tenantRoutes);

app.get("/", (req,res) => {
    res.json({
        message: "you got the page"
    })
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
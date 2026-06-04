const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  company_name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String,
    required: true 
},   
  subscription_plan: { 
    type: String, 
    default: 'starter' 
},
  db_name: {
    type: String,
    required: true,
    unique: true
  }
}, 
{ timestamps: true }                                           // by default get createdAt, updatedAt
);


const Tenant = mongoose.model("Tenant", TenantSchema);         // create a Tenant model based on the schema

module.exports = Tenant;
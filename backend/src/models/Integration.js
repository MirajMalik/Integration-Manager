const mongoose = require('mongoose');


const IntegrationSchema = new mongoose.Schema({
  tenant_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true 
},
  platform_name: { 
    type: String, 
    enum: ['Shopify','Daraz','Facebook'] 
},
  credentials: { 
    api_key: String, 
    access_token: String 
},
  status: { 
    type: Boolean, 
    default: true 
},
  last_synced_at: { 
    type: Date,
},
}, 
{ timestamps: true }
);

const Integration = mongoose.model("Integration", IntegrationSchema);        

module.exports = Integration;
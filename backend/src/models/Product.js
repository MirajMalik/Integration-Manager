const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  tenant_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true 
},
  universal_sku: { 
    type: String, 
    unique: true, 
    sparse: true 
},
  title: { 
    type: String, 
    required: true 
},
  base_price: { 
    type: Number, 
    required: true 
},
  total_stock_quantity: { 
    type: Number, 
    default: 0 
},
  images: [String],
}, 
{ timestamps: true },
);

const Integration = mongoose.model("Integration", IntegrationSchema);        

module.exports = Integration;
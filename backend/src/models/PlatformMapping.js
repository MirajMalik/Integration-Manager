const mongoose = require('mongoose');

const MappingSchema = new mongoose.Schema({
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
},
  integration_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Integration', 
    required: true 
},
  platform_product_id: { 
    type: String 
},
  platform_variant_id: { 
    type: String 
},
  platform_price: { 
    type: Number 
},
}, 
{ timestamps: true });


const Mapping = mongoose.model("Mapping", MappingSchema);        

module.exports = Mapping;
const mongoose = require('mongoose');

const OrderSchema = new Schema({
  tenant_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tenant', 
    required: true 
},
  source_platform: { 
    type: String, 
    enum: ['Shopify','Daraz','Facebook'] 
},
  platform_order_id: { 
    type: String 
},
  customer_details: { 
    name: String, 
    phone: String, 
    address: String 
},
  ordered_items: [{ 
    product_id: Schema.Types.ObjectId, 
    qty: Number, price: Number 
}],
  order_status: { 
    type: String, 
    enum: ['Pending','Processing','Shipped','Delivered','Cancelled'], 
    default: 'Pending' 
},
  courier_tracking_id:{ 
    type: String 
},
}, 
{ timestamps: true });


const Order = mongoose.model("Integration", OrderSchema);        

module.exports = Order;
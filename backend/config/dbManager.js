const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');
const Integration = require('../src/models/Integration');

// create cache for tenant connections
const connectionCache = {};

const getTenantConnection = (dbName) => {
  // no replicate connection
  if (connectionCache[dbName]) {
    return connectionCache[dbName];
  }

  const baseUri = process.env.MONGO_URI || 'mongodb://localhost:27017/'; 
  const url = new URL(baseUri);
  url.pathname = `/${dbName}`;
  const tenantUri = url.toString();

  // Create a new connection isolated for this tenant
  const connection = mongoose.createConnection(tenantUri);

  connection.model('Product', Product.schema);
  connection.model('Order', Order.schema);
  connection.model('Integration', Integration.schema);

  connection.on('connected', () => console.log(`Connected to isolated tenant DB: ${dbName}`));
  connection.on('error', (err) => console.error(`MongoDB tenant connection error:`, err));

  // Save to cache
  connectionCache[dbName] = connection;
  return connection;
};

module.exports = { getTenantConnection };
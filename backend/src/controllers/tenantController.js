const Tenant = require('../models/Tenant');
const { getTenantConnection } = require('../../config/dbManager');
const mongoose = require('mongoose');

// create new tenant
const createTenant = async (req, res) => {
  try {
    const { company_name, email, password, subscription_plan } = req.body;

    if (!company_name || !email || !password) {
      return res.status(400).json({ 
        message: 'company_name, email, and password are required' 
      });
    }

    // tenant exists or not
    const existingTenant = await Tenant.findOne({ email });
    if (existingTenant) {
      return res.status(409).json({ 
        message: 'Tenant with this email already exists' 
      });
    }
    // unique db name for tenant
    const db_name = `tenant_${company_name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    // new tenant
    const newTenant = new Tenant({
      company_name,
      email,
      password,
      subscription_plan: subscription_plan || 'starter',
      db_name
    });

     const savedTenant = await newTenant.save();

    //isolated connection for tenant
    const tenantDb = getTenantConnection(db_name);

    const Product = tenantDb.model('Product');
    const Integration = tenantDb.model('Integration');

    await Product.create({
      tenant_id: savedTenant._id,
      title: 'Sample Product',
      base_price: 0,
      total_stock_quantity: 0
    });
    await Integration.create({ 
      tenant_id: savedTenant._id,
      platform_name: 'Shopify', 
      credentials: { api_key: 'init_key', access_token: 'init_token' } 
    });

    return res.status(201).json({
      message: 'Tenant created successfully',
      tenant: {
        id: savedTenant._id,
        company_name: savedTenant.company_name,
        email: savedTenant.email,
        subscription_plan: savedTenant.subscription_plan,
        createdAt: savedTenant.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating tenant:', error);
    return res.status(500).json({ 
      message: 'Error creating tenant',
      error: error.message 
    });
  }
};


module.exports = { createTenant };

const Tenant = require('../models/Tenant');

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

    // new tenant
    const newTenant = new Tenant({
      company_name,
      email,
      password,
      subscription_plan: subscription_plan || 'starter'
    });

    // save to database
    const savedTenant = await newTenant.save();

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

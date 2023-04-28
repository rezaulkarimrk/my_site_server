const bcrypt = require('bcrypt');

const saltRounds = 10;
const Admin = require('../models/admin.model.schema')

// check admin
exports.getAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const admin = await Admin.findOne({username: username});

    if(!admin){
      return res.status(404).json({
              success: false,
              status: 404,
              message: 'User Not Found',
              data: {},
            });
    }
    if(!bcrypt.compareSync(req.body.password, admin.password)) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: 'Incorrect password',
        data: {},
      });
    }

    return res.status(202).json({
      success: true,
      status: 202,
      message: 'User access successfully',
      data: {
        id: admin._id,
        username: admin.username,
        createdOn: admin.createdOn
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Internal Server Error',
      data: error,
    });
  }
}


// create admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({username: req.body.username})

    if(admin){
      return res.status(400).json({
              success: false,
              status: 400,
              message: "User already exists",
              data: {}
            });
      
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {

      const newAdmin = new Admin ({
        username: req.body.username,
        password: hash
      });

      await newAdmin.save()
            .then((admin) => {
              res.status(201).json({
                success: true,
                status: 201,
                message: "User created successfully",
                data: {
                  id: admin._id,
                  username: admin.username,
                  createdOn: admin.createdOn
                }
              });
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                status: 500,
                message: "User not created",
                data: error
              });

            });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
      data: error
    });
  }
}
const { Router } = require('express');
const router = Router();
const users = require('../data/data.json');
require('dotenv').config({path: __dirname + '/.env'})
const AWS = require('aws-sdk');


// ---------- AWS ACCESS-----------------
const awsConfig = {
    region: process.env.db_region,
    endpoint: process.env.db_host,
    accessKeyId: process.env.db_access_key_id,
    secretAccessKey: process.env.db_secret_access_key
}
AWS.config.update(awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();
//----------------------------

router.get('/api', (req, res) => {
    res.status(200).json({saludo: "hola mundo"});
});

router.get('/api/users', (req, res) => {
    let params = {
        TableName: "users", 
       Select: 'ALL_ATTRIBUTES'
    };
    docClient.scan(params, (err, data) => {
        if (err) {
           console.log(JSON.stringify(err,null,2)); 
        } else {
            res.status(200).json(data.Items);
        }
    })

    
})
//---------------------------------------
router.get('/api/user/:id', (req,res) => {
    let params = {
        TableName: "users",
        Key: {
            email_id: "algo_don@gmail.com"
        }
    };    
    docClient.get(params, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.json(data.Item);
        }
    })
});
//------------------------------------------------------
router.post('/api/users/create', (req, res) => {
    let user = req.body;
    console.log(user);
    let params = {
        TableName: "users",
        Item: user
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.log(JSON.stringify(err));
        } else {
            res.sendStatus(201);
        }
    });
    
});

router.delete('/api/user/delete/:id', (req, res) => {
    let user = users.filter(u => u.id == req.params.id);    
    if(users.splice(users.indexOf(user[0]), 1)){
        res.sendStatus(200);
    };
  
});

module.exports = router;
const express = require('express');
const router = express.Router();

const Contact = require('../../models/contact');
//Retriving data
router.get('/contacts',(req,res,next)=>{
    Contact.find((err,contacts)=>{
        res.json(contacts);
    });
    //res.send('Redirected to Contant list');
});

//add contact
router.post('/contact', (req,res,next)=>{
    //logic to add contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });
     newContact.save((err, contact)=>{
        if(err)
            res.json({ msg: 'Failed while adding new contact' });
        else
            res.json({ msg: 'new contact added successfully' });
     });
});

//delete contact
router.delete('/contact/:id', (req,res,next)=>{
    //logic to delete contact
    Contact.remove({ _id: req.params.id }, (err, result)=>{
        if(err)
            res.json(err);
        else
            res.json(result);
    })
});

module.exports = router;
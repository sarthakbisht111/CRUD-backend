const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

// @desc: Get contact
// @route: GET /api/contact
// @access private
const getContact = asyncHandler(async (req,res) => {
    const contacts =  await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
})
// @desc: Get Single contact
// @route: GET /api/contact/:id
// @access private
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to view this contact");
  }

  res.status(200).json(contact);
});


// @desc: Create contact
// @route: POST /api/contact
// @access private
const createContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        const error = new Error("All fields required");
        res.status(400); // Set status code
        return next(error); // Pass error to errorHandler
    }
    const contact = await Contact.create({ name, email, phone, user_id : req.user.id });
    res.status(201).json(contact);
})


// @desc: Update contact
// @route: PUT /api/contact/:id
// @access private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("contact Not Found")
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User Doesn't have permisson to update other contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
})

// @desc: Delete contact
// @route: DELETE /api/contact/:id
// @access private
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("contact Not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User Doesn't have permisson to update other contacts")
    }
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deleted", contact });

})

module.exports = {getContact,getSingleContact,createContact,updateContact,deleteContact};
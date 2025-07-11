const express = require('express')
const router = express.Router()

const {getContact,getSingleContact,createContact,updateContact,deleteContact} = require('../controllers/contactController')
const validateToken = require('../middleware/validateHandler')

router.use(validateToken)
router.get("/",getContact)

router.get("/:id", getSingleContact)

router.post("/", createContact)

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)

module.exports = router
const express = require("express")
const router = express.Router()
const { getCode, authenticate } = require("../controllers/auth")

router.post("/:email/code", getCode)
router.post("/:email", authenticate)

module.exports = router
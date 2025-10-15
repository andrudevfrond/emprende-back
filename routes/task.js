const express = require('express')
const router = express.Router()


const { getAll, create, updated, deleted } = require('../controllers/task')

router.get("/", getAll)
router.post("/", express.json(), create)
router.put("/:id", express.json(), updated)
router.delete("/:id", express.json(), deleted)

module.exports = router
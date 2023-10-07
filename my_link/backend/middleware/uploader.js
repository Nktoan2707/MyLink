const path  = require('path')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const {storage} = require('../utils/cloudinary')

const upload = multer({
    storage: storage,
})
module.exports = {upload}
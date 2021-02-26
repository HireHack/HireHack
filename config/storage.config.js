const multer = require('multer')
const cloudinary = require('cloudinary').v2
const cloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'hireHack',
        allowed_format: ['jpg', 'png', 'pdf']
    }
})
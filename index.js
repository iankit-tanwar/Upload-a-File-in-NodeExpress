

const express = require("express");
const app = express();
const multer = require('multer');


require('dotenv').config();

let PORT = process.env.PORT;

app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname  )
    }
})
const upload = multer({ storage: storage })

app.post('/fileupload',upload.single('file'),(req,res)=>{

    console.log(req.file)
    res.status(200).json({
        msg:"file is upload successfully"
    })
})

app.listen(PORT,()=>{
    console.log(`This server is connected PORT ${PORT}`)
})
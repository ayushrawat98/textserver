const multer = require('multer')


const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png' || file.mimetype ===  'image/jpg' || file.mimetype ===  'image/gif'|| file.mimetype ===  'video/mp4'|| file.mimetype ===  'video/webm'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // let extension = ''
    // if(file.mimetype === 'video/mp4'){
    //     extension = '.mp4'
    // }else if(file.mimetype ===  'video/webm'){
    //     extension = '.webm'
    // }
    // console.log('here',req.file,file)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })

// const upload = multer({dest : 'public/videos', limits : {fileSize : 5242880}})

const upload = multer({storage : storage, limits : {fileSize : 31*1024*1024}, fileFilter : filefilter})
// const upload = multer({storage : storage, limits : {fileSize : 30*1024*1024}})

module.exports = upload
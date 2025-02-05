const express = require('express')
const compression = require('compression')
const path = require('path')
const sync = require('./sync')
const comment = require('./comment.model')
const upload = require('./multer')
const { Op } = require('sequelize')
const generateThumbnail = require('./thumbnail')
const generateVideoThumbnail = require('./videothumbnail')

const app = express()

//before serving static , compress it
app.use(compression())

//serve index.html
app.use(express.static(path.join(__dirname, "public")));

//parse json data
// app.use(express.urlencoded({extended : true}))
app.use(express.json())

//DB
sync()
// createadmin()

app.get('/thread', async (req, res, next) => {
    let createdThreads = await comment.findAll({
        where : {
            parentcommentid : null
        },
        order: [['updatedAt', 'DESC']] 
    })
    // console.log(createdThreads)
    return res.status(200).json(createdThreads)
})

app.get('/comment/:id',async (req, res, next) => {
    console.log(req.params.id)
    let allComments = await comment.findAll({
        where : {
            [Op.or] : [
                {parentcommentid : req.params.id},
                {id : req.params.id}
            ]
        }
    })
    return res.status(200).json(allComments)
})


app.post('/thread', upload.single('file'), async (req, res) => {
    console.log(req.body, req.file)
    let temp = req.body.message.trim()  
    let filename = req.file ? req.file.filename : null
    let video = filename ? req.file.mimetype == 'video/mp4' || req.file.mimetype == 'video/webm' ? true : false : false
    if(temp.length == 0){
        return res.status(400).json({message : "Incel spotted"})
    }
    let createdThread = await comment.create({comment : temp, parentcommentid : null, image : filename, nouse : 0, isvideo : video})
    if(filename){
        if(video){
            generateVideoThumbnail(filename)
        }else{
            generateThumbnail(filename)
        }
    }
    if(createdThread){
        return res.status(200).json({message : "Thread created."})
    }
})

app.post('/comment', upload.single('file'), async (req, res, next) => {
    console.log(req.body, req.file)
    let temp = req.body.message.trim()  
    let id = req.body.id
    let filename = req.file ? req.file.filename : null
    let video = filename ? req.file.mimetype == 'video/mp4' || req.file.mimetype == 'video/webm' ? true : false : false
    if(temp.length == 0){
        return res.status(400).json({message : "Incel spotted"})
    }
    let createdThread = await comment.create({comment : temp, parentcommentid : id, image : filename, nouse : 0, isvideo : video})
    let updatedate = await comment.increment(
        { nouse : 1},
        { where: { id: req.body.id } }
    )
    if(filename) generateThumbnail(filename)
    if(createdThread){
        return res.status(200).json({message : "comment created."})
    }
})


//send angular index.html and use its routing
app.get('*', (req, res, next) =>{
   return  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//handle any error
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Something broke!')
})


// create server local
app.listen(4000, (ex) => {
    console.log(process.env.PORT)
})
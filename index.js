const express = require('express')
const app = express();
const fs = require('fs');
const ytdl = require('ytdl-core');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

async function getVideo(id){
  try {
    await ytdl(`http://www.youtube.com/watch?v=${id}`)
   .pipe(fs.createWriteStream('public/video.mp4'));
   console.log('Video Siap');
  } catch (error) {
    console.log('errornya'+error);
  }finally {
    console.log('finally');
  }
}

app.route('/')
.get(function(req, res){
  res.render('index.ejs',  {ok : false})
})
.post(function(req, res) {
  const id = req.body.input;
  const b = id.split('/')
  const c = b[b.length - 1];
  getVideo(c);
    res.render('index.ejs', {ok : true})
  });

// const a = 'hai/ya';

app.listen(3000, () => {
    console.log('Server Running on port 3000')
})



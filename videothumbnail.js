const ffmpeg = require('fluent-ffmpeg');

function generateVideoThumbnail(path) {
  // ffmpeg.setFfmpegPath('C:\\Users\\dayush\\Downloads\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe')
  // Generate the thumbnail
  ffmpeg(`public/files/${path}`)
  .screenshots({
    timestamps: [1], // Capture a thumbnail at 1 second into the video
    filename: `thumbnail-${path}.jpeg`, // Generate a unique filename
    folder: 'public/thumbnails',
    size:"100x100"
  })
    .on('end', () => {
      console.log('Thumbnail generated successfully.');
    })
    .on('error', (err) => {
      console.error('Error generating thumbnail:', err);
    });

}

module.exports = generateVideoThumbnail
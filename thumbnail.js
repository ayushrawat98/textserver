const sharp = require('sharp');

function generateThumbnail(path) {
    sharp(`public/files/${path}`)
    .resize(100) // Resize the image to a thumbnail (width: 200px, height: 200px)
    .toFile(`public/thumbnails/thumbnail-${path}`, (err, info) => {
      if (err) {
        console.error('Error generating thumbnail:', err);
      } else {
        console.log('Thumbnail generated successfully:', info);
      }
    });
}

module.exports = generateThumbnail
const xmindmark = require('xmindmark')

const content = `Central Topic\n- Main Topic 1\n- Main Topic 2\n`

xmindmark.parseXMindMarkToXMindFile(content)
  .then(arrayBuffer => {
    console.log(arrayBuffer)
    // Data of generated .xmind file
    // Save as local file or upload to somewhere.
  })


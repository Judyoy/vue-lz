var fs = require('fs'),
swig = require('swig'),
html =  swig.renderFile('./src/tpl/index.swig', {
  dev: true
})

fs.writeFileSync('index.html', html)

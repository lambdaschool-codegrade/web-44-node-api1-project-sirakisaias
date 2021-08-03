const server = require('./api/server');
console.log('sirak is really awesome');
const port = 5000;

server.listen(port, ()=>{
    console.log(`listening on  port ${port}`)
})
// START YOUR SERVER HERE

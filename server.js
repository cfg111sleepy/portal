const express = require('express')

const port = process.env.PORT || 3002;
const app = express();

app.use(express.static('./dist/oask-info-portal-angular-bootstrap'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/oask-info-portal-angular-bootstrap/'});
});

console.log(`Server started at port: ${port}`)
app.listen(port)
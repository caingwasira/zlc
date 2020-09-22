const app = require('./app')

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
    if(err) return console.log('Server failed');
    console.log(`Server started listening on port ${PORT}`)
})

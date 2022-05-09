import express from 'express'
const app = express()
const port = 3001

app.get('/api', (req, res) => {
    res.json({"users": ["userOne", "userTwo"]})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
import express from 'express'
const app = express()
const port = 8088

app.use(express.json())

app.get('/car', (req, res) => {
    res.send('Get car')
})

app.post('/car', (req, res) => {
    console.log('body:', req.body)

    // validate param

    // save data

    res.send('Posted')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
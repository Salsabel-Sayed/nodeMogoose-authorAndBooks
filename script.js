import express from 'express'
import authorRouter from './dataBase/models/author/author.routes.js';
import { dbconnection } from './dbConnection/connection.js';
import BookRouter from './dataBase/models/books/book.routes.js';


const app = express()
const port = 3000
app.use(express.json())

app.use('/authors',authorRouter)
app.use('/books',BookRouter)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
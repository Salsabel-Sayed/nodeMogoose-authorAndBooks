import { Router } from "express";
import { addBook, deleteBook, findBookBy, getAllBook, getSpBook, pagination, patchBooks, updateBooks} from "./book.controller.js";



const BookRouter = Router()

BookRouter.post('/addBook', addBook)
BookRouter.get('/getAllBooks', getAllBook)
BookRouter.get('/getSpBook/:id', getSpBook)
BookRouter.put('/updateBooks/:id', updateBooks)
BookRouter.patch('/patchBooks/:id', patchBooks)
BookRouter.delete('/deleteBook/:id', deleteBook)
BookRouter.get('/findBookBy/', findBookBy)
BookRouter.get('/pagination/', pagination)




export default BookRouter
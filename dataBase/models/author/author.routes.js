import { Router } from "express";
import { addAuthor, deleteAuthor, filterFun, getAllAuthor, getSpAuthor, pagination, patchAuthor, reltionForRes, updateAuthor } from "./author.controller.js";


const authorRouter = Router()

authorRouter.post('/addAuthor', addAuthor)
authorRouter.get('/getAllAuthor', getAllAuthor)
authorRouter.get('/getSpAuthor/:id', getSpAuthor)
authorRouter.put('/updateAuthor/:id', updateAuthor)
authorRouter.patch('/patchAuthor/:id', patchAuthor)
authorRouter.delete('/deleteAuthor/:id', deleteAuthor)
authorRouter.get('/pagination/', pagination)
authorRouter.get('/filterFun/', filterFun)
authorRouter.get('/reltionForRes/:id', reltionForRes)


export default authorRouter
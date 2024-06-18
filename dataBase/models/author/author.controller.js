import {Author} from "../author/author.model.js"
import { Book } from "../books/book.model.js";




const addAuthor = async(req,res)=>{
    try {
        let author = await Author.insertMany(req.body)
        res.status(201).json({message:"added",author})
    } catch (error) {
        console.log("err", error);
        
    }
}

//************************************************************************************************************** */
// ? get all Author
const getAllAuthor = async(req,res)=>{
    try {
        const getAllAuthor = await Author.find().populate('books')
        res.json({message:"egt them", getAllAuthor})
    } catch (error) {
        console.log("get All Author",error);
    }
}

//************************************************************************************************************** */
// ? get author by id

const getSpAuthor = async(req,res)=>{
    try {
        const getAuthorById = await Author.findById(req.params.id)
        res.json({message:"egt them", getAuthorById})
    } catch (error) {
        console.log("get Author by id err:",error);
        
    }
}


//************************************************************************************************************** */

// ? update Author
const updateAuthor = async(req,res)=>{
    try {
        const update = await Author.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json({message:"egt them", update})
    } catch (error) {
        
    }
}
//************************************************************************************************************** */

// ? patch Author
const patchAuthor = async(req,res)=>{
    try {
        const update = await Author.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true });
        if (!update) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book name updated successfully", updatedBookname: update.name });
    } catch (error) {
        console.log("Error updating book name:", error);
        res.status(500).json({ error: "An error occurred while updating the book name" });
    }
}

//************************************************************************************************************** */

// ? delete author

const deleteAuthor = async(req,res)=>{
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id)
        res.json({message:"deleted",deletedAuthor})
    } catch (error) {
        console.log("deleteAuthor err :",error);
    }
}

//************************************************************************************************************** */

// ? Add pagination to the GET endpoints for retrieving all books and authors.

const pagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("page", page);
    console.log("limit", limit);
    try {
      const authors = await Author.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      console.log("authors", authors);
      res.json({ message: "limit 3", authors });
    } catch (error) {
      console.log("page err:", error);
      res.status(500).json({ message: "An error occurred while fetching authors." });
    }
  };


  //************************************************************************************************************** */

// ? Implement search functionality to filter books by title or author, and authors by name or bio.

const filterFun = async (req, res) => {
    const name = req.query.name;
    const bio = req.query.bio;

    try {
        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (bio) {
            query.bio = { $regex: bio, $options: 'i' };
        }

        const authors = await Author.find(query);

        if (authors.length === 0) {
            return res.status(404).json({ message: 'No authors found.' });
        }

        res.json({ authors });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//************************************************************************************************************** */

// ? Add a relationship so that when retrieving an author, the response includes a list of books written by them.

const reltionForRes = async(req,res)=>{
    const authorId = req.params.id
    console.log('authorId',authorId);
    try {
        const authorWithBooks = await Author.findOne({_id:authorId})
        const booksWith = await Book.find({authorName: authorId})
        console.log("authorWithBooks",authorWithBooks);
        console.log("booksWith",booksWith);
        if(authorWithBooks && booksWith){
           
            res.json({author: authorWithBooks, books: booksWith})
        }
    } catch (error) {
        console.log(error);
    }
}




//************************************************************************************************************** */

export{
    addAuthor,
    getAllAuthor,
    updateAuthor,
    deleteAuthor,
    getSpAuthor,
    patchAuthor,
    pagination,
    filterFun,
    reltionForRes
}

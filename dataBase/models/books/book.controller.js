import { Author } from "../author/author.model.js";
import { Book } from "../books/book.model.js";


// ? add books
const addBook = async(req,res)=>{
    try {
        let book = await Book.insertMany(req.body)
        res.status(201).json({message:"added",book})
    } catch (error) {
        console.log("addbook err:", error);
        
    }
}
//************************************************************************************************************** */
// ? get all books
const getAllBook = async(req,res)=>{
    try {
        const getAllBooks = await Book.find().populate('authorName', 'name')
        res.json({message:"egt them", getAllBooks})
    } catch (error) {
        console.log("get all Book err:",error);
        
    }
}

//************************************************************************************************************** */
// ? get book by id

const getSpBook = async(req,res)=>{
    try {
        const getBookById = await Book.findById(req.params.id).populate('authorName')
        res.json({message:"egt them", getBookById})
    } catch (error) {
        console.log("get Book by id err:",error);
        
    }
}

//************************************************************************************************************** */

// ? update books
const updateBooks = async(req,res)=>{
    try {
        const update = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json({message:"egt them", update})
    } catch (error) {
        console.log("updateBook err:",error);
    }
}

//************************************************************************************************************** */

// ? patch books
const patchBooks = async(req,res)=>{
    try {
        const update = await Book.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title }, { new: true });
        if (!update) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book title updated successfully", updatedBooktitle: update.title });
    } catch (error) {
        console.log("Error updating book title:", error);
        res.status(500).json({ error: "An error occurred while updating the book title" });
    }
}

//************************************************************************************************************** */

// ? delete books

const deleteBook = async(req,res)=>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        res.json({message:"deleted",deletedBook})
    } catch (error) {
        console.log("deleteBook err :",error);
        
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
      const books = await Book.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      console.log("books", books);
      res.json({ message: "limit 3", books });
    } catch (error) {
      console.log("page err:", error);
      res.status(500).json({ message: "An error occurred while fetching books." });
    }
  };

  //************************************************************************************************************** */

// ? Implement search functionality to filter books by title or author, and authors by name or bio.
const findBookBy = async (req, res) => {
    const title = req.query.title;
    const authorName = req.query.authorName;
    console.log("authorName", authorName);

    try {
        let query = {};

        if (title) {
            query.title = { $regex: new RegExp(title, 'i') };
        }
        if (authorName) {
            
            const author = await Author.findOne({ name: { $regex: new RegExp(authorName, 'i') } });
            if (author) {
                query.authorName = author._id;
            } else {
                return res.status(404).json({ message: 'Author not found.' });
            }
        }

        const books = await Book.find(query).populate('authorName', 'name');

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found.' });
        }

        res.json({ books });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//**************************************************************************************************************





export{
    addBook,
    getAllBook,
    updateBooks,
    deleteBook,
    getSpBook,
    patchBooks,
    findBookBy,
    pagination
    
}

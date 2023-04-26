const express = require(`express`);
const app = express();

const db = require(`./config/database.js`)

app.use(express.json());

// CRUD
// GET: all
app.get(`/bestbooks`, (req, res) => {
    const sql = `SELECT * FROM bestbooks;`;
    db.connection.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        };

        res.status(200).json({
            error: false,
            message: `Displaying all records in bestbooks`,
            count: result.length,
            data: result
        })
    })
});

// GET: by id
app.get(`/bestbooks/:id`, (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM bestbooks WHERE id = ${id};`;
    db.connection.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        };

        if (result.length < 1) {
            return res.status(404).json({
                error: true,
                message: `No books with id ${id}`
                // message: error.message   // why does this cause a crash ???
            })
        };

        res.status(200).json({
            error: false,
            message: `The book with id ${id}`,
            data: result
        })
    })
})

// POST: new record
app.post(`/bestbooks`, (req, res) => {
    const newBook = req.body;
    const sql = `INSERT INTO bestbooks (title, author, price) 
        VALUES ("${newBook.title}", "${newBook.author}", "${newBook.price}");`;
    db.connection.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        };

        res.status(201).json({
            error: false,
            message: `New book successfully added to the bestbooks records`,
            data: result
        })
    })
});

// PUT: update by id
app.put(`/bestbooks/:id`, (req, res) => {
    const id = req.params.id;
    const updateBook = req.body;
    const sql = `UPDATE bestbooks SET title = "${updateBook.title}", author = "${updateBook.author}", price = "${updateBook.price}" WHERE id = ${id};`;
    db.connection.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        };

        res.status(202).json({
            error: false,
            message: `Book with id ${id} has been updated successfully`,
            data: result
        })
    })
});

// DELETE: delete by id
app.delete(`/bestbooks/:id`, (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM bestbooks WHERE id = ${id};`;
    db.connection.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        };

        res.status(202).json({
            error: false,
            message: `Book with id ${id} has been deleted successfully`,
            data: result
        })
    })
});

const PORT = process.env.PORT | 6969;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
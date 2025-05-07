import express from "express";
import Database from "better-sqlite3";


const db = new Database("./db/products.db", {
    verbose: console.log,
});

const port = 8000;

const app = express();

app.use(express.json());

const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/å/g, "a")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

// GET
app.get("/api/products", (req, res) => {

    const select = db.prepare("SELECT id, productName, productPrice, description, category, color, image, publishDate, urlSlug, SKU FROM products")

    const products = select.all();

    const category = req.query.category;
    const search = req.query.search;
    const color = req.query.color;

    let filteredProducts = products;

    if (category) {
    filteredProducts = filteredProducts.filter(
        (x) => x.category.toLowerCase() === category.toLowerCase()
    );
    }

    if (color) {
    filteredProducts = filteredProducts.filter(
        (x) => x.color.toLowerCase() === color.toLowerCase());
    }

    if (search) {
    filteredProducts = filteredProducts.filter(
        (x) => x.productName.toLowerCase().includes(search.toLowerCase()) ||
        x.color.toLowerCase().includes(search.toLowerCase()) ||
        x.category.toLowerCase().includes(search.toLowerCase())
    );
    }

    res.json(filteredProducts);
    
    
});

// GET detaljsida
app.get("/api/products/:urlSlug", (req, res) => {

    const urlSlug = req.params.urlSlug;

    const stmt = db.prepare("SELECT id, productName, productPrice, description, category, color, image, publishDate, urlSlug, SKU FROM products WHERE urlSlug = ?");

    const product = stmt.get(urlSlug);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }

});

// POST anrop
app.post("/api/products", (req, res) => {

    const newProduct = {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        description: req.body.description,
        category: req.body.category,
        color: req.body.color,
        image: req.body.image,
        publishDate: new Date().toISOString(),
        urlSlug: slugify(req.body.productName),
        SKU: req.body.SKU
};
    const insert = db.prepare(`
        INSERT INTO products (productName, productPrice, description, category, color, image, publishDate, urlSlug, SKU)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = insert.run(
        newProduct.productName,
        newProduct.productPrice,
        newProduct.description,
        newProduct.category,
        newProduct.color,
        newProduct.image,
        newProduct.publishDate,
        newProduct.urlSlug,
        newProduct.SKU
    );

    res.status(201).json({ id: result.lastInsertRowid, ...newProduct });
});

// DELETE-anrop
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes > 0) {
        res.status(200).json({ message: "Produkten raderades." });
    } else {
        res.status(404).json({ message: "Produkten hittades inte."})
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


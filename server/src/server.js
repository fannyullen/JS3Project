import express from "express";
import Database from "better-sqlite3";


const db = new Database("./db/products.db", {
    verbose: console.log,
});

const port = 8000;

const app = express();

// middleware, denna behövs, annars kan vi inte komma åt t.ex. req.body; i post-anropet
app.use(express.json());

// Funktion för att generera urlSlug till ny produkt
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

    const select = db.prepare("SELECT id, productName, productPrice, description, category, color, image, publishDate, urlSlug FROM products")

    const products = select.all();

    const category = req.query.category;
    const search = req.query.search;
    const color = req.query.color;

    let filteredProducts = products;

    // Filtrera på genre om det finns
    if (category) {
    filteredProducts = filteredProducts.filter(
        (x) => x.category.toLowerCase() === category.toLowerCase()
    );
    }

    if (color) {
    filteredProducts = filteredProducts.filter(
        (x) => x.color.toLowerCase() === color.toLowerCase());
    }

    // Filtrera på namn (sökning) om det finns
    if (search) {
    filteredProducts = filteredProducts.filter(
        (x) => x.productName.toLowerCase().includes(search.toLowerCase()) ||
        x.color.toLowerCase().includes(search.toLowerCase()) ||
        x.category.toLowerCase().includes(search.toLowerCase())
    );
    }


    // Filtrera produkter baserat på namn, kategori eller färg
    /* this.filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.color.toLowerCase().includes(query)
      ); */

    res.json(filteredProducts);
    
    
});

// GET detaljsida
app.get("/api/products/:urlSlug", (req, res) => {

    const urlSlug = req.params.urlSlug;

    const stmt = db.prepare("SELECT id, productName, productPrice, description, category, color, image, publishDate, urlSlug FROM products WHERE urlSlug = ?");

    const product = stmt.get(urlSlug);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }

});

// POST anrop
app.post("/api/products", (req, res) => {

    // tar emot ny produkt
    const newProduct = {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        description: req.body.description,
        category: req.body.category,
        color: req.body.color,
        image: req.body.image,
        publishDate: new Date().toISOString(),
        urlSlug: slugify(req.body.productName)
};

    // förbereder databas att lägga till ny produkt med följande värden
    const insert = db.prepare(`
        INSERT INTO products (productName, productPrice, description, category, color, image, publishDate, urlSlug)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    // lägger till produkten
    const result = insert.run(
        newProduct.productName,
        newProduct.productPrice,
        newProduct.description,
        newProduct.category,
        newProduct.color,
        newProduct.image,
        newProduct.publishDate,
        newProduct.urlSlug
    );

    // Returnera den nya produkten med genererat ID
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

/* app.get('/api/products/search', (req, res) => {
    const query = req.query.q?.toLowerCase() || '';
    const likeQuery = `%${query}%`;

    // felhantering med try/catch
    try {
        const stmt = db.prepare(`
            SELECT * FROM products
            WHERE LOWER(productName) LIKE ?
            OR  LOWER(category) LIKE ?
            OR LOWER(color) LIKE ?
            `);

            const products = stmt.all(likeQuery, likeQuery, likeQuery);
            res.json(products);
    } catch (err) {
        console.error('Fel vid sökning:', err);
        res.status(500).json({error: 'Serverfel vid sökning'});
    }
}); */

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


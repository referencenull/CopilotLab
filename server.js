const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:'); // Using in-memory database for easy testing

// Create products table and populate with 20 products
db.serialize(() => {
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        description TEXT
    )`);

    const products = [
        ['Wireless Mouse', 'Electronics', 29.99, 45, 'Ergonomic wireless mouse with USB receiver'],
        ['Mechanical Keyboard', 'Electronics', 89.99, 23, 'RGB mechanical gaming keyboard'],
        ['USB-C Hub', 'Electronics', 39.99, 67, '7-in-1 USB-C hub with HDMI and card reader'],
        ['Laptop Stand', 'Accessories', 34.99, 52, 'Adjustable aluminum laptop stand'],
        ['Desk Lamp', 'Office', 44.99, 31, 'LED desk lamp with brightness control'],
        ['Office Chair', 'Furniture', 199.99, 15, 'Ergonomic office chair with lumbar support'],
        ['Desk Organizer', 'Office', 19.99, 88, 'Bamboo desk organizer with compartments'],
        ['Headphones', 'Electronics', 79.99, 38, 'Noise-cancelling over-ear headphones'],
        ['Webcam', 'Electronics', 69.99, 26, '1080p HD webcam with microphone'],
        ['Monitor', 'Electronics', 249.99, 18, '27-inch 4K IPS monitor'],
        ['Notebook Set', 'Stationery', 14.99, 120, 'Set of 3 premium notebooks'],
        ['Pen Set', 'Stationery', 12.99, 95, 'Professional ballpoint pen set'],
        ['Water Bottle', 'Accessories', 24.99, 73, 'Insulated stainless steel water bottle'],
        ['Phone Holder', 'Accessories', 16.99, 64, 'Adjustable phone holder for desk'],
        ['Cable Organizer', 'Accessories', 9.99, 142, 'Cable management clips and ties'],
        ['Mousepad', 'Accessories', 19.99, 85, 'Extended gaming mousepad'],
        ['Whiteboard', 'Office', 54.99, 22, 'Magnetic dry-erase whiteboard'],
        ['Filing Cabinet', 'Furniture', 149.99, 12, '3-drawer metal filing cabinet'],
        ['Bookshelf', 'Furniture', 129.99, 9, '5-tier wooden bookshelf'],
        ['Plant Pot', 'Decor', 17.99, 56, 'Ceramic plant pot with drainage tray']
    ];

    const stmt = db.prepare('INSERT INTO products (name, category, price, quantity, description) VALUES (?, ?, ?, ?, ?)');
    products.forEach(product => {
        stmt.run(product);
    });
    stmt.finalize();
});

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(row);
    });
});

// Add new product
app.post('/api/products', (req, res) => {
    const { name, category, price, quantity, description } = req.body;
    
    if (!name || !category || price === undefined || quantity === undefined) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    db.run(
        'INSERT INTO products (name, category, price, quantity, description) VALUES (?, ?, ?, ?, ?)',
        [name, category, price, quantity, description || ''],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, name, category, price, quantity, description });
        }
    );
});

// Update product quantity
app.put('/api/products/:id', (req, res) => {
    const { quantity } = req.body;
    
    if (quantity === undefined) {
        res.status(400).json({ error: 'Quantity is required' });
        return;
    }

    db.run(
        'UPDATE products SET quantity = ? WHERE id = ?',
        [quantity, req.params.id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }
            res.json({ message: 'Product updated successfully' });
        }
    );
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

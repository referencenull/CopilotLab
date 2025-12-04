const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
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
        ['Yamaha YZ450F', 'Bikes', 9399.99, 5, 'High-performance 450cc motocross bike with electric start'],
        ['KTM 250 SX-F', 'Bikes', 8999.99, 7, 'Lightweight 250cc four-stroke competition bike'],
        ['Honda CRF450R', 'Bikes', 9599.99, 4, 'Championship-winning 450cc motocross machine'],
        ['Kawasaki KX250', 'Bikes', 8299.99, 6, 'Powerful 250cc two-stroke racer'],
        ['Suzuki RM-Z450', 'Bikes', 8899.99, 5, 'Competitive 450cc motocross bike with advanced suspension'],
        ['Husqvarna FC 350', 'Bikes', 9899.99, 3, 'Premium 350cc race-ready motocross bike'],
        ['Fox Racing V1 Helmet', 'Helmets', 199.99, 25, 'DOT-certified motocross helmet with MIPS technology'],
        ['Alpinestars Supertech M10', 'Helmets', 749.99, 12, 'Professional-grade carbon fiber helmet'],
        ['Bell Moto-9 Flex', 'Helmets', 599.99, 18, 'Flex technology helmet with superior impact protection'],
        ['Thor Sector Helmet', 'Helmets', 149.99, 30, 'Entry-level motocross helmet with aggressive styling'],
        ['Fox Racing 180 Jersey', 'Gear', 49.99, 45, 'Moisture-wicking motocross jersey with stretch panels'],
        ['Alpinestars Racer Pants', 'Gear', 159.99, 35, 'Durable motocross pants with reinforced knees'],
        ['Leatt 3DF Impact Shorts', 'Gear', 89.99, 28, 'Protective shorts with hip and tailbone padding'],
        ['Thor Force Gloves', 'Gear', 29.99, 60, 'Lightweight gloves with silicone palm print'],
        ['Gaerne SG-12 Boots', 'Boots', 599.99, 15, 'Premium motocross boots with dual-stage pivot system'],
        ['Alpinestars Tech 10 Boots', 'Boots', 699.99, 10, 'Top-tier racing boots with innovative closure system'],
        ['Fox Comp Boots', 'Boots', 249.99, 22, 'Entry to mid-level motocross boots'],
        ['Dunlop Geomax MX33', 'Tires', 89.99, 50, 'Soft to medium terrain rear tire 110/90-19'],
        ['Michelin StarCross 5', 'Tires', 109.99, 40, 'All-terrain front tire 80/100-21'],
        ['Pirelli Scorpion MX32', 'Tires', 99.99, 45, 'Mid-soft terrain motocross tire']
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

# MotoX Pro - Motocross Bike Inventory Management System

A modern web application for managing motocross bike and gear inventory. Built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

- 🏍️ **Browse Inventory**: View all motocross bikes, helmets, gear, and accessories in a modern, responsive grid layout
- ➕ **Add Items**: Easy-to-use form for adding new bikes and gear to inventory
- 🗑️ **Delete Items**: Remove items from inventory with confirmation
- 📝 **Update Quantity**: Modify inventory quantities with a simple interface
- 🔍 **Search**: Real-time search functionality to filter bikes, helmets, and gear
- 📊 **Statistics**: Dashboard showing total items, inventory value, and low stock alerts
- 🎨 **Motocross Theme**: Orange and black gradient design inspired by motocross racing
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Pre-populated Database

The application comes with 20 pre-populated motocross items across various categories:
- **Bikes**: Premium motocross bikes from top brands (Yamaha, KTM, Honda, Kawasaki, Suzuki, Husqvarna)
- **Helmets**: Safety-certified helmets from Fox Racing, Alpinestars, Bell, and Thor
- **Gear**: Jerseys, pants, protective shorts, and gloves
- **Boots**: Professional motocross boots from Gaerne, Alpinestars, and Fox
- **Tires**: High-performance motocross tires from Dunlop, Michelin, and Pirelli

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Add a new product
- `PUT /api/products/:id` - Update product quantity
- `DELETE /api/products/:id` - Delete a product

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: SQLite (in-memory for easy testing)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Motocross-themed gradient design with orange and black colors

## Project Structure

```
├── server.js           # Express server and API routes
├── package.json        # Node.js dependencies
├── public/
│   ├── index.html     # Main HTML page
│   ├── styles.css     # CSS styling
│   └── app.js         # Client-side JavaScript
└── README.md          # This file
```

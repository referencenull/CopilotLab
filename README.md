# CopilotLab - Inventory Management System

A modern web application for managing retail store inventory. Built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

- 📦 **Browse Products**: View all products in a modern, responsive grid layout
- ➕ **Add Products**: Easy-to-use form for adding new products to inventory
- 🗑️ **Delete Products**: Remove products from inventory with confirmation
- 📝 **Update Quantity**: Modify product quantities with a simple interface
- 🔍 **Search**: Real-time search functionality to filter products
- 📊 **Statistics**: Dashboard showing total products, inventory value, and low stock alerts
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Pre-populated Database

The application comes with 20 pre-populated products across various categories:
- Electronics (Mouse, Keyboard, Headphones, Monitor, etc.)
- Office Supplies (Desk Lamp, Organizer, Whiteboard, etc.)
- Furniture (Office Chair, Bookshelf, Filing Cabinet, etc.)
- Accessories (Laptop Stand, Water Bottle, Cable Organizer, etc.)
- Stationery (Notebooks, Pen Sets, etc.)

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
- **Styling**: Modern gradient design with animations

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

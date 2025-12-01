let products = [];
let currentEditId = null;

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Add search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterProducts(e.target.value);
    });
});

// Load all products from API
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayProducts(products);
        updateStats();
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products');
    }
}

// Display products in the grid
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    
    if (productsToDisplay.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h2>📦 No Products Found</h2>
                <p>Start by adding your first product to the inventory</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <span class="product-category">${product.category}</span>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description || 'No description available'}</div>
            <div class="product-info">
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-quantity ${product.quantity < 20 ? 'low-stock' : ''}">
                    <span class="quantity-label">Stock:</span>
                    ${product.quantity} units
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-edit" onclick="showEditModal(${product.id}, '${product.name}', ${product.quantity})">
                    📝 Update Qty
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStock = products.filter(p => p.quantity < 20).length;
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
    document.getElementById('lowStock').textContent = lowStock;
}

// Filter products based on search
function filterProducts(searchTerm) {
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filtered);
}

// Show add product modal
function showAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

// Close add product modal
function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addProductForm').reset();
}

// Show edit quantity modal
function showEditModal(id, name, quantity) {
    currentEditId = id;
    document.getElementById('editProductId').value = id;
    document.getElementById('editProductName').value = name;
    document.getElementById('editQuantity').value = quantity;
    document.getElementById('editModal').style.display = 'block';
}

// Close edit quantity modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('editQuantityForm').reset();
    currentEditId = null;
}

// Add new product
async function addProduct(event) {
    event.preventDefault();
    
    const product = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        description: document.getElementById('productDescription').value
    };
    
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        
        if (response.ok) {
            closeAddModal();
            loadProducts();
            showSuccess('Product added successfully!');
        } else {
            showError('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        showError('Failed to add product');
    }
}

// Update product quantity
async function updateQuantity(event) {
    event.preventDefault();
    
    const quantity = parseInt(document.getElementById('editQuantity').value);
    
    try {
        const response = await fetch(`/api/products/${currentEditId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });
        
        if (response.ok) {
            closeEditModal();
            loadProducts();
            showSuccess('Quantity updated successfully!');
        } else {
            showError('Failed to update quantity');
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        showError('Failed to update quantity');
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProducts();
            showSuccess('Product deleted successfully!');
        } else {
            showError('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        showError('Failed to delete product');
    }
}

// Show success message
function showSuccess(message) {
    alert('✅ ' + message);
}

// Show error message
function showError(message) {
    alert('❌ ' + message);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    
    if (event.target === addModal) {
        closeAddModal();
    }
    if (event.target === editModal) {
        closeEditModal();
    }
}

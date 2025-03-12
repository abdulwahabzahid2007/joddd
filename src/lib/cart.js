// Cart functionality for NeoTech Gaming website

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('neotech_cart')) || [];

// Update cart count in the UI
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('neotech_cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = window.productUtils.getProductById(parseInt(productId));
    
    if (!product) {
        console.error('Product not found');
        return;
    }
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save cart and update UI
    saveCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
    
    // Render cart items if cart is open
    if (document.querySelector('.cart-modal.open')) {
        renderCartItems();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== parseInt(productId));
    saveCart();
    renderCartItems();
}

// Update item quantity
function updateQuantity(productId, quantity) {
    const itemIndex = cart.findIndex(item => item.id === parseInt(productId));
    
    if (itemIndex !== -1) {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            removeFromCart(productId);
        } else {
            // Update quantity
            cart[itemIndex].quantity = quantity;
            saveCart();
            renderCartItems();
        }
    }
}

// Calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    renderCartItems();
}

// Render cart items in the cart modal
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    // Clear current items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><p>Add some awesome gaming hardware!</p></div>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    // Add each item to the cart
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total
    const total = calculateTotal();
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(item => item.id === parseInt(id));
            if (item) {
                updateQuantity(id, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(item => item.id === parseInt(id));
            if (item) {
                updateQuantity(id, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize cart functionality
function initCart() {
    // Update cart count on page load
    updateCartCount();
    
    // Add event listener to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartIcon && cartModal && closeCart) {
        // Open cart modal
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('open');
            renderCartItems();
        });
        
        // Close cart modal
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('open');
        });
        
        // Close cart when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('open');
            }
        });
    }
    
    // Add event listener to clear cart button
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Add event listener to checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            
            // In a real application, this would redirect to a checkout page
            showNotification('Proceeding to checkout...');
            
            // For demo purposes, just clear the cart after "checkout"
            setTimeout(() => {
                clearCart();
                cartModal.classList.remove('open');
                showNotification('Thank you for your purchase!');
            }, 2000);
        });
    }
}

// Export cart functionality
window.cartUtils = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    initCart
}; 
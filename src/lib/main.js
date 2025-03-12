// Main JavaScript for NeoTech Gaming website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart functionality
    if (window.cartUtils) {
        window.cartUtils.initCart();
    }
    
    // Initialize products display
    loadProducts();
    
    // Initialize filter buttons
    initFilterButtons();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Add notification styles
    addNotificationStyles();
});

// Load products into the products grid
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid || !window.productUtils) return;
    
    // Get featured products
    const products = window.productUtils.getFeaturedProducts();
    
    // Clear products grid
    productsGrid.innerHTML = '';
    
    // Add each product to the grid
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    addToCartListeners();
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    let badgeHTML = '';
    if (product.badge) {
        badgeHTML = `<div class="product-badge">${product.badge}</div>`;
    }
    
    card.innerHTML = `
        <div class="product-image">
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${getCategoryName(product.category)}</p>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Get readable category name
function getCategoryName(category) {
    const categories = {
        'gpu': 'Graphics Card',
        'cpu': 'Processor',
        'motherboard': 'Motherboard',
        'ram': 'Memory'
    };
    
    return categories[category] || category;
}

// Add event listeners to "Add to Cart" buttons
function addToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            
            if (window.cartUtils) {
                window.cartUtils.addToCart(productId);
                
                // Add animation effect
                button.classList.add('added');
                setTimeout(() => {
                    button.classList.remove('added');
                }, 1000);
            }
        });
    });
}

// Initialize filter buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!filterButtons.length || !window.productUtils) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category to filter
            const category = button.getAttribute('data-filter');
            
            // Get products by category
            const products = window.productUtils.getProductsByCategory(category);
            
            // Update products grid
            const productsGrid = document.querySelector('.products-grid');
            
            if (productsGrid) {
                // Clear products grid
                productsGrid.innerHTML = '';
                
                // Add filtered products
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productsGrid.appendChild(productCard);
                });
                
                // Add event listeners to new "Add to Cart" buttons
                addToCartListeners();
            }
        });
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Initialize scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get navbar height for offset
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (sections.length && navLinks.length) {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add notification styles
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: var(--dark-text);
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: 600;
            box-shadow: var(--neon-shadow);
            z-index: 3000;
            transition: bottom 0.5s ease;
        }
        
        .notification.show {
            bottom: 20px;
        }
        
        .empty-cart {
            text-align: center;
            padding: 2rem 0;
        }
        
        .empty-cart p {
            margin-bottom: 0.5rem;
            color: var(--light-text);
        }
        
        .add-to-cart.added {
            background: var(--accent-color);
            transform: scale(1.05);
        }
    `;
    
    document.head.appendChild(style);
}

// Create placeholder images for demo
function createPlaceholderImages() {
    // This function would normally not be needed in a production environment
    // where real images would be used. For this demo, we're creating colored
    // rectangles as placeholders.
    
    const categories = {
        'gpu': '#ff5722',
        'cpu': '#2196f3',
        'motherboard': '#4caf50',
        'ram': '#9c27b0'
    };
    
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    for (const [category, color] of Object.entries(categories)) {
        for (let i = 1; i <= 3; i++) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 30px Orbitron';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${getCategoryName(category)} ${i}`, canvas.width / 2, canvas.height / 2);
            
            const dataUrl = canvas.toDataURL('image/png');
            
            // Create an image element
            const img = new Image();
            img.src = dataUrl;
            
            // In a real application, you would save this image to a file
            // For this demo, we're just creating them in memory
            console.log(`Created placeholder for ${category}-${i}`);
        }
    }
} 
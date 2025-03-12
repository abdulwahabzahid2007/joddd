// Products data for NeoTech Gaming website

const products = [
    {
        id: 1,
        name: "RTX 4090 Ti Quantum",
        category: "gpu",
        price: 1999.99,
        image: "https://placehold.co/400x300/ff5722/ffffff?text=RTX+4090+Ti+Quantum",
        description: "The ultimate gaming GPU with 32GB GDDR7 memory and ray tracing capabilities.",
        inStock: true,
        featured: true,
        badge: "NEW"
    },
    {
        id: 2,
        name: "AMD Ryzen 9 9950X",
        category: "cpu",
        price: 749.99,
        image: "https://placehold.co/400x300/2196f3/ffffff?text=AMD+Ryzen+9+9950X",
        description: "16-core, 32-thread processor with 5.8GHz boost clock for extreme gaming performance.",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "ROG Maximus Z890 Hero",
        category: "motherboard",
        price: 599.99,
        image: "https://placehold.co/400x300/4caf50/ffffff?text=ROG+Maximus+Z890",
        description: "Premium gaming motherboard with PCIe 5.0, DDR5 support, and advanced cooling.",
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "Corsair Dominator Platinum RGB",
        category: "ram",
        price: 349.99,
        image: "https://placehold.co/400x300/9c27b0/ffffff?text=Corsair+Dominator",
        description: "64GB (2x32GB) DDR5-6400 with RGB lighting and aluminum heat spreaders.",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "RTX 4080 Super Frost",
        category: "gpu",
        price: 1299.99,
        image: "https://placehold.co/400x300/ff5722/ffffff?text=RTX+4080+Super",
        description: "High-performance GPU with 24GB GDDR6X memory and advanced cooling system.",
        inStock: true,
        featured: false
    },
    {
        id: 6,
        name: "Intel Core i9-14900K",
        category: "cpu",
        price: 599.99,
        image: "https://placehold.co/400x300/2196f3/ffffff?text=Intel+i9-14900K",
        description: "24-core (8P+16E) processor with 6.0GHz boost for gaming and content creation.",
        inStock: true,
        featured: false
    },
    {
        id: 7,
        name: "MSI MEG X870 ACE",
        category: "motherboard",
        price: 499.99,
        image: "https://placehold.co/400x300/4caf50/ffffff?text=MSI+MEG+X870",
        description: "High-end motherboard with premium VRMs, PCIe 5.0, and M.2 Shield Frozr.",
        inStock: true,
        featured: false
    },
    {
        id: 8,
        name: "G.Skill Trident Z5 Neo RGB",
        category: "ram",
        price: 299.99,
        image: "https://placehold.co/400x300/9c27b0/ffffff?text=G.Skill+Trident",
        description: "32GB (2x16GB) DDR5-7200 with RGB lighting and CL30 timing.",
        inStock: true,
        featured: false
    },
    {
        id: 9,
        name: "Radeon RX 7900 XTX Phantom",
        category: "gpu",
        price: 1099.99,
        image: "https://placehold.co/400x300/ff5722/ffffff?text=RX+7900+XTX",
        description: "AMD flagship GPU with 24GB GDDR6 memory and ray accelerators.",
        inStock: true,
        featured: false,
        badge: "HOT"
    },
    {
        id: 10,
        name: "AMD Ryzen 7 9700X",
        category: "cpu",
        price: 449.99,
        image: "https://placehold.co/400x300/2196f3/ffffff?text=Ryzen+7+9700X",
        description: "12-core, 24-thread processor with 5.6GHz boost for high-performance gaming.",
        inStock: true,
        featured: false
    },
    {
        id: 11,
        name: "ASUS ROG Strix B850-F Gaming",
        category: "motherboard",
        price: 299.99,
        image: "https://placehold.co/400x300/4caf50/ffffff?text=ROG+Strix+B850",
        description: "Mid-range gaming motherboard with PCIe 5.0, DDR5 support, and Aura Sync RGB.",
        inStock: true,
        featured: false
    },
    {
        id: 12,
        name: "Kingston Fury Beast RGB",
        category: "ram",
        price: 249.99,
        image: "https://placehold.co/400x300/9c27b0/ffffff?text=Kingston+Fury",
        description: "32GB (2x16GB) DDR5-6000 with RGB lighting and low-profile design.",
        inStock: true,
        featured: false
    }
];

// Function to get all products
function getAllProducts() {
    return products;
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to get a product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Export functions
window.productUtils = {
    getAllProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getProductById
}; 
// Script to generate placeholder images for products
// This is a utility script that would be run separately to generate images

// Create directory structure if it doesn't exist
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

// Ensure directories exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Create a canvas element (using node-canvas in Node.js environment)
const { createCanvas } = require('canvas');

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

// Create placeholder images
function createPlaceholderImages() {
    const categories = {
        'gpu': '#ff5722',
        'cpu': '#2196f3',
        'motherboard': '#4caf50',
        'ram': '#9c27b0'
    };
    
    const canvas = createCanvas(400, 300);
    const ctx = canvas.getContext('2d');
    
    // Create hero background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some futuristic elements
    ctx.strokeStyle = '#00f7ff';
    ctx.lineWidth = 2;
    
    // Draw some lines
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(400, 50);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 300);
    ctx.stroke();
    
    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NEOTECH', canvas.width / 2, canvas.height / 2);
    
    // Save hero background
    const heroBuffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(imagesDir, 'hero-bg.jpg'), heroBuffer);
    console.log('Created hero background image');
    
    // Create featured PC image
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some glow effect
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, 150
    );
    gradient.addColorStop(0, '#7000ff');
    gradient.addColorStop(1, '#0a0a1a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QUANTUM RIG', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = 'bold 20px Arial';
    ctx.fillText('FEATURED BUILD', canvas.width / 2, canvas.height / 2 + 20);
    
    // Save featured PC image
    const featuredBuffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(imagesDir, 'featured-pc.jpg'), featuredBuffer);
    console.log('Created featured PC image');
    
    // Create product images for each category
    for (const [category, color] of Object.entries(categories)) {
        for (let i = 1; i <= 3; i++) {
            // Clear canvas
            ctx.fillStyle = '#0a0a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add colored rectangle
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.7;
            ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
            ctx.globalAlpha = 1.0;
            
            // Add border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
            
            // Add text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${getCategoryName(category)} ${i}`, canvas.width / 2, canvas.height / 2 - 20);
            
            ctx.font = 'bold 20px Arial';
            ctx.fillText('NEOTECH GAMING', canvas.width / 2, canvas.height / 2 + 20);
            
            // Save image
            const buffer = canvas.toBuffer('image/jpeg');
            fs.writeFileSync(path.join(imagesDir, `${category}-${i}.jpg`), buffer);
            console.log(`Created placeholder for ${category}-${i}`);
        }
    }
    
    console.log('All placeholder images created successfully!');
}

// Run the function
createPlaceholderImages(); 
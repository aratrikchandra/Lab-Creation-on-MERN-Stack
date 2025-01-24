// Create Users and Products collections
db.createCollection("Users");
db.createCollection("Products");

// Populate the Users collection with the 'role' field
db.Users.insertMany([
    { user_id: 1, name: "Aratrik Chandra", email: "23m0786@iitb.ac.in", role: "admin" },
    { user_id: 2, name: "Abhyanand Sharma", email: "24m0795@iitb.ac.in", role: "admin" },
    { user_id: 3, name: "Prasoon Kumar", email: "24m0832@iitb.ac.in", role: "admin" },
    { user_id: 4, name: "David Wilson", email: "david.wilson@example.com", role: "user" },
    { user_id: 5, name: "Eva Adams", email: "eva.adams@example.com", role: "user" },
    { user_id: 6, name: "Frank Miller", email: "frank.miller@example.com", role: "user" },
    { user_id: 7, name: "Grace Lee", email: "grace.lee@example.com", role: "user" },
    { user_id: 8, name: "Hannah Davis", email: "hannah.davis@example.com", role: "user" },
    { user_id: 9, name: "Ian Thompson", email: "ian.thompson@example.com", role: "user" },
    { user_id: 10, name: "Jack White", email: "jack.white@example.com", role: "user" },
    { user_id: 11, name: "Karen Martinez", email: "karen.martinez@example.com", role: "user" },
    { user_id: 12, name: "Liam Clark", email: "liam.clark@example.com", role: "user" },
    { user_id: 13, name: "Mia Lopez", email: "mia.lopez@example.com", role: "user" },
    { user_id: 14, name: "Noah Gonzalez", email: "noah.gonzalez@example.com", role: "user" },
    { user_id: 15, name: "Olivia Harris", email: "olivia.harris@example.com", role: "user" },
    { user_id: 16, name: "Paul Martin", email: "paul.martin@example.com", role: "user" },
    { user_id: 17, name: "Quinn Walker", email: "quinn.walker@example.com", role: "user" },
    { user_id: 18, name: "Rachel Lewis", email: "rachel.lewis@example.com", role: "user" },
    { user_id: 19, name: "Sam Young", email: "sam.young@example.com", role: "user" },
    { user_id: 20, name: "Tina King", email: "tina.king@example.com", role: "user" }
]);

// Populate the Products collection
db.Products.insertMany([
    { product_id: 1, name: "Smartphone", description: "Latest model smartphone with advanced features", category: "Electronics", price: 699.99, stock: 50 },
    { product_id: 2, name: "Laptop", description: "High performance laptop for gaming and work", category: "Electronics", price: 999.99, stock: 30 },
    { product_id: 3, name: "Smart TV", description: "55-inch 4K Ultra HD Smart LED TV", category: "Electronics", price: 499.99, stock: 20 },
    { product_id: 4, name: "Headphones", description: "Wireless noise-cancelling over-ear headphones", category: "Electronics", price: 199.99, stock: 70 },
    { product_id: 5, name: "Smartwatch", description: "Waterproof smartwatch with fitness tracking", category: "Electronics", price: 149.99, stock: 100 },
    { product_id: 6, name: "Tablet", description: "10-inch tablet with Wi-Fi and cellular", category: "Electronics", price: 299.99, stock: 60 },
    { product_id: 7, name: "Digital Camera", description: "Compact digital camera with 20MP sensor", category: "Electronics", price: 249.99, stock: 40 },
    { product_id: 8, name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with high-quality sound", category: "Electronics", price: 89.99, stock: 80 },
    { product_id: 9, name: "External Hard Drive", description: "1TB portable external hard drive", category: "Electronics", price: 79.99, stock: 90 },
    { product_id: 10, name: "Wireless Mouse", description: "Ergonomic wireless mouse with adjustable DPI", category: "Electronics", price: 29.99, stock: 150 },
    { product_id: 11, name: "Gaming Console", description: "Next-gen gaming console with 4K gaming", category: "Electronics", price: 499.99, stock: 25 },
    { product_id: 12, name: "VR Headset", description: "Virtual reality headset with motion controllers", category: "Electronics", price: 399.99, stock: 35 },
    { product_id: 13, name: "Fitness Tracker", description: "Fitness tracker with heart rate monitor", category: "Electronics", price: 99.99, stock: 110 },
    { product_id: 14, name: "E-Reader", description: "E-reader with adjustable front light", category: "Electronics", price: 129.99, stock: 55 },
    { product_id: 15, name: "Smart Light Bulb", description: "Smart LED light bulb with Wi-Fi control", category: "Electronics", price: 24.99, stock: 200 },
    { product_id: 16, name: "Drone", description: "Camera drone with 4K video recording", category: "Electronics", price: 699.99, stock: 20 },
    { product_id: 17, name: "Action Camera", description: "Waterproof action camera with 4K resolution", category: "Electronics", price: 199.99, stock: 60 },
    { product_id: 18, name: "Wireless Charger", description: "Fast wireless charger for smartphones", category: "Electronics", price: 39.99, stock: 130 },
    { product_id: 19, name: "Bluetooth Earbuds", description: "True wireless Bluetooth earbuds with charging case", category: "Electronics", price: 59.99, stock: 120 },
    { product_id: 20, name: "Smart Thermostat", description: "Smart thermostat with Wi-Fi control", category: "Electronics", price: 249.99, stock: 45 }
]);
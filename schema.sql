-- ==========================================
-- 💎 TG MOBILE ACCESSORIES SCHEMA
-- ==========================================

CREATE DATABASE IF NOT EXISTS tg_mobile_db;
USE tg_mobile_db;

-- 1. Roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT DEFAULT 2, -- Default 'customer' (1 for 'admin')
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- 3. Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL, -- Retail price in DZD
    wholesale_enabled BOOLEAN DEFAULT FALSE,
    minimum_order_quantity INT DEFAULT 1,
    stock_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 5. Product Images
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 6. Bulk Pricing Tiers (The dynamic wholesale logic)
CREATE TABLE bulk_pricing_tiers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    min_quantity INT NOT NULL,
    max_quantity INT, -- NULL means infinity (e.g., 50+ items)
    price_per_unit DECIMAL(10,2) NOT NULL, -- Price in DZD
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 7. Coupons
CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 8. Orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    coupon_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE SET NULL
);

-- 9. Order Items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL, -- Price snapshotted at time of purchase
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ==========================================
-- SEED DATA (DZD)
-- ==========================================

INSERT INTO roles (name) VALUES ('admin'), ('customer');

INSERT INTO categories (name, slug, description) VALUES 
('Phone Cases', 'phone-cases', 'Luxury and protective phone cases'),
('Chargers', 'chargers', 'Fast charging adapters and cables'),
('AirPods Cases', 'airpods-cases', 'Premium covers for Apple AirPods');

-- Products
INSERT INTO products (category_id, name, slug, description, base_price, wholesale_enabled, stock_quantity) VALUES 
(1, 'CyberArmor iPhone 15 Pro Case', 'cyberarmor-iphone-15-pro', 'Sleek luxury design with shockproof protection.', 2500.00, TRUE, 120),
(2, 'TurboCharge 65W GaN Adapter', 'turbocharge-65w', 'Ultra-fast charging for mobile and laptops.', 4500.00, TRUE, 50),
(3, 'Liquid Gold AirPods Pro Case', 'liquid-gold-airpods', 'Minimalist metallic gold aesthetic cover.', 1500.00, TRUE, 85);

-- Images
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800', TRUE),
(2, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800', TRUE),
(3, 'https://images.unsplash.com/photo-1600294037681-c8004b3419bb?auto=format&fit=crop&q=80&w=800', TRUE);

-- Bulk Pricing 
-- Case: 1-9 = 2500, 10-49 = 2000, 50+ = 1500
INSERT INTO bulk_pricing_tiers (product_id, min_quantity, max_quantity, price_per_unit) VALUES
(1, 10, 49, 2000.00),
(1, 50, NULL, 1500.00),
-- Charger: 1-9 = 4500, 10-29 = 4000, 30+ = 3500
(2, 10, 29, 4000.00),
(2, 30, NULL, 3500.00),
-- AirPods: 1-19 = 1500, 20-99 = 1200, 100+ = 900
(3, 20, 99, 1200.00),
(3, 100, NULL, 900.00);

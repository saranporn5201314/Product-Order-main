-- 1. สร้างตารางสำหรับเก็บข้อมูลหลักของคำสั่งซื้อ (Order)
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    total_amount DOUBLE DEFAULT 0.0
);

-- 2. สร้างตารางสำหรับเก็บรายการสินค้าแต่ละชิ้น (OrderItem)
CREATE TABLE order_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INTEGER NOT NULL,
    subtotal DOUBLE NOT NULL,
    order_id BIGINT,
    -- เชื่อมความสัมพันธ์ไปยังตาราง orders
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
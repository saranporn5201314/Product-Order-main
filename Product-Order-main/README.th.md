# ระบบจัดการคำสั่งซื้อสินค้า (Product Order Management System)

[English](README.md) | **ภาษาไทย**

ระบบเว็บแอปพลิเคชันสำหรับบันทึกและจัดการคำสั่งซื้อสินค้า พัฒนาด้วยสถาปัตยกรรมแบบแยกส่วน (Decoupled Architecture) โดย Frontend ที่เขียนด้วย HTML/JavaScript จะติดต่อกับ Backend ที่เป็น REST API ซึ่งพัฒนาด้วย Java Spring Boot

---

## ฟีเจอร์หลัก

- กรอกข้อมูลลูกค้า ได้แก่ เลขที่สั่งซื้อ ชื่อลูกค้า เบอร์โทรศัพท์ และที่อยู่
- เพิ่ม แก้ไข และลบรายการสินค้าในคำสั่งซื้อได้ก่อนกดยืนยัน
- คำนวณราคารวมต่อรายการและยอดรวมทั้งหมดให้อัตโนมัติ
- ตรวจสอบข้อมูล (Validation): ราคาและจำนวนต้องมากกว่า 0 (ตรวจทั้งฝั่ง Frontend และ Backend)
- บันทึกคำสั่งซื้อผ่าน REST API ลงในฐานข้อมูล H2

---

## เทคโนโลยีที่ใช้ (Tech Stack)

| ส่วน | เทคโนโลยี |
| :--- | :--- |
| Backend | Java 17, Spring Boot 3.2.2 (Web, Data JPA, Validation) |
| Database | H2 (In-memory) ร่วมกับ JPA / Hibernate |
| Frontend | HTML5, Bootstrap 5, Vanilla JavaScript |
| API | RESTful API (JSON) |
| Build tool | Maven (มี Maven Wrapper มาให้แล้ว ไม่ต้องติดตั้งเพิ่ม) |

---

## โครงสร้างโปรเจกต์

```
Product-Order-main/
├── README.md                     ← README ภาษาอังกฤษ
├── README.th.md                  ← README ภาษาไทย
├── frontend/
│   ├── index.html                ← หน้าฟอร์มสั่งซื้อสินค้า
│   └── script.js                 ← จัดการตารางสินค้า + ส่งข้อมูลไปยัง API
└── backend/
    └── order_management/
        ├── pom.xml
        ├── mvnw / mvnw.cmd       ← Maven Wrapper
        └── src/main/
            ├── java/com/example/order_management/
            │   ├── OrderManagementApplication.java   ← คลาสหลัก (ไฟล์สำหรับรันโปรแกรม)
            │   ├── controller/OrderController.java   ← REST endpoints
            │   ├── service/OrderService.java         ← ตรวจสอบข้อมูล + คำนวณยอดรวม
            │   ├── repository/OrderRepository.java   ← JPA repository
            │   └── entity/Order.java, OrderItem.java ← โครงสร้างข้อมูล
            └── resources/
                ├── application.properties            ← ตั้งค่าฐานข้อมูล H2
                └── schema.sql                        ← คำสั่งสร้างตาราง
```

---

## โครงสร้างข้อมูล (Data Model)

**Order** (ตาราง `orders`) เก็บข้อมูลคำสั่งซื้อ

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย |
| :--- | :--- | :--- |
| `id` | Long | รหัสหลัก (สร้างอัตโนมัติ) |
| `orderNumber` | String | เลขที่สั่งซื้อ เช่น `ORD001` |
| `customerName` | String | ชื่อลูกค้า |
| `phone` | String | เบอร์โทรศัพท์ |
| `address` | String | ที่อยู่จัดส่ง |
| `totalAmount` | Double | ยอดรวมสุทธิ (Backend เป็นผู้คำนวณ) |
| `items` | List&lt;OrderItem&gt; | รายการสินค้าในคำสั่งซื้อนี้ |

**OrderItem** (ตาราง `order_item`) เก็บรายละเอียดสินค้าแต่ละรายการ

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย |
| :--- | :--- | :--- |
| `id` | Long | รหัสหลัก (สร้างอัตโนมัติ) |
| `productName` | String | ชื่อสินค้า |
| `price` | Double | ราคาต่อหน่วย (ต้องมากกว่า 0) |
| `quantity` | Integer | จำนวน (ต้องมากกว่า 0) |
| `subtotal` | Double | ราคารวมต่อรายการ = `price × quantity` (Backend เป็นผู้คำนวณ) |

ความสัมพันธ์: **Order** 1 รายการ มีได้หลาย **OrderItem** (One-to-Many)

---

## วิธีการติดตั้งและรันโปรเจกต์

### สิ่งที่ต้องมี

- **JDK 17 ขึ้นไป**
- เว็บเบราว์เซอร์
- **ไม่ต้อง**ติดตั้ง Maven เพราะโปรเจกต์มี Maven Wrapper (`mvnw.cmd`) มาให้แล้ว

ตรวจสอบว่ามี Java แล้วหรือยัง:

```cmd
java -version
```

ถ้าขึ้นข้อความ `'java' is not recognized as an internal or external command` แสดงว่ายังไม่ได้ติดตั้ง Java ให้รันคำสั่งนี้ใน cmd:

```cmd
winget install EclipseAdoptium.Temurin.17.JDK
```

จากนั้น**ปิดแล้วเปิด** cmd (หรือ VS Code) ใหม่ แล้วรัน `java -version` อีกครั้ง
หรือดาวน์โหลดตัวติดตั้งจาก [adoptium.net](https://adoptium.net) ก็ได้ โดยตอนติดตั้งให้เลือก **Add to PATH** และ **Set JAVA_HOME** ด้วย

### 1. รัน Backend

**วิธีที่ 1: ผ่าน Command Prompt (cmd)**

```cmd
cd /d "<ที่อยู่โฟลเดอร์โปรเจกต์>\Product-Order-main\backend\order_management"
mvnw.cmd spring-boot:run
```

**วิธีที่ 2: ผ่าน VS Code**

1. ติดตั้งส่วนขยาย **Extension Pack for Java**
2. เปิดโฟลเดอร์ `backend/order_management`
3. เปิดไฟล์ `OrderManagementApplication.java` แล้วกด **Run**

การรันครั้งแรกจะดาวน์โหลดไลบรารีที่จำเป็น อาจใช้เวลาหลายนาที เมื่อเห็นข้อความนี้แสดงว่าเซิร์ฟเวอร์พร้อมใช้งาน:

```
Started OrderManagementApplication
```

เซิร์ฟเวอร์จะรันที่ `http://localhost:8080` ให้เปิดหน้าต่างนี้ทิ้งไว้ตลอดการใช้งาน กด `Ctrl+C` เมื่อต้องการหยุดเซิร์ฟเวอร์

### 2. เปิด Frontend

เปิดไฟล์ `frontend/index.html` ด้วยเว็บเบราว์เซอร์ (ดับเบิลคลิกที่ไฟล์)

1. กรอกเลขที่สั่งซื้อ ชื่อลูกค้า เบอร์โทรศัพท์ และที่อยู่
2. กรอกชื่อสินค้า ราคาต่อหน่วย และจำนวน แล้วกด **Add**
3. กด **Edit** เพื่อแก้ไข หรือ **Del** เพื่อลบรายการสินค้า
4. กด **Order** เพื่อบันทึกคำสั่งซื้อไปยัง Backend

---

## ลิงก์ที่ใช้บ่อย

| URL | สิ่งที่แสดง |
| :--- | :--- |
| http://localhost:8080/orders | คำสั่งซื้อทั้งหมดในรูปแบบ JSON |
| http://localhost:8080/h2-console | หน้าจัดการฐานข้อมูล H2 |

**ข้อมูลเข้าสู่ระบบ H2 Console:**

- JDBC URL: `jdbc:h2:mem:testdb`
- User Name: `sa`
- Password: `password`

> **หมายเหตุ:** ถ้าเปิด `http://localhost:8080/` จะเจอหน้า **Whitelabel Error Page (404)** ซึ่งเป็นเรื่องปกติ เพราะ Backend เป็นเพียง API และมี endpoint อยู่ที่ `/orders` เท่านั้น

> **หมายเหตุ:** ฐานข้อมูล H2 เป็นแบบ **In-memory** ข้อมูลคำสั่งซื้อทั้งหมดจะหายไปเมื่อปิดเซิร์ฟเวอร์

---

## รายละเอียด API (Endpoints)

| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| **GET** | `/orders` | ดึงรายการคำสั่งซื้อทั้งหมดในระบบ |
| **POST** | `/orders` | บันทึกคำสั่งซื้อใหม่ (Backend คำนวณราคารวมต่อรายการและยอดรวมสุทธิให้) |
| **DELETE** | `/orders/{id}` | ลบคำสั่งซื้อตาม ID |

**ตัวอย่างข้อมูลที่ส่ง: `POST /orders`**

```json
{
  "orderNumber": "ORD001",
  "customerName": "สมชาย ใจดี",
  "phone": "0812345678",
  "address": "123 ถนนตัวอย่าง กรุงเทพฯ",
  "items": [
    { "productName": "ปากกา", "price": 15, "quantity": 4 },
    { "productName": "สมุด", "price": 45, "quantity": 2 }
  ]
}
```

**ตัวอย่างข้อมูลที่ได้รับกลับมา**

```json
{
  "id": 1,
  "orderNumber": "ORD001",
  "customerName": "สมชาย ใจดี",
  "phone": "0812345678",
  "address": "123 ถนนตัวอย่าง กรุงเทพฯ",
  "totalAmount": 150.0,
  "items": [
    { "id": 1, "productName": "ปากกา", "price": 15.0, "quantity": 4, "subtotal": 60.0 },
    { "id": 2, "productName": "สมุด", "price": 45.0, "quantity": 2, "subtotal": 90.0 }
  ]
}
```

ถ้ามีสินค้ารายการใดที่ราคาหรือจำนวนน้อยกว่าหรือเท่ากับ 0 Backend จะไม่บันทึกคำสั่งซื้อนั้น

---

## การแก้ปัญหาเบื้องต้น

| ปัญหา | วิธีแก้ |
| :--- | :--- |
| `'java' is not recognized...` | ติดตั้ง JDK 17 (ดูหัวข้อ [สิ่งที่ต้องมี](#สิ่งที่ต้องมี)) แล้วเปิด cmd หน้าต่างใหม่ |
| `JAVA_HOME not found` | ติดตั้ง JDK ใหม่ และเลือก **Set JAVA_HOME** ด้วย |
| เจอ `Whitelabel Error Page` ที่ `localhost:8080` | เป็นเรื่องปกติ ให้เปิด `/orders` หรือเปิดไฟล์ `frontend/index.html` แทน |
| Frontend แจ้งว่าติดต่อ Server ไม่ได้ | ตรวจสอบว่ารัน Backend อยู่หรือไม่ |
| พอร์ต 8080 ถูกใช้งานอยู่ | ปิดโปรแกรมอื่นที่ใช้พอร์ต 8080 หรือหยุดเซิร์ฟเวอร์ตัวก่อนหน้า |

---

## ผู้จัดทำ

- 67121343 ศรัณย์พร ขำเจริญ

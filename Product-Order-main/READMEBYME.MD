ระบบเว็บแอปพลิเคชันสำหรับบันทึกและจัดการคำสั่งซื้อสินค้า พัฒนาด้วยสถาปัตยกรรมแบบแยกส่วน (Decoupled Architecture) ระหว่าง Frontend และ Backend

---

###  เทคโนโลยีที่ใช้ (Tech Stack)
* **Backend:** Java Spring Boot 3
* **Database:** H2 Database / JPA Hibernate
* **Frontend:** HTML5, Bootstrap 5 และ Vanilla JavaScript
* **API:** RESTful API (JSON)

---

###  โครงสร้างข้อมูล (Data Model)
1.  **Order**: เก็บข้อมูลผู้ซื้อ, เลขที่สั่งซื้อ และยอดรวมสุทธิ
2.  **OrderItem**: เก็บรายละเอียดสินค้า, ราคา, จำนวน และยอดรวมต่อรายการ

---

###  วิธีการติดตั้งและรันโปรเจกต์
1.  **Backend:**
    * เปิดโฟลเดอร์ `backend/order_management` ด้วย VS Code
    * รันโปรเจกต์ผ่านไฟล์ `OrderManagementApplication.java`
        * cd /d "d:\WU-Third\zTHIRD-2\Product-Order-main\Product-Order-main\backend\order_management"
            * And run this
                * mvnw.cmd spring-boot:run
                * java -version
                    * if it show "'java' is not recognized as an internal or external command,operable program or batch file"
                    * run this "winget install EclipseAdoptium.Temurin.17.JDK" in cmd for installs Java.
                    * close VScode and open again
                    * and run this "java -version" in cmd again
                    * cd /d "d:\WU-Third\zTHIRD-2\Product-Order-main\Product-Order-main\backend\order_management"
                    * mvnw.cmd spring-boot:run
    * Server จะรันที่พอร์ต `http://localhost:8080/orders`

2.  **Frontend:**
    * เปิดไฟล์ `frontend/index.html` ด้วย Browser
    * สามารถใช้งานฟีเจอร์ Add, Edit, Delete รายการสินค้าได้ทันที

---

###  รายละเอียด API (Endpoints)
| Method | Endpoint | รายละเอียด |
| :--- | :--- | :--- |
| **POST** | `/orders` | บันทึกคำสั่งซื้อใหม่และคำนวณราคาสุทธิ |
| **GET** | `/orders` | ดึงรายการคำสั่งซื้อทั้งหมดในระบบ |
| **PUT** | `/orders/{id}` | แก้ไขคำสั่งซื้อ |
| **DELETE** | `/orders/{id}` | ลบรายการคำสั่งซื้อตาม ID |

---

###  ผู้จัดทำ
* 67121343 ศรัณย์พร ขำเจริญ
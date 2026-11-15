// เก็บรายการสินค้าชั่วคราวในรูปแบบ Array
let orderItems = [];

// 1. ฟังก์ชันเพิ่มสินค้าลงในตาราง (Add Item)
function addItem() {
    const name = document.getElementById('inputName').value;
    const price = parseFloat(document.getElementById('inputPrice').value);
    const qty = parseInt(document.getElementById('inputQty').value);

    // ตรวจสอบความถูกต้อง (Validation) ตามเงื่อนไข Backend
    if (!name || isNaN(price) || price <= 0 || isNaN(qty) || qty <= 0) {
        alert("กรุณากรอกชื่อสินค้า ราคา และจำนวนให้ถูกต้อง (ราคาและจำนวนต้องมากกว่า 0)");
        return;
    }

    // สร้าง Object สินค้าใหม่
    const item = {
        productName: name,
        price: price,
        quantity: qty,
        subtotal: price * qty
    };

    // เพิ่มลงใน Array และล้างค่าในช่อง Input
    orderItems.push(item);
    clearInputs();
    renderTable();
}

// 2. ฟังก์ชันแสดงผลตารางใหม่ทุกครั้งที่มีการเปลี่ยนแปลง (Render Table)
function renderTable() {
    const tbody = document.getElementById('itemTableBody');
    // เก็บแถวสำหรับกรอกข้อมูล (แถวแรก) ไว้
    const inputRow = tbody.rows[0];
    tbody.innerHTML = '';
    tbody.appendChild(inputRow);

    let grandTotal = 0;

    orderItems.forEach((item, index) => {
        grandTotal += item.subtotal;
        const row = `
            <tr>
                <td>${item.productName}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>${item.quantity}</td>
                <td>${item.subtotal.toLocaleString()}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm me-2" onclick="editItem(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Del</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });

    // อัปเดตราคารวมทั้งหมด
    document.getElementById('grandTotal').innerText = grandTotal.toLocaleString();
}

// 3. ฟังก์ชันลบรายการสินค้า (Delete Item)
function deleteItem(index) {
    if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
        orderItems.splice(index, 1);
        renderTable();
    }
}

// 4. ฟังก์ชันแก้ไขรายการ (Edit Item) - ดึงข้อมูลกลับมาที่ช่อง Input
function editItem(index) {
    const item = orderItems[index];
    document.getElementById('inputName').value = item.productName;
    document.getElementById('inputPrice').value = item.price;
    document.getElementById('inputQty').value = item.quantity;
    
    // ลบตัวเดิมออกก่อน เดี๋ยวค่อยกด Add ใหม่
    orderItems.splice(index, 1);
    renderTable();
}

function clearInputs() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputPrice').value = '';
    document.getElementById('inputQty').value = '';
}

// 5. ฟังก์ชันส่งข้อมูลไป Backend (Submit Order)
async function submitOrder() {
    if (orderItems.length === 0) {
        alert("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ");
        return;
    }

    const payload = {
        orderNumber: document.getElementById('orderNumber').value,
        customerName: document.getElementById('customerName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        items: orderItems // ส่ง Array ของสินค้า
    };

    try {
        const response = await fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            alert("บันทึกข้อมูลสำเร็จ! เลขที่รายการ: " + result.id);
            location.reload(); // รีเฟรชหน้าเพื่อเริ่มใหม่
        } else {
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถติดต่อ Server ได้ (ตรวจสอบว่ารัน Spring Boot อยู่หรือไม่)");
    }
}
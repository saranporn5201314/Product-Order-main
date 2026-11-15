# Product Order Management System

**English** | [ภาษาไทย](README.th.md)

A web application for recording and managing product orders. It uses a decoupled architecture: a plain HTML/JavaScript frontend talks to a Java Spring Boot REST API backend.

---

## Features

- Enter customer details: order number, name, phone number and address
- Add, edit and delete product items in the order before submitting
- Line totals and the grand total are calculated automatically
- Validation: price and quantity must be greater than 0 (checked on both frontend and backend)
- Orders are saved through a REST API into an H2 database

---

## Tech Stack

| Part | Technology |
| :--- | :--- |
| Backend | Java 17, Spring Boot 3.2.2 (Web, Data JPA, Validation) |
| Database | H2 (in-memory) with JPA / Hibernate |
| Frontend | HTML5, Bootstrap 5, Vanilla JavaScript |
| API | RESTful API (JSON) |
| Build tool | Maven (Maven Wrapper included, no install needed) |

---

## Project Structure

```
Product-Order-main/
├── README.md                     ← English README
├── README.th.md                  ← Thai README
├── frontend/
│   ├── index.html                ← Order form page
│   └── script.js                 ← Item table logic + sends order to the API
└── backend/
    └── order_management/
        ├── pom.xml
        ├── mvnw / mvnw.cmd       ← Maven Wrapper
        └── src/main/
            ├── java/com/example/order_management/
            │   ├── OrderManagementApplication.java   ← Main class (start here)
            │   ├── controller/OrderController.java   ← REST endpoints
            │   ├── service/OrderService.java         ← Validation + total calculation
            │   ├── repository/OrderRepository.java   ← JPA repository
            │   └── entity/Order.java, OrderItem.java ← Data model
            └── resources/
                ├── application.properties            ← H2 database settings
                └── schema.sql                        ← Table definitions
```

---

## Data Model

**Order** (table `orders`)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Primary key (auto-generated) |
| `orderNumber` | String | Order number, e.g. `ORD001` |
| `customerName` | String | Customer name |
| `phone` | String | Phone number |
| `address` | String | Delivery address |
| `totalAmount` | Double | Grand total (calculated by the backend) |
| `items` | List&lt;OrderItem&gt; | Items in this order |

**OrderItem** (table `order_item`)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Long | Primary key (auto-generated) |
| `productName` | String | Product name |
| `price` | Double | Unit price (must be > 0) |
| `quantity` | Integer | Quantity (must be > 0) |
| `subtotal` | Double | `price × quantity` (calculated by the backend) |

One **Order** has many **OrderItems** (one-to-many).

---

## Getting Started

### Requirements

- **JDK 17 or newer**
- A web browser
- Maven is **not** required, because the project includes the Maven Wrapper (`mvnw.cmd`)

Check whether Java is installed:

```cmd
java -version
```

If you see `'java' is not recognized as an internal or external command`, install Java:

```cmd
winget install EclipseAdoptium.Temurin.17.JDK
```

Then **close and reopen** cmd (or VS Code) and run `java -version` again.
You can also download the installer from [adoptium.net](https://adoptium.net). Make sure **Add to PATH** and **Set JAVA_HOME** are selected.

### 1. Run the Backend

**Option A: Command Prompt (cmd)**

```cmd
cd /d "<path-to-project>\Product-Order-main\backend\order_management"
mvnw.cmd spring-boot:run
```

**Option B: VS Code**

1. Install the **Extension Pack for Java**
2. Open the folder `backend/order_management`
3. Open `OrderManagementApplication.java` and click **Run**

The first run downloads dependencies and may take a few minutes. The server is ready when you see:

```
Started OrderManagementApplication
```

The server runs at `http://localhost:8080`. Keep this window open while you use the app. Press `Ctrl+C` to stop it.

### 2. Open the Frontend

Open `frontend/index.html` in a web browser (double-click the file).

1. Fill in the order number, customer name, phone and address
2. Enter a product name, unit price and quantity, then click **Add**
3. Use **Edit** / **Del** to change or remove items
4. Click **Order** to save the order to the backend

---

## Useful URLs

| URL | What it shows |
| :--- | :--- |
| http://localhost:8080/orders | All saved orders as JSON |
| http://localhost:8080/h2-console | H2 database console |

**H2 console login:**

- JDBC URL: `jdbc:h2:mem:testdb`
- User Name: `sa`
- Password: `password`

> **Note:** Opening `http://localhost:8080/` shows a **Whitelabel Error Page (404)**. This is normal. The backend is only an API, and its endpoint is `/orders`.

> **Note:** The H2 database is **in-memory**, so all orders are deleted when the server stops.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/orders` | Get all orders |
| **POST** | `/orders` | Create a new order (backend calculates subtotals and grand total) |
| **DELETE** | `/orders/{id}` | Delete an order by ID |

**Example request: `POST /orders`**

```json
{
  "orderNumber": "ORD001",
  "customerName": "John Smith",
  "phone": "0812345678",
  "address": "123 Example Road, Bangkok",
  "items": [
    { "productName": "Pen", "price": 15, "quantity": 4 },
    { "productName": "Notebook", "price": 45, "quantity": 2 }
  ]
}
```

**Example response**

```json
{
  "id": 1,
  "orderNumber": "ORD001",
  "customerName": "John Smith",
  "phone": "0812345678",
  "address": "123 Example Road, Bangkok",
  "totalAmount": 150.0,
  "items": [
    { "id": 1, "productName": "Pen", "price": 15.0, "quantity": 4, "subtotal": 60.0 },
    { "id": 2, "productName": "Notebook", "price": 45.0, "quantity": 2, "subtotal": 90.0 }
  ]
}
```

If any item has a price or quantity of 0 or less, the backend rejects the order.

---

## Troubleshooting

| Problem | Solution |
| :--- | :--- |
| `'java' is not recognized...` | Install JDK 17 (see [Requirements](#requirements)) and open a new cmd window |
| `JAVA_HOME not found` | Reinstall the JDK with **Set JAVA_HOME** selected |
| `Whitelabel Error Page` at `localhost:8080` | Normal. Use `/orders` or open `frontend/index.html` |
| Frontend says it cannot connect to the server | Make sure the backend is running |
| Port 8080 is already in use | Close the other program using port 8080, or stop the previous server |

---

## Author

- 67121343 ศรัณย์พร ขำเจริญ

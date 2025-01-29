const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();

// Mock Database with email-password pairs per product
let products = [
  { id: 189, name: "🟡HONDA CIVIC Type R🟡", description: "Compact performance with incredible handling and style.", price: 180.00, image: "https://example.com/product1.jpg", emailPasswords: [
    { id: 1, email: "user1@example.com", password: "pass1", assigned: false },
    { id: 2, email: "user1b@example.com", password: "pass1b", assigned: false }
  ] },
  { id: 2, name: "🔴ACURA NSX🔴", description: "Precision engineering in a hybrid supercar with stunning looks.", price: 400.00, image: "https://example.com/product2.jpg", emailPasswords: [
    { id: 3, email: "user2@example.com", password: "pass2", assigned: false },
    { id: 4, email: "user2b@example.com", password: "pass2b", assigned: false }
  ] },
  { id: 3, name: "🟢BMW M3🟢", description: "A true performance icon, combining luxury with extreme power.", price: 320.00, image: "https://example.com/product3.jpg", emailPasswords: [
    { id: 5, email: "user3@example.com", password: "pass3", assigned: false },
    { id: 6, email: "user3b@example.com", password: "pass3b", assigned: false }
  ] },
  { id: 4, name: "⚪TOYOTA SUPRA⚪", description: "A legend of the Japanese sportscar world, powerful and sleek.", price: 450.00, image: "https://example.com/product4.jpg", emailPasswords: [
    { id: 7, email: "user4@example.com", password: "pass4", assigned: false },
    { id: 8, email: "user4b@example.com", password: "pass4b", assigned: false }
  ] },
  { id: 5, name: "🟣MERCEDES-AMG GT🟣", description: "A sophisticated German supercar with mind-blowing performance.", price: 500.00, image: "https://example.com/product5.jpg", emailPasswords: [
    { id: 9, email: "user5@example.com", password: "pass5", assigned: false },
    { id: 10, email: "user5b@example.com", password: "pass5b", assigned: false }
  ] },
  { id: 6, name: "🟤NISSAN GT-R🟤", description: "A powerhouse from Nissan, offering jaw-dropping acceleration.", price: 380.00, image: "https://example.com/product6.jpg", emailPasswords: [
    { id: 11, email: "user6@example.com", password: "pass6", assigned: false },
    { id: 12, email: "user6b@example.com", password: "pass6b", assigned: false }
  ] },
  { id: 7, name: "🔵FORD MUSTANG MACH-E🔵", description: "Ford's first all-electric muscle car, combining power with eco-friendliness.", price: 370.00, image: "https://example.com/product7.jpg", emailPasswords: [
    { id: 13, email: "user7@example.com", password: "pass7", assigned: false },
    { id: 14, email: "user7b@example.com", password: "pass7b", assigned: false }
  ] },
  { id: 8, name: "🟠TESLA ROADSTER🟠", description: "Tesla's electric supercar that brings futuristic tech to the road.", price: 650.00, image: "https://example.com/product8.jpg", emailPasswords: [
    { id: 15, email: "user8@example.com", password: "pass8", assigned: false },
    { id: 16, email: "user8b@example.com", password: "pass8b", assigned: false }
  ] },
  { id: 9, name: "⚫JAGUAR F-TYPE⚫", description: "A beautiful British sports car with a commanding presence.", price: 450.00, image: "https://example.com/product9.jpg", emailPasswords: [
    { id: 17, email: "user9@example.com", password: "pass9", assigned: false },
    { id: 18, email: "user9b@example.com", password: "pass9b", assigned: false }
  ] },
  { id: 10, name: "⚪CHEVROLET CAMARO⚪", description: "An American classic, aggressive styling and thrilling power.", price: 360.00, image: "https://example.com/product10.jpg", emailPasswords: [
    { id: 19, email: "user10@example.com", password: "pass10", assigned: false },
    { id: 20, email: "user10b@example.com", password: "pass10b", assigned: false }
  ] },
  { id: 11, name: "🟡MCLAREN 720S🟡", description: "A supercar with blistering speed and stunning looks.", price: 800.00, image: "https://example.com/product11.jpg", emailPasswords: [
    { id: 21, email: "user11@example.com", password: "pass11", assigned: false },
    { id: 22, email: "user11b@example.com", password: "pass11b", assigned: false }
  ] },
  { id: 12, name: "🔴FERRARI 488 GTB🔴", description: "Italian engineering at its finest, a perfect blend of power and luxury.", price: 900.00, image: "https://example.com/product12.jpg", emailPasswords: [
    { id: 23, email: "user12@example.com", password: "pass12", assigned: false },
    { id: 24, email: "user12b@example.com", password: "pass12b", assigned: false }
  ] },
  { id: 13, name: "🟢LAMBORGHINI AVENTADOR🟢", description: "A true Italian masterpiece that screams luxury and power.", price: 1000.00, image: "https://example.com/product13.jpg", emailPasswords: [
    { id: 25, email: "user13@example.com", password: "pass13", assigned: false },
    { id: 26, email: "user13b@example.com", password: "pass13b", assigned: false }
  ] },
  { id: 14, name: "⚪ROLLS-ROYCE GHOST⚪", description: "A premium luxury sedan that delivers the ultimate in comfort and class.", price: 1200.00, image: "https://example.com/product14.jpg", emailPasswords: [
    { id: 27, email: "user14@example.com", password: "pass14", assigned: false },
    { id: 28, email: "user14b@example.com", password: "pass14b", assigned: false }
  ] },
  { id: 15, name: "🟣PORSCHE 911 TURBO🟣", description: "A sports car icon known for its incredible performance and handling.", price: 850.00, image: "https://example.com/product15.jpg", emailPasswords: [
    { id: 29, email: "user15@example.com", password: "pass15", assigned: false },
    { id: 30, email: "user15b@example.com", password: "pass15b", assigned: false }
  ] },
  { id: 16, name: "🟤ASTON MARTIN DB11🟤", description: "A British luxury sports car with a perfect blend of elegance and speed.", price: 950.00, image: "https://example.com/product16.jpg", emailPasswords: [
    { id: 31, email: "user16@example.com", password: "pass16", assigned: false },
    { id: 32, email: "user16b@example.com", password: "pass16b", assigned: false }
  ] },
  { id: 17, name: "🔵CADILLAC ESCALADE🔵", description: "A large luxury SUV with bold styling and advanced features.", price: 700.00, image: "https://example.com/product17.jpg", emailPasswords: [
    { id: 33, email: "user17@example.com", password: "pass17", assigned: false },
    { id: 34, email: "user17b@example.com", password: "pass17b", assigned: false }
  ] },
  { id: 18, name: "🟠TESLA MODEL S🟠", description: "Tesla's flagship electric sedan, offering incredible speed and range.", price: 750.00, image: "https://example.com/product18.jpg", emailPasswords: [
    { id: 35, email: "user18@example.com", password: "pass18", assigned: false },
    { id: 36, email: "user18b@example.com", password: "pass18b", assigned: false }
  ] },
  { id: 19, name: "⚫HONDA ACCORD⚫", description: "Reliable, comfortable, and affordable midsize sedan.", price: 200.00, image: "https://example.com/product19.jpg", emailPasswords: [
    { id: 37, email: "user19@example.com", password: "pass19", assigned: false },
    { id: 38, email: "user19b@example.com", password: "pass19b", assigned: false }
  ] },
  { id: 20, name: "⚪KIA STINGER⚪", description: "A high-performance sports sedan with a sleek design and great handling.", price: 300.00, image: "https://example.com/product20.jpg", emailPasswords: [
    { id: 39, email: "user20@example.com", password: "pass20", assigned: false },
    { id: 40, email: "user20b@example.com", password: "pass20b", assigned: false }
  ] }
  
  ];

// Orders array
let orders = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Frontend
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Store</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { width: 90%; margin: auto; overflow: hidden; }
        .product { border: 1px solid #ddd; padding: 15px; margin: 15px; background: #fff; border-radius: 5px; text-align: center; }
        img { max-width: 100%; height: auto; }
        button { padding: 10px 20px; background: #28a745; color: #fff; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #218838; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Car parking multiplayer store</h1>
        <h2>Own by salesman_empire&1needforspeed</h2>
        ${products.map(product => `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="buyNow(${product.id})">Buy Now</button>
          </div>
        `).join('')}
      </div>
      <script>
        function buyNow(productId) {
          const buyerEmail = prompt("Enter your email:");
          if (buyerEmail) {
            fetch("/payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId, buyerEmail })
            }).then(res => res.text()).then(alert);
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Handle Payment
app.post("/payment", (req, res) => {
  const { productId, buyerEmail } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).send("Product not found.");
  orders.push({ id: orders.length + 1, productId, buyerEmail, status: "Pending" });
  sendEmail("GGSALEMAN0001@gmail.com", "New Order", `New order from ${buyerEmail} for ${product.name}.`);
  res.send("Payment received. Waiting for approval.");
});

// Approve Order
let processingLock = false; // Global lock to prevent race conditions

app.post("/approve", async (req, res) => {
  try {
    // Acquire the lock
    if (processingLock) {
      return res.status(429).send("Server is busy. Please try again later.");
    }
    processingLock = true;

    const { orderId } = req.body;
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      processingLock = false; // Release the lock
      return res.status(404).send("Order not found.");
    }

    const product = products.find(p => p.id === order.productId);
    if (!product) {
      processingLock = false; // Release the lock
      return res.status(404).send("Product not found.");
    }

    // Find the next available email-password pair for this product
    const emailPasswordIndex = product.emailPasswords.findIndex(ep => !ep.assigned);
    if (emailPasswordIndex === -1) {
      processingLock = false; // Release the lock
      return res.status(400).send("No email-password pairs available. Please refresh the list.");
    }

    // Mark the email-password pair as assigned
    product.emailPasswords[emailPasswordIndex].assigned = true;

    // Update the order status
    order.status = "Approved";

    // Send credentials email to the buyer
    await sendEmail(
      order.buyerEmail,
      "Your Credentials",
      `Email: ${product.emailPasswords[emailPasswordIndex].email}, Password: ${product.emailPasswords[emailPasswordIndex].password}`
    );

    // Respond to the admin
    res.send("Order approved and email sent to buyer.");

    // Release the lock
    processingLock = false;
  } catch (error) {
    console.error(error);
    processingLock = false; // Ensure the lock is released in case of an error
    res.status(500).send("Internal server error");
  }
});

// Email Function
function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "GGSALEMAN0001@gmail.com", // Replace with your Gmail address
      pass: "sprl nist kaeb izvx"     // Replace with your Gmail app password
    },
  });

  const mailOptions = {
    from: "GGSALEMAN0001@gmail.com", // Sender email
    to,                              // Recipient email
    subject,                         // Email subject
    text                             // Email body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
}

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));




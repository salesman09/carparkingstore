const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require('cors');

const app = express();

// Updated product list with string IDs
let products = [
  { id: 189, name: "🟢TRACKHAWK🟢 ", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window(S13)FULLY GG", price: 5.50, image: "https://i.ibb.co/n6MRSPb/downloadgram-org-472432608-578486718290980-8992472009254736304-n.jpg", emailPasswords: [
    { id: 1, email: "user1@example.com", password: "pass1", assigned: false },
    { id: 2, email: "user1b@example.com", password: "pass1b", assigned: false }
  ] },
  { id: 2, name: "🟠FORD RAPTOR🟠(1OF2)(S6)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window,GG spoiler", price: 8.50, image: "https://i.ibb.co/Y70z78mJ/472983769-1611744259446516-3288944766819690801-n.jpg", emailPasswords: [
    { id: 3, email: "user2@example.com", password: "pass2", assigned: false },
    { id: 4, email: "user2b@example.com", password: "pass2b", assigned: false }
  ] },
  { id: 3, name: "🔴CHARGER🔴(F/CAR)(S13)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window,GG spoiler", price: 5.50, image: "https://i.ibb.co/7xGDyVzv/470917808-834394528753966-3842862244307062356-n.jpg", emailPasswords: [
    { id: 5, email: "user3@example.com", password: "pass3", assigned: false },
    { id: 6, email: "user3b@example.com", password: "pass3b", assigned: false }
  ] },
  { id: 4, name: "⚪TRACKHAWK⚪(RARE)(S10)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.50, image: "https://i.ibb.co/212mLDvB/470942602-580309404961932-7507533719326493265-n.jpg", emailPasswords: [
    { id: 7, email: "user4@example.com", password: "pass4", assigned: false },
    { id: 8, email: "user4b@example.com", password: "pass4b", assigned: false }
  ] },
  { id: 5, name: "🟤Durango🟣(1OF2)(S6)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 8.50, image: "https://i.ibb.co/4nZL9Ns0/466543205-1315601629426534-7023833597203571954-n.jpg", emailPasswords: [
    { id: 9, email: "user5@example.com", password: "pass5", assigned: false },
    { id: 10, email: "user5b@example.com", password: "pass5b", assigned: false }
  ] },
  { id: 6, name: "🔴CHARGER🟤(S6)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.50, image: "https://i.ibb.co/cKSXqsvz/465724204-1253899295856811-688614979948527701-n.jpg", emailPasswords: [
    { id: 11, email: "user6@example.com", password: "pass6", assigned: false },
    { id: 12, email: "user6b@example.com", password: "pass6b", assigned: false }
  ] },
  { id: 7, name: "🟤300C🟣(S6)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.50, image: "https://i.ibb.co/kscKLrCY/468219589-928050945369799-2612712138307973970-n.jpg", emailPasswords: [
    { id: 13, email: "user7@example.com", password: "pass7", assigned: false },
    { id: 14, email: "user7b@example.com", password: "pass7b", assigned: false }
  ] },
  { id: 8, name: "⚪RAM🔴(S4)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.50, image: "https://i.ibb.co/dwpkG6Nr/466621407-1749376069212535-5183904271606553614-n.jpg", emailPasswords: [
    { id: 15, email: "user8@example.com", password: "pass8", assigned: false },
    { id: 16, email: "user8b@example.com", password: "pass8b", assigned: false }
  ] },
  { id: 9, name: "⚫CHARGER HELLCAT⚫(S4)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.50, image: "https://i.ibb.co/TBSjs0Nd/463775819-1522443641972269-7268240268757643271-n.jpg", emailPasswords: [
    { id: 17, email: "user9@example.com", password: "pass9", assigned: false },
    { id: 18, email: "user9b@example.com", password: "pass9b", assigned: false }
  ] },
  { id: 10, name: "🔴EVO⚪(1OF1", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 7.50, image: "https://i.ibb.co/JwT9M2rS/463154901-403237582835804-436316869320106880-n.jpg", emailPasswords: [
    { id: 19, email: "user10@example.com", password: "pass10", assigned: false },
    { id: 20, email: "user10b@example.com", password: "pass10b", assigned: false }
  ] },
  { id: 11, name: "🟢300C🔴(S4)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 7.00, image: "https://i.ibb.co/FNPmYHZ/466069645-1147236063399078-807693815892609283-n.jpg", emailPasswords: [
    { id: 21, email: "user11@example.com", password: "pass11", assigned: false },
    { id: 22, email: "user11b@example.com", password: "pass11b", assigned: false }
  ] },
  { id: 12, name: "⚫CHARGER🔴(CLEAN ENGINE DESIGN)(S2)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.00, image: "https://i.ibb.co/F4FBdF8t/465476192-1204424657517988-1596781303646244704-n.jpg", emailPasswords: [
    { id: 23, email: "user12@example.com", password: "pass12", assigned: false },
    { id: 24, email: "user12b@example.com", password: "pass12b", assigned: false }
  ] },
  { id: 13, name: "🔵LAMBO🔵FULLY GG", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.00, image: "https://i.ibb.co/mCQyrjDT/464445691-1503698596997917-7609228512076926536-n.jpg", emailPasswords: [
    { id: 25, email: "user13@example.com", password: "pass13", assigned: false },
    { id: 26, email: "user13b@example.com", password: "pass13b", assigned: false }
  ] },
  { id: 14, name: "🟣TOYOTA CAMERY🟣(F/CAR)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 5.50, image: "https://i.ibb.co/PGgRCddJ/465803989-537141242430786-7777451120386042622-n.jpg", emailPasswords: [
    { id: 27, email: "user14@example.com", password: "pass14", assigned: false },
    { id: 28, email: "user14b@example.com", password: "pass14b", assigned: false }
  ] },
  { id: 15, name: "⚪NISSAN 260Z⚪(RARE)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.50, image: "https://i.ibb.co/Wp6W0grM/469491555-1096313868817357-7070631936158751308-n.jpg", emailPasswords: [
    { id: 29, email: "user15@example.com", password: "pass15", assigned: false },
    { id: 30, email: "user15b@example.com", password: "pass15b", assigned: false }
  ] },
  { id: 16, name: "🔴CHALLENGER🔴(RARE)(S5)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window,GG spoiler", price: 7.00, image: "https://i.ibb.co/6cPcsgRk/469705090-1020894780053882-7471993468896194232-n.jpg", emailPasswords: [
    { id: 31, email: "user16@example.com", password: "pass16", assigned: false },
    { id: 32, email: "user16b@example.com", password: "pass16b", assigned: false }
  ] },
  { id: 17, name: "🔴300C🔴(S5)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window,GG spoiler,GG Roofrack", price: 6.00, image: "https://i.ibb.co/3yJGThvs/468974557-1294727741525174-1894874872373672129-n.jpg", emailPasswords: [
    { id: 33, email: "user17@example.com", password: "pass17", assigned: false },
    { id: 34, email: "user17b@example.com", password: "pass17b", assigned: false }
  ] },
  { id: 18, name: "⚪️DURANGO⚪️(F/CAR)(S15)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 4.50, image: "https://i.ibb.co/mrqZ4ZQp/474803178-18213623512290018-6635503764087590689-n.jpg", emailPasswords: [
    { id: 35, email: "user18@example.com", password: "pass18", assigned: false },
    { id: 36, email: "user18b@example.com", password: "pass18b", assigned: false }
  ] },
  { id: 19, name: "🔴Durango⚫(S9)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window", price: 6.00, image: "https://i.ibb.co/HTt2Mv2q/467764710-554404763867174-6162573033780081833-n.jpg", emailPasswords: [
    { id: 37, email: "user19@example.com", password: "pass19", assigned: false },
    { id: 38, email: "user19b@example.com", password: "pass19b", assigned: false }
  ] },
  { id: 20, name: "🟣CHARGER🟣(S1)", description: "GG Rims,GG HP,GG Headlight,GG Calipers,GG Window,GG spoiler", price: 5.50, image: "https://i.ibb.co/cS5gmyYL/470902306-1325825145075258-2255681863874751328-n.jpg", emailPasswords: [
    { id: 39, email: "user20@example.com", password: "pass20", assigned: false },
    { id: 40, email: "user20b@example.com", password: "pass20b", assigned: false }
   ]
  }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow requests from your frontend domain(s)
app.use(cors({
  origin: ['https://github.com/salesman09/carparkingstore', 'http://localhost:3001'] // Add dev/prod URLs
}));

let orders = [];
let nextOrderId = 1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enhanced email transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "GGSALEMAN0001@gmail.com",
    pass: "sprl nist kaeb izvx"
  }
});

// Async email function with proper error handling
async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: '"Salesman Empire Store" <GGSALEMAN0001@gmail.com>',
      to,
      subject,
      text,
      html: `<pre>${text}</pre>`
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background-color: #1a1a1a;
          color: #ffffff;
          min-height: 100vh;
        }

        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        header {
          text-align: center;
          padding: 2rem 0;
          background: #2a2a2a;
          margin-bottom: 2rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0 20px;
        }

        .product {
          background: #2a2a2a;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .product:hover {
          transform: translateY(-5px);
        }

        .product img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 2px solid #28a745;
        }

        .product-content {
          padding: 1.5rem;
        }

        .product h2 {
          color: #28a745;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .product p {
          margin-bottom: 1rem;
          line-height: 1.6;
          color: #cccccc;
        }

        .product button {
          width: 100%;
          padding: 12px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background 0.3s ease;
        }

        .product button:hover {
          background: #218838;
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
            padding: 0 10px;
          }
          
          .product {
            margin-bottom: 1rem;
          }
          
          header h1 {
            font-size: 1.8rem;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <div class="container">
          <h1>🚗 Car Parking Multiplayer Store 🏁</h1>
          <h2>Owned by Salesman Empire & 1NeedForSpeed</h2>
        </div>
      </header>
      
      <div class="products-grid">
        ${products.map(product => `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-content">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>💰 Price: $${product.price}</p>
              <button onclick="buyNow(${product.id})">BUY NOW</button>
            </div>
          </div>
        `).join('')}
      </div>

      <script>
         async function buyNow(productId) {
          const buyerEmail = prompt("Enter your email:");
          if (buyerEmail) {
            try {
              const response = await fetch("/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, buyerEmail })
              });
              const result = await response.text();
              alert(result);
            } catch (error) {
              console.error('Purchase error:', error);
              alert('Payment failed! Please check console for details.');
			  
            }
          }
        }
      </script>
	  <script>
  const API_URL = 'https://github.com/salesman09/carparkingstore';
</script>
    </body>
    </html>
  `);
});


// Payment handler with email notifications
app.post("/payment", async (req, res) => {
  const { productId, buyerEmail } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).send("Product not found.");
  }

  // Create order
  const newOrder = {
    id: nextOrderId++,
    productId,
    buyerEmail,
    status: "Pending",
    timestamp: new Date().toISOString()
  };
  orders.push(newOrder);

  // Find available credentials
  const availableCreds = product.emailPasswords.find(ep => !ep.assigned);
  if (!availableCreds) {
    return res.status(400).send("No available credentials for this product.");
  }
  availableCreds.assigned = true;

  // Send notifications
  try {
    // To seller
    await sendEmail(
      "GGSALEMAN0001@gmail.com",
      "NEW ORDER RECEIVED",
      `New purchase:
      Order ID: ${newOrder.id}
      Product: ${product.name}
      Price: $${product.price}
      Buyer: ${buyerEmail}
      Time: ${new Date().toLocaleString()}`
    );

    // To buyer
    await sendEmail(
      buyerEmail,
      "Order Received",
      `Your order #${newOrder.id} has been received!
      We'll notify you once it's approved.`
    );

    res.send("Payment received. Approval pending.");
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).send("Payment processed but failed to send notifications.");
  }
});

// Approval system with double notifications
app.post("/approve", async (req, res) => {
  const { orderId } = req.body;
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).send("Order not found.");
  }

  if (order.status === "Approved") {
    return res.status(400).send("Order already approved.");
  }

  const product = products.find(p => p.id === order.productId);
  const credentials = product.emailPasswords.find(ep => ep.assigned && !ep.sent);

  if (!credentials) {
    return res.status(400).send("No credentials available.");
  }

  try {
    // Mark credentials as sent
    credentials.sent = true;
    order.status = "Approved";
    order.approvedAt = new Date().toISOString();

    // Send credentials to buyer
    await sendEmail(
      order.buyerEmail,
      "Your Account Credentials",
      `Here are your credentials:
      Email: ${credentials.email}
      Password: ${credentials.password}
      
      Order ID: ${order.id}
      Approved at: ${new Date().toLocaleString()}`
    );

    // Send confirmation to seller
    await sendEmail(
      "GGSALEMAN0001@gmail.com",
      "ORDER APPROVED",
      `Order #${orderId} approved!
      Buyer: ${order.buyerEmail}
      Product: ${product.name}
      Credentials sent: ${credentials.email}`
    );

    res.send(`Order ${orderId} approved. Emails sent to both parties.`);
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).send("Approval failed during email sending.");
  }
});

// Server start
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Initial products loaded: ${products.length}`);
});
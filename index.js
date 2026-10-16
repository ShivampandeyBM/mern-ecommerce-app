const express = require("express");
const app = express();
const cors = require("cors");

const UserController = require("./controllers/userController");
const ProductController = require("./controllers/productController");
const BrandController = require("./controllers/brandController");
const CategoryController = require("./controllers/categoryController");
const CartController = require("./controllers/cartController");
const WishlistController = require("./controllers/wishlistController");
const OrderController = require("./controllers/orderController");
const PaymentController = require("./controllers/paymentController");
const PaymentVerifyController = require("./controllers/paymentVerification");

const { register, login } = require("./controllers/authController");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://mern-e-commerce-project.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.use("/signup", register);
app.use("/login", login);
app.use("/user", UserController);
app.use("/products", ProductController);
app.use("/brands", BrandController);
app.use("/category", CategoryController);
app.use("/cart", CartController);
app.use("/wishlist", WishlistController);
app.use("/order", OrderController);
app.use("/payment", PaymentController);
app.use("/order/paymentVerification", PaymentVerifyController);

module.exports = app;
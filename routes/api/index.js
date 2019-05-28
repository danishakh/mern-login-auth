const router = require("express").Router();
const userRoutes = require("./users");

// Todo routes
router.use("/users", userRoutes);

module.exports = router;
const router = require("express").Router();
const userRoutes = require("./users");

// Todo routes
// /api/users
router.use("/users", userRoutes);

module.exports = router;
const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post(
    '/',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([ADMIN, USER]),
    authMiddleware.isPasswordsMatched,
    authController.login
);
router.post('/logout', authController.logout);

module.exports = router;

const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post(
    '/',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    authController.login
);
router.post('/logout', authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/password/forgot', authController.sendMailForgotPassword);
router.put('/password/forgot', authController.setNewPasswordAfterForgot);

module.exports = router;

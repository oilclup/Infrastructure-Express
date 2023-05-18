const { body } = require("express-validator");

exports.createDiscountPaymentDto = [
  body("email").isString(),
  body("password").isString(),
  body("role").isString(),

];
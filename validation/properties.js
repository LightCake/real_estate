const Validator = require("validator");
const validText = require("./valid-text");

const validatePropertyInput = data => {
  const errors = {};

  data.type = validText(data.type) ? data.type : "";
  data.price = validText(data.price) ? data.price : "";
  data.size = validText(data.size) ? data.size : "";
  data.description = validText(data.description) ? data.description : "";
  data.built = validText(data.built) ? data.built : "";

  if (Validator.isEmpty(data.type)) {
    errors.type = "Type field is required";
  }

  if (!Validator.isFloat(data.price, { min: 0 })) {
    errors.price = "Price must be positive float number";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (!Validator.isFloat(data.size, { min: 0 })) {
    errors.size = "Size must be positive float number";
  }

  if (Validator.isEmpty(data.size)) {
    errors.size = "Size field is required";
  }

  if (!Validator.isLength(data.description, { min: 32, max: 500 })) {
    errors.description = "Description must be between 32 and 500 characters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isInt(data.built)) {
    errors.built = "Built must be Integer";
  }

  if (Validator.isEmpty(data.built)) {
    errors.built = "Built field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validatePropertyInput;

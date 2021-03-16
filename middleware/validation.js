const Ajv = require("ajv");

module.exports.validateJson = function(schema) {
  return function(req, res, next) {
    const ajv = new Ajv({allErrors: true, nullable: false});
    const validate = ajv.compile({additionalProperties: false, ...schema});
    const valid = validate(req.fields);

    if (valid) {
      next();
    } else {
      return res.status(400).json({status: "error", message: validate.errors});
    }
  };
};

/* eslint-disable linebreak-style */
const { ImageHeaderSchema } = require('./uploadSchema');
const InvariantError = require('../../exceptions/InvariantError');

const UploadsValidator = {
  validateImageHeader: (header) => {
    const validationResult = ImageHeaderSchema.validate(header);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;

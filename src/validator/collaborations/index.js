/* eslint-disable linebreak-style */
const InvariantError = require('../../exceptions/InvariantError');
const { CollaborationPayloadSchema } = require('./collaborationSchema');

const collaborationsValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = CollaborationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = collaborationsValidator;

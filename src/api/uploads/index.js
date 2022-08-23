/* eslint-disable linebreak-style */
const UploadsHandler = require('./UploadsHandler');
const routes = require('./uploadsRoutes');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { service, validator, albumsService }) => {
    const uploadsHandler = new UploadsHandler(service, validator, albumsService);
    server.route(routes(uploadsHandler));
  },
};

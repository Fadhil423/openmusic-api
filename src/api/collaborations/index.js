/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
const CollaborationsHandler = require('./CollaborationsHandler');
const routes = require('./collaborationsRoutes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { collaborationsService, playlistsService, validator }) => {
    const collaborationsHandler = new CollaborationsHandler(
      collaborationsService, playlistsService, validator,
    );
    server.route(routes(collaborationsHandler));
  },
};

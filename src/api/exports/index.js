/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
const ExportsHandler = require('./ExportsHandler');
const routes = require('./exportsRoutes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { service, validator, playlistsService }) => {
    const exportsHandler = new ExportsHandler(service, validator, playlistsService);
    server.route(routes(exportsHandler));
  },
};

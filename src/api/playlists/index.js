/* eslint-disable linebreak-style */
const PlaylistsHandler = require('./PlaylistsHandler');
const routes = require('./playlistsRoutes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistsHandler = new PlaylistsHandler(service, validator);
    server.route(routes(playlistsHandler));
  },
};

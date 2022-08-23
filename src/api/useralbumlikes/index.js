/* eslint-disable linebreak-style */
const UserAlbumLikesHandler = require('./UserAlbumLikesHandler');
const routes = require('./userAlbumLikesRoutes');

module.exports = {
  name: 'useralbumlikes',
  version: '1.0.0',
  register: async (server, { service, albumsService }) => {
    const userAlbumLikesHandler = new UserAlbumLikesHandler(service, albumsService);
    server.route(routes(userAlbumLikesHandler));
  },
};

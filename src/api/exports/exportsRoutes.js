/* eslint-disable linebreak-style */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.postExportPlaylistSongsByIdHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;

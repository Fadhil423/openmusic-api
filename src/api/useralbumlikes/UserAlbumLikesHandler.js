/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const ClientError = require('../../exceptions/ClientError');

class UserAlbumLikesHandler {
  constructor(service, albumService) {
    this._service = service;
    this._albumService = albumService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    try {
      const { id } = request.params;
      const albumId = id;
      const { id: credentialId } = request.auth.credentials;

      await this._albumService.getAlbumById(albumId);

      const liked = await this._service.checkHasAlreadyLiked(credentialId, albumId);

      // Jika belum di like maka tambahkan like
      if (!liked) {
        const userAlbumLikesId = await this._service.addAlbumLikes(credentialId, albumId);

        const response = h.response({
          status: 'success',
          message: `Album berhasil disukai dengan id : ${userAlbumLikesId}`,
        });
        response.code(201);
        return response;
      }
      await this._service.deleteAlbumLike(credentialId, albumId);

      const response = h.response({
        status: 'success',
        message: 'Unlike album berhasil',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAlbumLikesHandler(request, h) {
    try {
      const { id } = request.params;
      const albumId = id;
      const dataLike = await this._service.getTotalLikes(albumId);
      const likes = dataLike.count;
      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.header('X-Data-Source', dataLike.source);
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UserAlbumLikesHandler;

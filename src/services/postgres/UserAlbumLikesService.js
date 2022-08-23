/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UserAlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumLikes(userId, albumId) {
    const id = `useralbumlikes-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album like gagal ditambahkan');
    }

    // Menghapus cache untuk diupdate nantinya
    await this._cacheService.delete(`albumlikes:${albumId}`);

    return result.rows[0].id;
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album gagal disukai. Id user album like tidak ditemukan');
    }

    // Menghapus cache untuk diupdate nantinya
    await this._cacheService.delete(`albumlikes:${albumId}`);
  }

  async checkHasAlreadyLiked(userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }

  async getTotalLikes(albumId) {
    try {
      // Kondisi jika tidak ada perubahan data pada db
      const result = await this._cacheService.get(`albumlikes:${albumId}`);
      return {
        source: 'cache',
        count: JSON.parse(result),
      };
    } catch (error) {
      // Jika gagal atau kadaluarsa, maka diteruskan dengan get total likes dari db
      const query = {
        text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw new NotFoundError('Tidak terdapat like pada album');
      }

      // Jika ada like, simpan data tersebut di cache redis
      await this._cacheService.set(`albumlikes:${albumId}`, JSON.stringify(result.rowCount));
      return {
        count: result.rows.length,
      };
    }
  }
}

module.exports = UserAlbumLikesService;

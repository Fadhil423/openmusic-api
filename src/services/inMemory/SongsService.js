/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  // eslint-disable-next-line object-curly-newline
  addSong({ title, year, performer, genre, duration, albumId }) {
    const id = nanoid(16);

    const newSong = {
      title, year, performer, genre, duration, albumId,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongsById(id) {
    const song = this._songs.filter((s) => s.id === id)[0];
    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return song;
  }

  // eslint-disable-next-line object-curly-newline
  editSongById(id, { title, year, performer, genre, duration, albumId }) {
    const index = this._songs.findIndex((song) => song.id === id)[0];

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
      id,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id)[0];

    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;

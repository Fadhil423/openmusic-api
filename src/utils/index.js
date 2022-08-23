/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const mapDBToModelAlbums = ({
  id,
  name,
  year,
  cover_url,
}) => ({
  id,
  name,
  year,
  coverUrl: cover_url,
});

const mapDBToModelSongs = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const mapDBToModelUsers = ({
  id,
  username,
  password,
  fullname,
}) => ({
  id,
  username,
  password,
  fullname,
});

const mapDBToModelPlaylists = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

const mapDBToModelPlaylistSongs = ({
  id,
  playlist_id,
  song_id,
}) => ({
  id,
  playlistId: playlist_id,
  songId: song_id,
});

const mapDBToModelPlaylistSongActivities = ({
  username,
  title,
  action,
  time,
}) => ({
  username,
  title,
  action,
  time,
});

module.exports = {
  mapDBToModelAlbums,
  mapDBToModelSongs,
  mapDBToModelUsers,
  mapDBToModelPlaylists,
  mapDBToModelPlaylistSongs,
  mapDBToModelPlaylistSongActivities,
};

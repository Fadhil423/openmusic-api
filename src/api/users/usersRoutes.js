/* eslint-disable linebreak-style */
const usersRoutes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
];

module.exports = usersRoutes;

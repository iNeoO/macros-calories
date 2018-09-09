module.exports = (app) => {
  const user = require('../controllers/userController');
  const isAuthenticated = require('../middleware/loginMiddleware');

  app.route('/users')
    .all(isAuthenticated)
    .get(user.get_users);

  app.route('/user')
    .all(isAuthenticated)
    .post(user.post_user);

  app.route('/user/:userId')
    .all(isAuthenticated)
    .get(user.get_user)
    .patch(user.patch_user)
    .delete(user.delete_user);
};

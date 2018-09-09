module.exports = (app) => {
  const user = require('../controllers/userController');
  const isAuthenticated = require('../middleware/loginMiddleware');

  app.route('/aliments')
    .all(isAuthenticated)
    .get(user.get_users);

  app.route('aliment')
    .all(isAuthenticated)
    .post(user.post_user);

  app.route('/aliment/:alimentId')
    .all(isAuthenticated)
    .get(user.get_user)
    .patch(user.patch_user)
    .delete(user.delete_user);
};

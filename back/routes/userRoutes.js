const user = require('../controllers/userController');
const isAuthenticated = require('../middleware/loginMiddleware');

module.exports = (app) => {

  app.route('/api/user')
    .post(user.post_user);

  app.route('/api/user')
    .all(isAuthenticated)
    .get(user.get_user)
    .patch(user.patch_user)
    .delete(user.delete_user);

  app.route('/api/user/password')
    .all(isAuthenticated)
    .patch(user.patch_password);
};

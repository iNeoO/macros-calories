const token = require('../controllers/tokenController');
const isAuthenticated = require('../middleware/loginMiddleware');

module.exports = (app) => {

  app.route('/api/token')
    .post(token.post_auth);

  app.route('/api/token/:token')
    .get(token.get_token)
    .all(isAuthenticated)
    .delete(token.delete_token);
};

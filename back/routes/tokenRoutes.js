module.exports = (app) => {
  const token = require('../controllers/tokenController');

  app.route('/token')
    .get(token.get_token);

  app.route('/token/:tokenId')
    .get(token.get_token_id)
    .post(token.post_token)
    .delete(token.delete_token);
};

const aliment = require('../controllers/alimentController');
const isAuthenticated = require('../middleware/loginMiddleware');

module.exports = (app) => {

  app.route('/api/aliments')
    .all(isAuthenticated)
    .get(aliment.get_aliments);

  app.route('/api/aliment')
    .all(isAuthenticated)
    .post(aliment.post_aliment);

  app.route('/api/aliment/:alimentId')
    .all(isAuthenticated)
    .get(aliment.get_aliment)
    // .delete(aliment.delete_aliment)
    .patch(aliment.patch_aliment);
};

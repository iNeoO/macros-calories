const macro = require('../controllers/macroController');
const isAuthenticated = require('../middleware/loginMiddleware');

module.exports = (app) => {

  app.route('/api/macros')
    .all(isAuthenticated)
    .get(macro.get_macros);

  app.route('/api/macros/dates')
    .all(isAuthenticated)
    .get(macro.get_macros_dates);

  app.route('/api/macros/stats')
    .all(isAuthenticated)
    .get(macro.get_macros_stats);

  app.route('/api/macro')
    .all(isAuthenticated)
    .post(macro.post_macro);

  app.route('/api/macro/:macroId')
    .all(isAuthenticated)
    .get(macro.get_macro)
    .patch(macro.patch_macro)
    .delete(macro.delete_macro);
};

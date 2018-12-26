const measurement = require('../controllers/measurementController');
const isAuthenticated = require('../middleware/loginMiddleware');

module.exports = (app) => {

  app.route('/api/measurements')
    .all(isAuthenticated)
    .get(measurement.get_measurements);

  app.route('/api/measurement')
    .all(isAuthenticated)
    .post(measurement.post_measurement);

  app.route('/api/measurements/dates')
    .all(isAuthenticated)
    .get(measurement.get_measurements_dates);

  app.route('/api/measurement/nearest')
    .all(isAuthenticated)
    .get(measurement.get_nearest_measurement);

  app.route('/api/measurement/:measurementId')
    .all(isAuthenticated)
    .get(measurement.get_measurement)
    .patch(measurement.patch_measurement)
    .delete(measurement.delete_measurement);
};

const db = require('../database');

class Countries {
  static retrieveAll (callback) {
    db.query('SELECT country from airports', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Countries;
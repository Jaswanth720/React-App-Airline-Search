const db = require('../database');

class Countries {
  static retrieveAll (callback) {
    db.query('SELECT country from airports', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getCountry(selectedCountry) {
    const q = `select name from airports where country = '${selectedCountry}'`;
   db.query(q, (err, res) => {
        if(err){
          return selectedCountry(err);
        } 
        return res.json();
    });
  }

//   static get_codeshare(get_codeshare) {
//     const q = ``
//   }
}

module.exports = Countries;
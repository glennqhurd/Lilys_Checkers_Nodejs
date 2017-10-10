var c_database = require('./checkers_database');

console.log(c_database.get_user_data());

c_database.add_user_data('JJ');

console.log(c_database.get_user_data());

c_database.remove_user_data('Mom');

console.log(c_database.get_user_data());

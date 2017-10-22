var c_database = require('./routes/checkers_database');

console.log(c_database.get_user_data());

c_database.add_user_data('JJ');

console.log(c_database.get_user_data());

c_database.remove_user_data('Mom');

console.log(c_database.get_user_data());

c_database.start_new_game('Glenn', 'Lyman');
c_database.start_new_game('Glenn', 'Lily');
c_database.start_new_game('Glenn', 'Mom');

console.log(c_database.get_current_games());

c_database.update_board(1, 'r:');

console.log(c_database.get_current_games());

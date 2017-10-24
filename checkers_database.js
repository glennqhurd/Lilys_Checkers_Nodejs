const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('checkers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.serialize(function() {

    db.run("CREATE TABLE if not exists game_info (" +
        "game_id INT, " +
        "board_string TEXT, " +
        "user_id1 INT, " +
        "user_id2 INT, " +
        "move_id INT)");

    db.executeSql("SELECT * FROM game_info", [], function(results) {
        var length = results.rows.length;

        if(length === 0) {
            insert_game_row(1, "'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'", 1, 2, 1);
            insert_game_row(2, "'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'", 1, 3, 2);
            insert_game_row(3, "'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'", 2, 3, 3);
        }
        else {
            display_database();
        }
    });
});

function insert_game_row(game_id, board_string, user_id1, user_id2, move_id) {
    db.run("INSERT INTO game_info VALUES (" + game_id + ", " + board_string + ", " + user_id1 + ", " + user_id2 + ", " + move_id + ")");
}

function display_database() {
    db.each("SELECT * FROM game_info", function(err, row) {
        console.log(row.game_id + " " + row.board_string + " " + row.user_id1 + " " + row.user_id2 + " " + row.move_id);
    });
}

function database_is_empty(results) {
    var length = results.rows.length;

    return length === 0;
}

// close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});

let user_data = ['Glenn', 'Lyman', 'Lily', 'Delaney'];
let game_numbers = [];
let current_game_number = 1;
let games_in_progress = {};

exports.get_user_data = function() {
    return user_data;
};

exports.add_user_data = function(new_name) {
    if(!user_data.includes(new_name)) {
        user_data.push(new_name);
    }
};

exports.remove_user_data = function(removed_name) {
    if(user_data.includes(removed_name)) {
        var index = user_data.indexOf(removed_name);
        user_data.splice(index, 1);
    }
    else {
        console.log('Name is not in array');
    }
};

exports.start_new_game = function(player1, player2) {
    if((player1 !== player2) && user_data.includes(player1) && user_data.includes(player2)) {
        game_numbers.push(current_game_number);
        games_in_progress[current_game_number] = [player1, player2, 'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'];
        current_game_number++;
    }
    else {
        console.log('Error');
    }
};

exports.update_board = function(game_number, board_string) {
    if(games_in_progress[game_number]) {
        games_in_progress[game_number][2] = board_string;
    }
    else {
        console.log('Incorrect game number');
    }
};

exports.get_current_games = function() {
    return games_in_progress;
};

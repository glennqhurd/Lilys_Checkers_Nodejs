const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('checkers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

function insert_game_row(game_id, board_string, user_id1, user_id2) {
    db.run("INSERT INTO games VALUES (" + game_id + ", " + board_string + ", " + user_id1 + ", " + user_id2 + ")");
}

function insert_user_row(user_id, username, email, passwd) {
    db.run("INSERT INTO users VALUES (" + user_id + ", '" + username + "', '" + email + "', '" + passwd + "')");
}

function insert_game_list_row(game_list_id, user_id1, user_id2, game_id) {
    db.run("INSERT INTO game_list VALUES (" + game_list_id + ", " + user_id1 + ", " + user_id2 + ", " + game_id + ")");
}

function insert_moves_row(move_id, game_id, date, move_number) {
    db.run("INSERT INTO moves VALUES (" + move_id + ", " + game_id + ", '" + date + "', " + move_number + ")");
}

function display_database() {
    console.log("Games table");
    display_games();
    console.log("Users table");
    display_users();
    console.log("Game list table");
    display_game_list();
    console.log("Moves table");
    display_moves();
}

function display_games() {
    db.each("SELECT * FROM games", function(err, row) {
        console.log(row.game_id + " " + row.board_string + " " + row.user_id1 + " " + row.user_id2);
    });
}

function display_users() {
    db.each("SELECT * FROM users", function(err, row) {
        console.log(row.user_id + " " + row.username + " " + row.email + " " + row.passwd);
    });
}

function display_game_list() {
    db.each("SELECT * FROM game_list", function(err, row) {
        console.log(row.game_list_id + " " + row.user_id1 + " " + row.user_id2 + " " + row.game_id);
    });
}

function display_moves() {
    db.each("SELECT * FROM moves", function(err, row) {
        console.log(row.move_id + " " + row.game_id + " " + row.date + " " + row.move_number);
    });
}

function update_games_board_by_pk(primary_key, new_string) {
    console.log("UPDATE games SET board_string = " + new_string + " WHERE game_id = " + primary_key);
    db.run("UPDATE games SET board_string = " + new_string + " WHERE game_id = " + primary_key);
}

function update_games_users(primary_key, new_user1, new_user2) {
    console.log("UPDATE games SET user_id1 = " + new_user1 + ", user_id2 = " + new_user2 + " WHERE game_id = " + primary_key);
    db.run("UPDATE games SET user_id1 = " + new_user1 + ", user_id2 = " + new_user2 + " WHERE game_id = " + primary_key);
}

function add_new_user(username, email, passwd) {
    var count = db.run("SELECT COUNT(user_id) FROM users");
    insert_user_row(count + 1, username, email, passwd);
}

function add_new_game(user1, user2) {
    var game_count = db.run("SELECT COUNT(game_id) FROM games");
    insert_game_row(game_count + 1, "b:bbbbbbbbbbbb--------rrrrrrrrrrrr", user1, user2);
}

function add_new_move(game_id, move_number) {
    var dt = new Date();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var move_count = db.run("SELECT COUNT(move_id) FROM moves");
    insert_moves_row(move_count + 1, game_id, month + "-" + day + "-" + year, move_number);
}

update_games_board_by_pk(1, "'b:'");
update_games_users(2, 2, 1);
add_new_game("Glenn", "Lily");
add_new_move(1, 2);
display_database();

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



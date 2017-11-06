const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./routes/checkers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.serialize(function() {

    db.run("CREATE TABLE if not exists games (" +
        "game_id INT PRIMARY KEY NOT NULL, " +
        "board_string TEXT NOT NULL, " +
        "user_id1 INT NOT NULL, " +
        "user_id2 INT NOT NULL)");

    db.run("CREATE TABLE if not exists users (" +
        "user_id INT PRIMARY KEY NOT NULL, " +
        "username VARCHAR(20) NOT NULL, " +
        "email VARCHAR(32) NOT NULL, " +
        "passwd VARCHAR(32) NOT NULL)");

    db.run("CREATE TABLE if not exists game_list (" +
        "game_list_id INT PRIMARY KEY NOT NULL, " +
        "user_id1 INT NOT NULL, " +
        "user_id2 INT NOT NULL, " +
        "game_id INT NOT NULL)");

    db.run("CREATE TABLE if not exists moves (" +
        "move_id INT PRIMARY KEY NOT NULL, " +
        "game_id INT NOT NULL, " +
        "date DATETIME NOT NULL, " +
        "move_number VARCHAR(7) NOT NULL)");

    insert_game_row(1, "'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'", 1, 2);
    insert_game_row(2, "'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'", 1, 3);
    insert_game_row(3, "'b:bbbbbbbbbbbb--------rrrrrrrrrrrr'", 2, 3);

    insert_game_list_row(1, 1, 2, 1);
    insert_game_list_row(2, 1, 3, 2);
    insert_game_list_row(3, 2, 3, 3);

    insert_moves_row(1, 1, "2017-10-28 10:30:00", 1);

    insert_user_row(1, "Glenn", "filler", "filler");
    insert_user_row(2, "Lyman", "filler", "filler");

    display_database();
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
    display_games();
    console.log("\n");
    display_users();
    console.log("\n");
    display_game_list();
    console.log("\n");
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

var user_data = ['Glenn', 'Lyman', 'Lily', 'Delaney'];
var game_numbers = [];
var current_game_number = 1;
var games_in_progress = {};

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

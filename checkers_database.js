var user_data = ['Glenn', 'Lyman', 'Lily', 'Delaney'];

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

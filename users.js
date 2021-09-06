let users = [];

const getUsersInChat = () => {
    return users;
};

const addUser = user => {
    users = [...users, user];
};

const removeUser = id => {
    users = users.filter(user => user.id !== id);
};

const getUser = id => users.find(user => user.id === id);

module.exports = { getUsersInChat, addUser, removeUser, getUser };
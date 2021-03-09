const UserStatus = {
  NORMAL: {
    VALUE: "NORMAL",
    NAME: "Normal",
  },
  BANNED: {
    VALUE: "BANNED",
    NAME: "Banned",
  },
};

const UserStatusValues = (() => {
  return Object.keys(UserStatus).map((key) => UserStatus[key].VALUE);
})();

const UserStatusNames = (() => {
  return Object.keys(UserStatus).map((key) => UserStatus[key].NAME);
})();

module.exports = {
  UserStatus,
  UserStatusValues,
  UserStatusNames,
};

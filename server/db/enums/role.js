const Role = {
  NORMAL: {
    VALUE: "NORMAL",
    NAME: "Normal",
  },
  ADMIN: {
    VALUE: "ADMIN",
    NAME: "Administrator",
  },
  SUPER_ADMIN: {
    VALUE: "SUPER_ADMIN",
    NAME: "Super Administrator",
  },
};

const RoleValues = (() => {
  return Object.keys(Role).map((key) => Role[key].VALUE);
})();

const RoleNames = (() => {
  return Object.keys(Role).map((key) => Role[key].NAME);
})();

module.exports = {
  Role,
  RoleValues,
  RoleNames,
};

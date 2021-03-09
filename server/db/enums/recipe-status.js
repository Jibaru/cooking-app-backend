const RecipeStatus = {
  APPROVED: {
    VALUE: "APPROVED",
    NAME: "Approved",
  },
  PENDING: {
    VALUE: "PENDING",
    NAME: "Pending",
  },
  DENIED: {
    VALUE: "DENIED",
    NAME: "Denied",
  },
};

const RecipeStatusValues = (() => {
  return Object.keys(RecipeStatus).map((key) => RecipeStatus[key].VALUE);
})();

const RecipeStatusNames = (() => {
  return Object.keys(RecipeStatus).map((key) => RecipeStatus[key].NAME);
})();

module.exports = {
  RecipeStatus,
  RecipeStatusValues,
  RecipeStatusNames,
};

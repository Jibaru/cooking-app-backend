const IngredientStatus = {
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

const IngredientStatusValues = (() => {
  return Object.keys(IngredientStatus).map(
    (key) => IngredientStatus[key].VALUE
  );
})();

const IngredientStatusNames = (() => {
  return Object.keys(IngredientStatus).map((key) => IngredientStatus[key].NAME);
})();

module.exports = {
  IngredientStatus,
  IngredientStatusValues,
  IngredientStatusNames,
};

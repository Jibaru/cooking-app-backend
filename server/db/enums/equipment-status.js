const EquipmentStatus = {
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

const EquipmentStatusValues = (() => {
  return Object.keys(EquipmentStatus).map((key) => EquipmentStatus[key].VALUE);
})();

const EquipmentStatusNames = (() => {
  return Object.keys(EquipmentStatus).map((key) => EquipmentStatus[key].NAME);
})();

module.exports = {
  EquipmentStatus,
  EquipmentStatusValues,
  EquipmentStatusNames,
};

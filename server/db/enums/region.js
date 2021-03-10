const Region = {
  NORTH_AMERICA: {
    VALUE: "NORTH_AMERICA",
    NAME: "Norteamérica",
  },
  CENTRAL_AMERICA: {
    VALUE: "CENTRAL_AMERICA",
    NAME: "Centroamérica",
  },
  SOUTH_AMERICA: {
    VALUE: "SOUTH_AMERICA",
    NAME: "Sudámerica",
  },
  EUROPE: {
    VALUE: "EUROPE",
    NAME: "Europa",
  },
  ASIA: {
    VALUE: "ASIA",
    NAME: "Asia",
  },
  OCEANIA: {
    VALUE: "OCEANIA",
    NAME: "Oceanía",
  },
  AFRICA: {
    VALUE: "AFRICA",
    NAME: "África",
  },
  SOUTHEASTH_ASIAN: {
    VALUE: "SOUTHEASTH_ASIAN",
    NAME: "Sudeste Asiático",
  },
  OTHER: {
    VALUE: "OTHER",
    NAME: "Otro",
  },
};

const RegionValues = (() => {
  return Object.keys(Region).map((key) => Region[key].VALUE);
})();

const RegionNames = (() => {
  return Object.keys(Region).map((key) => Region[key].NAME);
})();

module.exports = {
  Region,
  RegionValues,
  RegionNames,
};

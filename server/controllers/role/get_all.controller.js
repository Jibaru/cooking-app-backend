const { success } = require("../../utils/http_status_codes");
const { Role } = require("../../db/enums/role");

const getAllController = (req, res) => {
  return res.status(success.ok).json({
    ok: true,
    roles: Object.keys(Role).map((key) => Role[key]),
  });
};

module.exports = getAllController;

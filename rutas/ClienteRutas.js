const router = require('express').Router();
const ClienteOperaciones = require("../operaciones/ClienteOperaciones")

router.get("/", ClienteOperaciones.consultarClientes);
router.get("/:id", ClienteOperaciones.consultarCliente);
router.post("/", ClienteOperaciones.crearCliente);
router.put("/:id",ClienteOperaciones.modificarCliente);
router.delete("/:id",ClienteOperaciones.borrarClientes);
module.exports = router;
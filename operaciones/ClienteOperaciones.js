const ClienteModelo = require("../modelos/ClienteModelo");
const ClienteOperaciones = {};

ClienteOperaciones.crearCliente = async (request, response) => {
    try {
        const objeto = request.body;
        const cliente = new ClienteModelo(objeto);
        const clienteGuardado = await cliente.save();
        if (clienteGuardado != null) {
            response.status(201).send(clienteGuardado);
        }
    } catch (error) {
        response.status(400).json(error);
    }

}

ClienteOperaciones.consultarClientes = async (request, response) => {
    try {
        const query = request.query;
        let listaclientes;
        if (query.q == null) {
            listaclientes = await ClienteModelo.find(query);
        }
        else {
            listaclientes = await ClienteModelo.find({
                "$or": [
                    { "nombres": { $regex: query.q, $options: "i" } },
                    { "apellidos": { $regex: query.q, $options: "i" } },
                    { "documento": { $regex: query.q, $options: "i" } },
                    { "direccion": { $regex: query.q, $options: "i" }},
                    { "correo": { $regex: query.q, $options: "i" } }
                ]
            });
        }
        response.status(200).send(listaclientes);
    } catch (error) {
        response.status(400).json(error);
    }
}

ClienteOperaciones.consultarCliente = async (request, response) => {
    try {
        const id = request.params.id;
        const cliente = await ClienteModelo.findById(id);
        if (cliente != null) {
            response.status(200).send(cliente);
        }
        else {
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).json(error);
    }
}

ClienteOperaciones.modificarCliente = async (request, response) => {
    try {
        const id = request.params.id;
        const body = request.body;
        const datosModificados = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            direccion: body.direccion,
            telefono: body.telefono,
            contrasena: body.contrasena,
        }
        const cliente = await ClienteModelo.findByIdAndUpdate(id, datosModificados, {new:true})
        if (cliente != null) {
            response.status(200).send(cliente);
        }
        else {
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).json(error);
    }
}
ClienteOperaciones.borrarClientes = async (request, response) => {
    try {
        const id = request.params.id;
        const cliente = await ClienteModelo.findByIdAndDelete(id);
        if (cliente != null) {
            response.status(200).send(cliente);
        }
        else {
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).json(error);
    }
}
module.exports = ClienteOperaciones;
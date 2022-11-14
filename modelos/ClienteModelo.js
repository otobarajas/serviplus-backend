const mongoose = require("mongoose");
const clienteSchema = new mongoose.Schema({
    nombres: { type:String, maxLenght:50, required:true, unique:false },
    apellidos: { type:String, maxLenght:50, required:true, unique:false },
    documento: { type:String, required:true, unique:true },
    direccion: { type:String, maxLenght:80, required:true, unique:false },
    telefono: { type:Number, required:true, unique:false },
    correo: { type:String, maxLenght:80, required:true, unique:true },
    contrasena: { type:String, required:true, unique:false }
});

module.exports = mongoose.model("clientes", clienteSchema);
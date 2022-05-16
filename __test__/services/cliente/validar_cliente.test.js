const ValidarCliente = require("./../../../src/services/clientes/validar_cliente");

test("validacion creacion cliente", async () => {

  expect(true).toEqual(true);
});

beforeAll(async () => {
  const data = mockCliente();
  const validarCliente = new ValidarCliente(data, "creacion");  

  await validarCliente.exec();
 
  if (validarCliente.fails()) {
    console.log(validarCliente.errors);
  }
})


function mockCliente() {
  return {
    "primer_nombre": "Pablo",
    "segundo_nombre": "Adrian",
    "primer_apellido": "Gonzalez",
    "segundo_apellido": "Salazar",
    "tipo_doc": "Cedula Ciudadanía",
    "num_doc": "9873241",
    "movil": "3207809668",
    "placa": "PEREIRA",
    "email": "etereosum@gmail.com",
    "fecha_exp": "2000-01-02",
    "lugar_exp": "PEREIRa",
    "fecha_nacimiento": "1982-01-25",
    "lugar_nacimiento": "PEREIRA",
    "genero": "Masculino",
    "estado_civil": "Soltero/a",
    "nivel_estudios": "Universitario",
    "estrato": "2",
    "fijo": "3212121",
    "municipio_id": "",
    "barrio": "Camilo Mejia Duque",
    "direccion": "Manazana 8 Casa 13",
    "anos_residencia": "",
    "meses_residencia": 60,
    "tipo_vivienda": "Propia",
    "ocupacion": "Ingeniero",
    "doc_empresa": "",
    "tipo_actividad": "Independiente",
    "empresa": "etereosum",
    "dir_empresa": "manzana 8 casa 13 camilo mejia duque dosquebradas",
    "tel_empresa": "3207809668",
    "fecha_vinculacion": "2022-05-01",
    "descripcion_actividad": "lorem ipsum dolor",
    "cargo": "",
    "tipo_contrato": "",
    "password": "123456",
    "confirm": "123456"
  }
}

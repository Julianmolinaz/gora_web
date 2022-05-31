class Cliente {
  constructor(payload) {
    this.id = payload.id || "";

    // Información inicial
    this.primer_nombre = payload.primer_nombre || "";
    this.segundo_nombre = payload.segundo_nombre || "";
    this.primer_apellido = payload.primer_apellido || "";
    this.segundo_apellido = payload.segundo_apellido || "";
    this.tipo_doc = payload.tipo_doc || "";
    this.num_doc = payload.num_doc || "";
    this.movil = payload.movil || "";
    this.placa = payload.placa || "";
    this.email = payload.email || "";

    // Información personal:w
    this.fecha_exp = payload.fecha_exp || "";
    this.lugar_exp = payload.lugar_exp || "";
    this.fecha_nacimiento = payload.fecha_nacimiento|| "";
    this.lugar_nacimiento = payload.lugar_nacimiento || "";
    this.genero = payload.genero || "";
    this.estado_civil = payload.estodo_civil || "";
    this.nivel_estudios = payload.nivel_estudios || "";

    // Información de ubicación
    this.estrato = payload.estrato || "";
    this.fijo = payload.fijo || "";
    this.municipio_id = payload.municipio_id || "";
    this.barrio = payload.barrio || "";
    this.direccion = payload.direccion || "";
    this.anos_residencia = payload.anos_residencia || "";
    this.meses_residencia = payload.meses_residencia || "";
    this.tipo_vivienda = payload.tipo_vivienda || "";

    // Informacion de laboral
    this.ocupacion = payload.ocupacion || "";
    this.doc_empresa = payload.doc_empresa || "";
    this.tipo_actividad = payload.tipo_actividad || "";
    this.empresa = payload.empresa || "";
    this.dir_empresa = payload.dir_empresa || "";
    this.tel_empresa = payload.tel_empresa || "";
    this.fecha_vinculacion = payload.fecha_vinculacion || "";
    this.descripcion_actividad = payload.descripcion_actividad || "";

    this.cargo = payload.cargo || "";
    this.tipo_contrato = payload.tipo_contrato || null;

    // Contraseñas
    this.password = payload.password || "";
    this.confirm = payload.confirm || "";
  }
}

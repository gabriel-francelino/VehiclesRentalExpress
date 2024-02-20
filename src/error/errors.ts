class AlreadyRegistered extends Error {
  constructor(message = "Cadastrado em duplicidade") {
    super(message);
    this.name = "AlreadyRegistered";
  }
}

class NotFound extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFound";
  }
}

class DataInvalid extends Error {
  constructor(message = "Dado inválido") {
    super(message);
    this.name = "DataInvalid";
  }
}

class BadRequest extends Error {
  constructor(message = "Solicitação inválida") {
    super(message);
    this.name = "BadRequest";
  }
}

class InternalServer extends Error {
  constructor(message = "Erro no servidor") {
    super(message);
    this.name = "InternalServer";
  }
}

class DifferenceBetweenDate extends Error {
  constructor(message = "Diferença entre datas deve ser maior que 0(zero)") {
    super(message);
    this.name = "DifferenceBetweenDate";
  }
}

export {
  AlreadyRegistered,
  NotFound,
  DataInvalid,
  BadRequest,
  InternalServer,
  DifferenceBetweenDate,
};

class Utilizacao {
    constructor(id, motoristaId, automovelId, motivo, dataInicio, dataFim = null) {
      this.id = id;
      this.motoristaId = motoristaId;
      this.automovelId = automovelId;
      this.motivo = motivo;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
    }
  }
  
  module.exports = Utilizacao;
  
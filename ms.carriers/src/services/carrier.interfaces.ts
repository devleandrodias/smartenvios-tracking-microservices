export interface ITrackingRequest {
  trackingCode: string;
}

export interface ITrackingResponse {
  PedidoCliente: string;
  ValorFrete: number;
  idItemParceiro: number;
  Cliente: string;
  Destinatario: string;
  codigoRastreio: string;
  Url: string;
  UrlProtocolo: string;
  Eventos: {
    Data: string;
    Status: string;
    idStatus: number;
    Descricao: string;
  }[];
}

export enum ESmartEnviosStatus {
  ENTREGA = "ENTREGA REALIZADA",
  EM_ROTA_ENTREGA = "EM ROTA DE ENTREGA",
  RECEBIDO_NA_BASE = "RECEBIDO NA BASE",
  EM_TRANSFERENCIA_PARA_A_BASE = "EM TRANSFERÊNCIA PARA A BASE",
  EM_TRANSFERENCIA_PARA_O_HUB = "EM TRANSFERÊNCIA PARA O HUB",
  COLETADO = "COLETADO",
}

export type ITrackingEvent = {
  description: string;
  status: ESmartEnviosStatus;
};

export type UpdateTrackingMessage = {
  shippingCompany: string;
  trackingCode: string;
  events: ITrackingEvent[];
};

export type HandleTrackingEvent = {
  shippingCompany: string;
  trackingCode: string;
};

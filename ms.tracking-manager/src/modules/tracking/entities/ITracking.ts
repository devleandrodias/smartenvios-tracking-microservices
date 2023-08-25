export enum ESmartEnviosStatus {
  ENTREGA = "ENTREGA REALIZADA",
  EM_ROTA_ENTREGA = "EM ROTA DE ENTREGA",
  RECEBIDO_NA_BASE = "RECEBIDO NA BASE",
  EM_TRANSFERENCIA_PARA_A_BASE = "EM TRANSFERÊNCIA PARA A BASE",
  EM_TRANSFERENCIA_PARA_O_HUB = "EM TRANSFERÊNCIA PARA O HUB",
  COLETADO = "COLETADO",
}

export type ITrackingEvent = {
  status: ESmartEnviosStatus;
  observation: string;
};

export interface ITracking {
  id: string;
  orderId: string;
  shippingCompany: string;
  trackingCode: string;
  events: ITrackingEvent[];
}

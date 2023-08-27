// orders

// Recebo evento que uma etiqueta foi gerada e crio um rastreio no tracking manager (ticket-created)

// Tópico: ticket-created

// {
//     "orderId": "000",
//     "shippingCompany": "Carriers",
//     "trackingCode": "SM54545"
// }

// Tracking manager envia um envento pedido para buscar atualização em um código de rastreio com os eventos já cadastrados (tracking-update)

// Tópico: tracking-update

// {
//     "action": "UPDATE_EVENT",
//     "shippingCompany": "Carriers",
//     "trackingCode": "SM54545",
//     "events": []
// }

// O microserviço de cada transportadora pega a mensagem que é referente a sua transportadora,
// bate na API da transportadora verifica se existe alguma novo evento comparando
// com os eventos já existentes, se sim, publica uma nova mensagem que foi adicionado mais um evento de rastreio no pedido

// Tópico: tracking-event

// {
//     "action": "NEW_EVENT",
//     "shippingCompany": "Carriers",
//     "trackingCode": "SM54545",
//     "events": [
//         {
//             "description": "Coletado no CD",
//             "status": "COLETADO"
//         }
//     ]
// }

// tracking manager fica ouvindo o tópico de pedidos que foram atualizados e realiza update no banco de dados com novo status do rastreio

export enum ETrackingStatus {
  COLETADO = "COLETADO",
}

export type TicketCreatedSchema = {
  orderId: string;
  trackingCode: string;
  shippingCompany: string;
};

export type TrackingEvent = {
  description: string;
  status: ETrackingStatus;
};

export type TrackingUpdateSchema = {
  trackingCode: string;
  shippingCompany: string;
  events: TrackingEvent[];
};

export type TrackingNewEventSchema = {
  trackingCode: string;
  shippingCompany: string;
  events: TrackingEvent[];
};

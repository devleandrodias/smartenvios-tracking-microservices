export type TicketSchema = {
  orderId: string;
  trackingCode: string;
  shippingCompany: string;
};

export const ticketSchema = `
{
  "type": "record",
  "name": "TicketSchema",
  "namespace": "ticket",
  "fields": [
    { "name": "orderId", "type": "string" },
    { "name": "trackingCode", "type": "string" },
    { "name": "shippingCompany", "type": "string" }
  ]
}`;

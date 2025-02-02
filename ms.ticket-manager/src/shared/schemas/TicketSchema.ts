export type TicketSchema = {
  orderId: string;
  carrier: string;
  trackingCode: string;
};

export const ticketSchema = `
{
  "type": "record",
  "name": "TicketSchema",
  "namespace": "ticket",
  "fields": [
    { "name": "orderId", "type": "string" },
    { "name": "carrier", "type": "string" },
    { "name": "trackingCode", "type": "string" }
  ]
}`;

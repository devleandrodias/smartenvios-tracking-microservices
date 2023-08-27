import { Request, Response } from "express";
import { GenerateTicketUseCase } from "./generateTicket.useCase";

// ! Rota utilizada apenas para publicar mensagem que uma etiqueta foi gerada

export class GenerateTicketController {
  async handle(req: Request, res: Response): Promise<Response> {
    await new GenerateTicketUseCase().execute({
      orderId: req.body.orderId,
      trackingCode: req.body.trackingCode,
      shippingCompany: req.body.shippingCompany,
    });

    return res.status(200).send();
  }
}

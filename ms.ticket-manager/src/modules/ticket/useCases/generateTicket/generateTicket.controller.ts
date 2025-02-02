import { container } from "tsyringe";
import { Request, Response } from "express";

import { GenerateTicketUseCase } from "./generateTicket.useCase";

export class GenerateTicketController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      await container.resolve(GenerateTicketUseCase).execute({
        orderId: req.body.orderId,
        carrier: req.body.carrier,
        trackingCode: req.body.trackingCode,
      });

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(400).send("Não foi possível gerar etiqueta");
    }
  }
}

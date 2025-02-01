import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { GetTrackingByCodeUseCase } from "./getTrackingByCode.useCase";

@injectable()
export class GetTrackingByCodeController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const useCase = container.resolve(GetTrackingByCodeUseCase);

      const tracking = await useCase.execute({
        trackingCode: req.params.trackingCode,
      });

      res.status(200).json(tracking);
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'Rastramento não encontrado' });
    }
  }
}

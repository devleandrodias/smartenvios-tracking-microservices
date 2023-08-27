import { Request, Response } from "express";
import { GetTrackingByCodeUseCase } from "./getTrackingByCode.useCase";

export class GetTrackingByCodeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const result = await new GetTrackingByCodeUseCase().execute({
      trackingCode: req.params.trackingCode,
    });

    return res.json(result);
  }
}

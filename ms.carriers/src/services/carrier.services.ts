import { carrierApi } from "../api/api";
import { envs } from "../config/env.config";
import { ITrackingRequest, ITrackingResponse } from "./carrier.interfaces";

export class CarrierServices {
  async getTrackingByTrackingCode(
    request: ITrackingRequest
  ): Promise<ITrackingResponse> {
    const { trackingCode } = request;

    try {
      const response = await carrierApi.get<ITrackingResponse>(
        `/client/Carriers/Tracking/${trackingCode}`,
        { headers: { Authorization: `Bearer ${envs.carrierToken}` } }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Ocorreu um erro ao tentar obter rastreio para ${trackingCode}`
      );
    }
  }
}

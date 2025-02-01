import { carrierApi } from "../api/api";
import { envs } from "../config/env.config";
import { ITrackingRequest, ITrackingResponse } from "./carrier.interfaces";

export class CarrierServices {
  async getTrackingByTrackingCode(
    request: ITrackingRequest
  ): Promise<ITrackingResponse> {
    const { trackingCode } = request;

    try {
      const url = `/client/Carriers/Tracking/${trackingCode}`
      const headers = { headers: { Authorization: `Bearer ${envs.carrierToken}` } }
      const response = await carrierApi.get<ITrackingResponse>(url, headers);
      return response.data;
    } catch (error) {
      const message = `Ocorreu um erro ao tentar obter rastreio para ${trackingCode}`
      throw new Error(message);
    }
  }
}

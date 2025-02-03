import { CarrierServices } from "../../../src/services/carrier.services";
import { EShippingCompany } from "../../../src/shared/enuns/EShippingCompany";
import { UpdateTrackingEventProducer } from "../../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.producer";
import { UpdateTrackingEventUseCase } from "../../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

describe("Update Tracking Event", () => {
  let updateTrackingEventUseCase: UpdateTrackingEventUseCase;
  let getTrackingByTrackingCodeSpy: jest.SpyInstance;
  let updateTrackingEventProduceSpy: jest.SpyInstance;

  beforeAll(() => {
    updateTrackingEventUseCase = new UpdateTrackingEventUseCase();
    getTrackingByTrackingCodeSpy = jest.spyOn(
      CarrierServices.prototype,
      "getTrackingByTrackingCode"
    );
    updateTrackingEventProduceSpy = jest.spyOn(
      UpdateTrackingEventProducer.prototype,
      "produce"
    );
  });

  it("should update tracking event with carriers events", async () => {
    updateTrackingEventProduceSpy.mockResolvedValue(null);
    getTrackingByTrackingCodeSpy.mockResolvedValue({
      PedidoCliente: "SM82886187440BM",
      ValorFrete: 8.36,
      idItemParceiro: 30394626,
      Cliente: "SMART ENVIOS - MATRIZ",
      Destinatario: "CLOVIS WASHINGTON SILVA DE ALMEI",
      codigoRastreio: "588-SM82886187440BM-04537082",
      Url: "https://www.carriers.com.br/portal/localizador.php?l=588-SM82886187440BM-04537082",
      UrlProtocolo:
        "https://carriers.com.br/portaris/prot_entrega//2021/09/30/1014092/4000257119711.jpg",
      Eventos: [
        {
          Data: "30-09-2021 11:16:59",
          Status: "ENTREGA REALIZADA",
          idStatus: 101,
          Descricao: "Entregue",
        },
        {
          Data: "30-09-2021 08:04:49",
          Status: "EM ROTA DE ENTREGA",
          idStatus: 100,
          Descricao: "Em rota de entrega",
        },
        {
          Data: "30-09-2021 07:03:17",
          Status: "RECEBIDO NA BASE",
          idStatus: 51,
          Descricao: "Na filial distribuidora",
        },
        {
          Data: "30-09-2021 04:19:59",
          Status: "EM TRANSFERÊNCIA PARA A BASE",
          idStatus: 50,
          Descricao: "Em transferência para filial Distribuidora",
        },
        {
          Data: "29-09-2021 12:03:38",
          Status: "EM TRANSFERÊNCIA PARA O HUB",
          idStatus: 52,
          Descricao: "Em transferência para filial Distribuidora",
        },
        {
          Data: "29-09-2021 11:46:19",
          Status: "COLETADO",
          idStatus: 22,
          Descricao: "Recebido no CD da transportadora",
        },
      ],
    });

    await updateTrackingEventUseCase.execute({
      events: [],
      orderId: "9673e0bf-207f-41ee-bd2e-50412c3a3686",
      carrier: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
    });

    expect(updateTrackingEventProduceSpy).toHaveBeenCalledWith({
      events: [
        {
          location: "São Paulo",
          status: "ENTREGA REALIZADA",
          timestamp: "2021-09-30T11:16:59",
        },
        {
          location: "São Paulo",
          status: "EM ROTA DE ENTREGA",
          timestamp: "2021-09-30T08:04:49",
        },
        {
          location: "São Paulo",
          status: "RECEBIDO NA BASE",
          timestamp: "2021-09-30T07:03:17",
        },
        {
          location: "São Paulo",
          status: "EM TRANSFERÊNCIA PARA A BASE",
          timestamp: "2021-09-30T04:19:59",
        },
        {
          location: "São Paulo",
          status: "EM TRANSFERÊNCIA PARA O HUB",
          timestamp: "2021-09-29T12:03:38",
        },
        {
          location: "São Paulo",
          status: "COLETADO",
          timestamp: "2021-09-29T11:46:19",
        },
      ],
      carrier: "Carriers",
      trackingCode: "SM82886187440BM",
      orderId: "9673e0bf-207f-41ee-bd2e-50412c3a3686",
    });
  });
});

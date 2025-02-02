import http from "k6/http";

import { sleep, check } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  let responses = http.batch([
    [
      "GET",
      "http://localhost:3000/api/consulta",
      null,
      { tags: { name: "Consulta" } },
    ],
    [
      "POST",
      "http://localhost:3000/api/pedidos",
      JSON.stringify({ produto: "123", quantidade: 2 }),
      {
        headers: { "Content-Type": "application/json" },
        tags: { name: "CriarPedido" },
      },
    ],
    [
      "PUT",
      "http://localhost:3000/api/rastreio/123",
      JSON.stringify({ status: "entregue" }),
      {
        headers: { "Content-Type": "application/json" },
        tags: { name: "AtualizarRastreio" },
      },
    ],
  ]);

  check(responses[0], { "Consulta retorna 200": (r) => r.status === 200 });
  check(responses[1], { "Criar pedido retorna 201": (r) => r.status === 201 });
  check(responses[2], {
    "Atualizar rastreio retorna 200": (r) => r.status === 200,
  });

  sleep(1);
}

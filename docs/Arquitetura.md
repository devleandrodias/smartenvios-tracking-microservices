# Arquitetura da Solução

A seguir, apresenta-se o fluxo de comunicação e as responsabilidades dos microserviços envolvidos no gerenciamento de rastreamento:

1. **Geração de Etiqueta e Publicação no Tópico `TICKET_CREATED`**  
   Assim que uma nova etiqueta é gerada, uma mensagem é publicada no tópico `TICKET_CREATED`, sinalizando o início do processo.

2. **Criação do Registro de Rastreamento (`ms.tracking-manager`)**  
   O microserviço `ms.tracking-manager` consome mensagens do tópico `TICKET_CREATED`. Para cada nova mensagem, ele cria um registro no banco de dados, iniciando o gerenciamento dos eventos de rastreamento para o pedido e preparando a consulta às APIs das transportadoras.

3. **Agendamento de Atualizações de Rastreamento (`ms.tracking-manager`)**  
   A cada minuto, o `ms.tracking-manager` executa uma rotina que identifica os pedidos que ainda necessitam de atualização (ou seja, aqueles cujo status é diferente de `ENTREGUE` ou `CANCELADO`). Para cada pedido identificado, o serviço publica uma mensagem no tópico `TRACKING_UPDATE`, solicitando que as informações de rastreamento sejam atualizadas.

4. **Consulta e Coleta de Eventos de Rastreamento (`ms.carrier`)**  
   O microserviço `ms.carrier` consome as mensagens do tópico `TRACKING_UPDATE`. Ao receber uma mensagem, ele acessa a API da transportadora correspondente, busca as informações atualizadas de rastreamento e registra os novos eventos. Em seguida, publica esses eventos no tópico `TRACKING_EVENT`.

5. **Atualização da Base de Dados e Disponibilização das Informações (`ms.tracking-manager`)**  
   Por fim, o `ms.tracking-manager` monitora o tópico `TRACKING_EVENT` para capturar as atualizações enviadas pelo `ms.carrier`. Com essas informações, o serviço atualiza o banco de dados, garantindo que o rastreamento esteja sempre atualizado e centralizado para a visualização pelo usuário final.

---

Essa arquitetura promove uma integração eficiente entre os microserviços e assegura um fluxo contínuo e escalável para o gerenciamento dos rastreamentos, independentemente da transportadora utilizada.

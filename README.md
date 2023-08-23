# Smart Tracking

## ms.carriers

Serviço responsável por realizar as converções e buscas do eventos de rastreio utilizando api da transportadora carrier

## ms.tracking-manager

## ms.tracking-view

Aplicação web desenvolvida em react que o usuário da SmartEnvios irá utilizar para acompanhar o rastreio dos seus pedidos, tirando a necessidade de ir manualmente no site de rastreio de cada transportadora, mantendo assim uma identidade e unico lugar de acesso

## Arquitetura distribuída

## Funcionamento do projeto

Cada transportadora terá seu proprio microserviço que será responsável por realizar consultas as API e retornar eventos de frete para o tópico

- O tracking manager consome evento que um pedido foi criado
- Ele cria um registro no banco de dados que usará para gerenciar se aquel pedido deve continuar sendo atualizado rastreio ou não
- De 5 em 5 minutos ele busca no banco os pedidos que estão com Status que seje diferente de Entregue ou Cancelado (Pois esses ainda estão em trânsito e precisam do rastreio atualizado até que pedido seja entregue)
- Ele publica uma mensagem no tópico do kafka utilizando key com documento da transportadora que está realizado o tracking pois cada microserviço será um consumer para poder atualizar o tracking
- Cada serviço vai receber uma mensagem do kafka se precisa buscar atualizações naquele rastreio ou não
- Sempre que tracking for realizado o serviços de cada transportadora publica uma mensagem no tópico que será consumida pelo tracking-manager que fara uma atualização no evento de rastreio e noificará o cliente que o rastreio dele foi atualizado com sucesso

Pedido poderá ser visualizado através de um painel que será fornecido como tela de tracking e cliente será notificado via e-mail evitando assim o trabalho manual de atualização de frete, uma resposta mais rápida para os eventos de rastreio, e forma simples do cliente da SmartEnvios poder acompanhar seus pedidos apenas em uma unica tela mesmo pedidos de diferentes transportadoras sem necessidade de entrar de individualemente em cada uma delas

## Observabilidade e monitoramento

## Tecnologias utilizadas

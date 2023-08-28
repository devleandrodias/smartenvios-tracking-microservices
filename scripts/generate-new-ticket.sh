curl -X POST http://localhost:4000/generate-ticket \
    -H "Content-Type: application/json" \
    -d '{
        "orderId": "77dad97b-d504-48c1-b296-c6af31e25477",
        "shippingCompany": "Carriers",
        "trackingCode": "SM82886187440BM"
    }'

curl -X POST http://localhost:4000/generate-ticket \
    -H "Content-Type: application/json" \
    -d '{
        "orderId": "47dad97b-d504-48c1-b278-c6af31e25420",
        "shippingCompany": "Loggi",
        "trackingCode": "SM82886187879LG"
    }'
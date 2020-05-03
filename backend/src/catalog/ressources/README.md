These files are available at

- iso-3166-1.json https://datahub.io/core/country-list


## How to load them?

```
cat iso-639-1.json | jq '{ "Catalogs": [ .[] | {"PutRequest":{"Item":{"CatalogName":{"S":"Language"},"Key":{"S":"\(.alpha2)"},"Value":{"S":"\(.English)"}}}} ] }' > items.json

cat iso-3166-1.json | jq '{ "Catalogs": [ .[] | {"PutRequest":{"Item":{"CatalogName":{"S":"Country"},"Key":{"S":"\(.Code)"},"Value":{"S":"\(.Name)"}}}} ] }' > items.json

aws dynamodb batch-write-item --request-items file://items.json
```

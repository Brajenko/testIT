curl http://127.0.0.1:8000/api/schema/json/ > apischema.json
npx openapicmd typegen ./apischema.json > src/types/openapi.d.ts
npm run lint
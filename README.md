# 

## DB Migration

Needs to have a model in schema.prisma

```
npm run migrate:dev
```

1. Genearate schema
```bash
npx @better-auth/cli generate
```

1. Apply migration
```bash
pnpm migrate:dev
```

```bash
npx @better-auth/cli generate # returns error
npm run migrate:dev #returns error
npx prisma migrate dev #returns error
npm run generate #returns error
npm run migrate:new #returns error
```
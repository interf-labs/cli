# integration — External System Access

Vendor needs to connect to or exchange data with an enterprise system. Match when vendor says "access to your [system]", "connect to your [platform]", "integration with your [tool]".

## Types

| Canonical | One-liner | Detail |
|---|---|---|
| `integration.crm.api` | Read/write access to enterprise CRM | [crm.md](./crm.md) |
| `integration.crm.bulk-export` | Bulk data export from CRM | [crm.md](./crm.md) |
| `integration.erp.api` | ERP system access (orders, inventory, financials) | [erp.md](./erp.md) |
| `integration.hris.api` | HR information system access | [erp.md](./erp.md) |
| `integration.email.api` | Email platform access (send/read) | [messaging.md](./messaging.md) |
| `integration.messaging.api` | Chat platform access (Slack, Teams) | [messaging.md](./messaging.md) |
| `integration.ticketing.api` | Ticketing system access (Jira, ServiceNow) | [ticketing.md](./ticketing.md) |
| `integration.analytics.api` | Analytics/data warehouse access | [analytics.md](./analytics.md) |
| `integration.webhook.inbound` | Enterprise exposes endpoint for vendor to call | [webhook.md](./webhook.md) |
| `integration.webhook.outbound` | Enterprise sends events to vendor endpoint | [webhook.md](./webhook.md) |

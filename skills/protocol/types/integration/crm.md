# integration.crm — CRM System Access

## integration.crm.api

**Matches:** "access to your CRM", "read/write contacts", "opportunity data", "customer records from your CRM", "Salesforce/HubSpot/Dynamics access"

Vendor needs API-level access to the enterprise CRM to read or write customer data. One of the most common dependencies — almost any customer-facing automation needs CRM access.

**Common enterprise systems:** Salesforce, HubSpot, Microsoft Dynamics 365, Zoho CRM, Pipedrive, Oracle CX

**Typical ready criteria:** "We can create a contact and read an opportunity via API from our staging environment"

## integration.crm.bulk-export

**Matches:** "CRM data export", "bulk extract of contacts", "historical CRM records", "migrate data from your CRM"

Vendor needs a one-time or periodic bulk export of CRM data, typically for training models or backfilling their system. Different from `integration.crm.api` because it's about batch data transfer, not ongoing API access.

**Typical ready criteria:** "We receive a data export of 12+ months of contact and opportunity records in CSV or via bulk API"

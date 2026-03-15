# Example Contracts

## CRM Automation Agent

An agent that automates CRM data entry and follow-up scheduling.

```yaml
name: acme-crm-automation
version: 0.2.0
description: Automates CRM data entry and follow-up scheduling

requirements:
  - what: Read/write access to your CRM (contacts and opportunities)
    ready: We can create a contact and read an opportunity via API from our staging environment
    canonical: integration.crm.api

  - what: SSO endpoint for our service to authenticate your users
    ready: A test user can log into our app via your SSO and see their CRM data
    canonical: auth.sso.saml

  - what: 12 months of contact interaction history for training automation rules
    ready: We receive a data export or API access returning 12+ months of records
    canonical: data.historical-export

  - what: Someone from your data team to map your custom fields to our schema (~4 hours)
    ready: Field mapping document completed and signed off by both sides
    canonical: stakeholder.data-team

  - what: Test environment with sample CRM data for validation
    ready: We can run our full test suite against the environment without errors
    canonical: infra.test-environment

  - what: API credentials provisioned for our service
    ready: Our service authenticates and completes a round-trip API call
    canonical: auth.api-credentials

optional:
  - what: Webhook endpoint so we receive real-time CRM updates
    ready: We receive a test webhook payload within 5 seconds of a CRM update
    canonical: integration.webhook.outbound

  - what: Access to your email platform for automated follow-up scheduling
    ready: Our service can send a test email on behalf of a test user
    canonical: integration.email.api
```

## Document Processing Platform

An AI platform that processes and extracts data from enterprise documents.

```yaml
name: docai-platform
version: 1.0.0
description: Document processing and data extraction platform

requirements:
  - what: Access to your document storage where source files live (SharePoint, S3, or equivalent)
    ready: We can list and read files from a test folder in your document repository
    canonical: integration.erp.api

  - what: Sample documents (~50) representing each document type we'll process
    ready: We have processed all sample documents and confirmed extraction accuracy above 95%
    canonical: data.sample-dataset

  - what: Business owner who can validate extraction rules match your workflows
    ready: Business owner has reviewed and approved extraction rules for all document types
    canonical: stakeholder.business-owner

  - what: Security review of our document processing pipeline
    ready: Security team has completed review and approved data handling procedures
    canonical: process.security-review

  - what: Network access for our processing service to reach your document storage
    ready: Our service can connect to your storage endpoint from our production environment
    canonical: infra.network-access

optional:
  - what: Integration with your ERP for automatic posting of extracted data
    ready: Extracted data from a test document appears correctly in your ERP staging environment
    canonical: integration.erp.api

  - what: Training session for operations team on reviewing and correcting extractions
    ready: Operations team can independently review, correct, and approve extracted data
    canonical: process.training
```

## Customer Support Automation

An agent that handles tier-1 customer support with access to knowledge base and ticketing.

```yaml
name: support-copilot
version: 0.3.0
description: Tier-1 customer support automation

requirements:
  - what: Read access to your customer support knowledge base
    ready: Agent retrieves correct answers for 20 test questions from your KB

  - what: Integration with your ticketing system to read and update tickets
    ready: Agent can read a test ticket, add an internal note, and update its status

  - what: Access to customer account data (non-PII) for context during support interactions
    ready: Agent can look up a test account and retrieve plan type, tenure, and recent activity

  - what: Customer support team lead to define escalation rules and tone guidelines
    ready: Escalation rules document and approved tone guidelines delivered and reviewed

  - what: 6 months of resolved ticket history to learn common resolution patterns
    ready: We receive a data export of resolved tickets with resolution notes and categories
    canonical: data.historical-export

optional:
  - what: Real-time customer sentiment signals from your NPS/CSAT system
    ready: Agent receives sentiment score for a test customer within the support session

  - what: Ability to issue refunds or credits up to a defined threshold
    ready: Agent successfully processes a test refund of $5 in your staging environment
```

Note: The last example intentionally omits `canonical` on most items to show that contracts work perfectly without canonical mapping. The declare skill adds canonical types when confident, but they're never required.

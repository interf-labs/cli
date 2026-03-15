# integration.webhook — Event-Driven Connectivity

## integration.webhook.inbound

**Matches:** "we'll send you events", "you expose an endpoint", "push notifications to your system", "callback URL", "we call your API"

Enterprise needs to expose an HTTP endpoint that the vendor calls to deliver events or data. The enterprise is the receiver.

**Typical ready criteria:** "Enterprise endpoint receives and acknowledges a test webhook payload from our service"

## integration.webhook.outbound

**Matches:** "notify us when things change", "send us events", "real-time updates from your system", "event stream from your CRM/ERP"

Enterprise configures their system to send events to a vendor endpoint when data changes. The enterprise is the sender.

**Typical ready criteria:** "We receive a test webhook payload within 5 seconds of a record change in your system"

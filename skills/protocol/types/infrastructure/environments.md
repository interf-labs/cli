# infra.environments — Test Environments & Compute

## infra.test-environment

**Matches:** "staging environment", "sandbox", "test environment with real data", "QA environment", "dev instance for integration testing"

Vendor needs a non-production environment that resembles production closely enough for meaningful testing. Should have representative data and configurations.

**Typical ready criteria:** "We can run our full test suite against the environment without errors"

## infra.compute

**Matches:** "server resources", "compute for our workload", "deploy in your environment", "on-premises hosting", "GPU resources", "VM provisioning"

Enterprise needs to provision compute resources for the vendor's workload, typically for on-premises or private cloud deployments.

**Typical ready criteria:** "Compute resources provisioned and our service is running and responsive on the target infrastructure"

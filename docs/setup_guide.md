# SlingMe Deployment Setup Guide

## GitHub Secrets
Navigate to your repository's **Settings > Secrets and variables > Actions** and add the following repository secrets for both Development and Production environments (`DEV` and `PROD` suffixes).

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `GCP_PROJECT_DEV` | GCP Project ID for Dev | `slingme-dev-12345` |
| `GCP_PROJECT_PROD` | GCP Project ID for Prod | `slingme-prod-67890` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER_DEV` | WIF Provider Resource Name | `projects/123.../locations/global/workloadIdentityPools/...` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER_PROD` | WIF Provider Resource Name | `projects/456.../locations/global/workloadIdentityPools/...` |
| `GCP_SERVICE_ACCOUNT_DEV` | Service Account Email | `github-deploy@slingme-dev.iam.gserviceaccount.com` |
| `GCP_SERVICE_ACCOUNT_PROD` | Service Account Email | `github-deploy@slingme-prod.iam.gserviceaccount.com` |

## GCP Configuration requirements
For each project (Dev/Prod):
1.  **Enable APIs**:
    *   Cloud Run API
    *   Artifact Registry API
    *   Cloud Build API
    *   IAM Service Account Credentials API
2.  **Artifact Registry**:
    *   Create a Docker repository named `slingshot-agents` in `us-central1`.
3.  **Workload Identity Federation**:
    *   Create a Pool and Provider to allow GitHub Actions to impersonate the Service Account.
    *   Grant `roles/iam.workloadIdentityUser` on the Service Account to the GitHub repository principal.
4.  **Service Account Permissions**:
    *   `roles/run.admin`
    *   `roles/storage.admin` (for Cloud Build)
    *   `roles/artifactregistry.writer`
    *   `roles/iam.serviceAccountUser` (to act as the runtime service account)

## Agents Service
The agents service is located in the `agents/` directory.
-   It uses FastAPI.
-   It is Dockerized.
-   The GitHub workflow `agents-deploy.yml` builds and deploys this service.

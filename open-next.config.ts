import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Default (no incremental cache): pages with `revalidate` render on demand. Add an R2 incremental cache later if needed.
export default defineCloudflareConfig({});

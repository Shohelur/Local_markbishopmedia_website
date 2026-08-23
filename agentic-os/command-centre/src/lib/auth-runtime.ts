import path from "node:path";

import { apiKey } from "@better-auth/api-key";
import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { deviceAuthorization, organization } from "better-auth/plugins";
import { Pool } from "pg";

import { getConfig } from "./config";

export type AgenticAuth = any;

let authInstance: AgenticAuth | null = null;
let migrationPromise: Promise<void> | null = null;

function getAuthDatabase() {
  const connectionString = (process.env.MEMORY_DATABASE_URL || process.env.DATABASE_URL || "").trim();
  if (connectionString) {
    return new Pool({ connectionString });
  }

  const authDbPath = path.join(getConfig().agenticOsDir, ".command-centre", "better-auth.db");
  return new Database(authDbPath);
}

export function getAuth(): AgenticAuth {
  if (!authInstance) {
    authInstance = betterAuth({
      database: getAuthDatabase(),
      secret:
        process.env.BETTER_AUTH_SECRET ||
        process.env.AUTH_SECRET ||
        "agentic-os-development-secret-change-me",
      baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      emailAndPassword: {
        enabled: true,
      },
      plugins: [
        organization({
          teams: {
            enabled: true,
          },
        }),
        apiKey({ enableMetadata: true, defaultPrefix: "aos" }),
        deviceAuthorization({
          verificationUri: "/device",
        }),
      ],
    });
  }
  return authInstance as AgenticAuth;
}

export async function ensureAuthSchema(): Promise<void> {
  if (!migrationPromise) {
    migrationPromise = (async () => {
      const context = await getAuth().$context;
      await context.runMigrations();
    })();
  }
  return migrationPromise;
}

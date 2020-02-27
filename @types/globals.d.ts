/// <reference types="node" />

// Extend the NodeJS namespace with variables in next.config.js
declare namespace NodeJS {
  interface ProcessEnv {
    readonly SENTRY_DSN: string;
    readonly VERSION: string;
    readonly DESCRIPTION: string;
    readonly REPO: string;
    readonly API_BASE: string;
    readonly BUILD_ID: string;
    readonly SENTRY_RELEASE: string;
  }
}

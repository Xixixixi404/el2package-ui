/// <reference types="vite/client" />

export {}

declare interface ImportMeta {
  glob(pattern: string): Promise<Record<string, any>>;
}

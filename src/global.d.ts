declare namespace NodeJS {
  interface ProcessEnv {
    readonly HOME: string;
    readonly NPM_TOKEN?: string;
  }
}

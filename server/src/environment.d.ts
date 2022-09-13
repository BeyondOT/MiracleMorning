declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_SECRET: string;
      PORT: string;
      NODE_ENV: "development" | "production"
    }
  }
}
export{}
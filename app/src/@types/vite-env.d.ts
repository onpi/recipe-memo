interface ImportMeta {
  env: {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production';
    VITE_API_KEY: string;
    VITE_AUTH_DOMAIN: string;
    VITE_PROJECT_ID: string;
    VITE_STORAGE_BUCKET: string;
    VITE_MESSAGING_SENDER_ID: string;
    VITE_APP_ID: string;
  };
}

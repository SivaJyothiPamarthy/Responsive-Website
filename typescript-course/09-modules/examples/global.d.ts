// Augment the global Window type and declare an asset module.

declare global {
  interface Window {
    __APP_VERSION__: string;
  }
}

declare module "*.svg" {
  const src: string;
  export default src;
}

export {};

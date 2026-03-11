/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GA_MEASUREMENT_ID: string
    readonly PROD: boolean
    readonly DEV: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string
    readonly VITE_GA_MEASUREMENT_ID: string
    readonly PROD: boolean
    readonly DEV: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

/**
 * Supported file extensions for the generated BCF file.
 */
export const FILE_EXTENSIONS = {
    /**
     * ZIP file.
     */
    ZIP: 'zip',
    /**
     * BCFZIP file.
     */
    BCFZIP: 'bcfzip',
    /**
     * BCF file.
     */
    BCF: 'bcf',
} as const;

/**
 * Event types that can be **received** (!) by the worker.
 */
export const WORKER_EVENT_TYPES = {
    /**
     * Start event.
     */
    BEGIN: 'begin',
    /**
     * Progress event.
     */
    PROGRESS: 'progress',
    /**
     * End event.
     */
    END: 'end',
    /**
     * Error event.
     */
    ERROR: 'error',
    /**
     * Debug event.
     */
    TEST: 'test',
} as const;

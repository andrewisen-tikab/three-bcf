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

import { XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';

/**
 * Encoding of the generated BCF XML.
 */
export const XML_ENCODING = 'UTF-8' as const;
/**
 * Location of the BCF XML schema.
 */
export const SCHEMA_LOCATION =
    'https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/version.xsd' as const;

/**
 * XML writer options.
 */
export const XML_WRITER_OPTIONS: XMLWriterOptions = { prettyPrint: true } as const;

/**
 * Type of the topic.
 *
 * See: https://github.com/buildingSMART/BCF-XML/blob/16da84f1d8ba92a04676c5a4b2fdb11b64b59306/Documentation/README.md#topic
 */
export const TOPIC_TYPES = {
    /**
     * Error topic type.
     */
    ERROR: 'Error',
    /**
     * Warning topic type.
     */
    WARNING: 'Warning',
    /**
     * Info topic type.
     */
    INFO: 'Info',
    /**
     * Unknown topic type.
     */
    UNKNOWN: 'Unknown',
} as const;

/**
 * Status of the topic.
 *
 * See: https://github.com/buildingSMART/BCF-XML/blob/16da84f1d8ba92a04676c5a4b2fdb11b64b59306/Documentation/README.md#topic
 */
export const TOPIC_STATUSES = {
    /**
     * Open topic status.
     */
    OPEN: 'Open',
    /**
     * Closed topic status.
     */
    CLOSED: 'Closed',
} as const;

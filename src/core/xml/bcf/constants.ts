import { XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';

export const ENCODING = 'UTF-8' as const;
export const SCHEMA_LOCATION =
    'https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/version.xsd' as const;
export const XML_WRITER_OPTIONS: XMLWriterOptions = { prettyPrint: true } as const;

/**
 * Type of the topic.
 *
 * See: https://github.com/buildingSMART/BCF-XML/blob/16da84f1d8ba92a04676c5a4b2fdb11b64b59306/Documentation/README.md#topic
 */
export const TOPIC_TYPES = {
    ERROR: 'Error',
    WARNING: 'Warning',
    INFO: 'Info',
    UNKNOWN: 'Unknown',
} as const;

/**
 * Type of the topic.
 *
 * See: https://github.com/buildingSMART/BCF-XML/blob/16da84f1d8ba92a04676c5a4b2fdb11b64b59306/Documentation/README.md#topic
 */
export const TOPIC_STATUSES = {
    OPEN: 'Open',
    CLOSED: 'Closed',
} as const;

import { XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';

export const ENCODING = 'UTF-8' as const;
export const SCHEMA_LOCATION =
    'https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/version.xsd' as const;
export const XML_WRITER_OPTIONS: XMLWriterOptions = { prettyPrint: true } as const;

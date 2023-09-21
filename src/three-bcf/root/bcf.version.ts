import { create } from 'xmlbuilder2';
import XMLCreator from '../xml';
import { ENCODING, SCHEMA_LOCATION, XML_WRITER_OPTIONS } from '../../constants';

/**
 * bcf.version
 *
 * An XML file following the version.xsd schema with information of the BCF schema used.
 * The file content should be identical to the contents of [bcf.version](https://github.com/buildingSMART/BCF-XML/blob/release_3_0/Schemas/version.xsd)
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure)
 */
class BCFVersionFactory_XML extends XMLCreator {
    /**
     * Example XML:
     * ```xml
     * <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
     * <Version xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" VersionId="3.0" xsi:noNamespaceSchemaLocation="https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/version.xsd"/>
     * ```
     */
    public create(): string {
        const root = create({ version: '1.0', encoding: ENCODING, standalone: true })
            .ele('Version')
            .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .att('VersionId', '3.0')
            .att('xsi:noNamespaceSchemaLocation', SCHEMA_LOCATION);
        const bcfVersion = root.end(XML_WRITER_OPTIONS);
        return bcfVersion;
    }
}

export default BCFVersionFactory_XML;

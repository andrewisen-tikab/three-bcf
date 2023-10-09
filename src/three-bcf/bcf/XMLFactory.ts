/**
 * Base class for creating XML files.
 */
class XMLFactory {
    /**
     * Creates a XML document string.
     *
     * For example:
     * ```xml
     * <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
     * <Version xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" VersionId="3.0" xsi:noNamespaceSchemaLocation="https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/version.xsd"/>
     * ```
     */
    create(_e: any): string {
        throw new Error('Method not implemented.');
    }
}

export default XMLFactory;

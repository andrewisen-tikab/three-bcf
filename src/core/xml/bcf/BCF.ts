import XMLCreator from '../../xml/xml';

/**
 * A BCF file is a zip containing one folder for each topic with its file extension:
 * - `bcfzip` for BCFv1.0 and BCFv2.0.
 * - The file extension `bcf` is introduced since BCFv2.1.
 *
 * The root of the BCF zip contains the following files.
 *
 * - extensions.xml
 *
 * > An XML file defining the extensions of a project. The schema for this file is extensions.xsd.
 *
 * - project.bcfp (optional)
 *
 * > An XML file defining the details of a project. The schema for this file is project.xsd.
 *
 * - documents.xml (optional)
 *
 * > An XML file defining the documents in a project. The schema for this file is documents.xsd.
 *
 * - bcf.version
 *
 * > An XML file following the version.xsd schema with information of the BCF schema used. The file content should be identical to the contents of bcf.version
 *
 * It is possible to store additional files in the BCF container as documents.
 * The documents must be located in a folder called Documents in the root directory,
 * and must be referenced by the documents.xml file.
 *
 * For uniqueness, the filename of a document in the BCF must be the document guid.
 * The actual filename is stored in the documents.xml.
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure)
 */
class BCF_XML extends XMLCreator {}

export default BCF_XML;

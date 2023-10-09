import XMLFactory from './XMLFactory';

/**
 * The folder name is the GUID of the topic.
 * This GUID is in the UUID form. The GUID must be all-lowercase.
 *
 * The folder contains the following file:
 *
 * - markup.bcf
 *
 * > An XML file following the markup.xsd schema that is described below.
 * > Additionally the folder can contain other files:
 *
 * - Viewpoint files
 *
 * > An XML file conforming to the visinfo.xsd schema that is described below.
 * > File names should end with the .bcfv extension and match the value of one of the Viewpoint elements.
 *
 * - Snapshot files
 *
 * > Both PNG and JPEG snapshots are allowed.
 * > The longest dimension of should not exceed 1500 px, length or width.
 * > File names should match the value of one of the Snapshot elements.
 *
 * - Bitmaps
 *
 * > See https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#bitmap-optional.
 *
 * Note:
 *
 * The elements in the XML files must appear in the order given in the schemas and described below.
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#topic-folder-structure-inside-a-bcfzip-archive](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#topic-folder-structure-inside-a-bcfzip-archive)
 */
class TopicFactory extends XMLFactory {}

export default TopicFactory;

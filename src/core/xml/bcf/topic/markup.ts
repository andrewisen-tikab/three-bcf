import { create } from 'xmlbuilder2';
import { XML_WRITER_OPTIONS } from '../constants';
import Topic_XML from './topic';
import type { CreateParams } from '../../../../types';

/**
 * ## Markup (.bcf) file
 * The markup file contains textual information about the topic.
 *
 * ### Header
 * Header node contains information about the IFC files relevant to this topic.
 *
 * The "files" should be used to match which models to be opened when displaying the topic viewpoints.
 *
 * As IFC-files don't have an unique id, this matching might not be fully automated.
 * Therefore the software importing the BCF file should give the user a possibility to match these files,
 * with the internal models.
 *
 * Each File node has the following attributes:
 *
 * Attribute | Optional | Description |
 * :-----------|:------------|:------------
 * IfcProject  |        Yes |     IfcGuid Reference to the project to which this topic is related in the IFC file
 * IfcSpatialStructureElement | Yes | IfcGuid Reference to the spatial structure element, e.g. IfcBuildingStorey, to which this topic is related.
 * IsExternal | Yes | Is the IFC file external or within the bcfzip. (Default = true).
 *
 * In addition File has the following nodes
 *
 * Attribute | Optional | Description |
 * :-----------|:------------|:------------
 * Filename | Yes | The BIM file related to this topic. For IFC files this is the first item in the FILE_NAME entry in the IFC file's [header](https://standards.buildingsmart.org/documents/Implementation/ImplementationGuide_IFCHeaderData_Version_1.0.2.pdf).
 * Date | Yes | Date of the BIM file. For IFC files this is the second entry of the FILE_NAME entry in the IFC file's [header](https://standards.buildingsmart.org/documents/Implementation/ImplementationGuide_IFCHeaderData_Version_1.0.2.pdf). When the timestamp given in the header does not provide timezone, it is interpreted as UTC.
 * Reference | Yes | URI to IfcFile. <br> IsExternal=false “..\example.ifc“ (within bcfzip) <br> IsExternal=true  “https://.../example.ifc
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#markup-bcf-file](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#markup-bcf-file)
 */
class Markup_XML extends Topic_XML {
    public create(e: CreateParams): string {
        const doc = create({ version: '1.0', encoding: 'UTF-8', standalone: true })
            .ele('Markup', {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xsi:noNamespaceSchemaLocation':
                    'https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/markup.xsd',
            })
            .ele('Header')
            .ele('Files')
            .ele('File', { IfcProject: '16ptFjkWnCdh4kqFvB0NRX', IsExternal: 'true' })
            .ele('Filename')
            .txt('0001')
            .up()
            .ele('Date')
            .txt('2023-07-03T21:00:35+02:00')
            .up()
            .up()
            .up()
            .up()
            .ele('Topic', {
                Guid: e.topicGuid,
                TopicType: 'Error',
                TopicStatus: 'Open',
            })
            .ele('ReferenceLinks')
            .up()
            .ele('Title')
            .txt(e.title)
            .up()
            .ele('Index')
            .txt('1')
            .up()
            .ele('Labels')
            .up()
            .ele('CreationDate')
            .txt('2023-07-03T21:02:50+02:00')
            .up()
            .ele('CreationAuthor')
            .txt('awisen@kth.se')
            .up()
            .ele('ModifiedDate')
            .txt('2023-07-03T21:03:55+02:00')
            .up()
            .ele('ModifiedAuthor')
            .txt('awisen@kth.se')
            .up()
            .ele('AssignedTo')
            .up()
            .ele('Description')
            .txt(e.description)
            .up()
            .ele('DocumentReferences')
            .up()
            .ele('RelatedTopics')
            .up()
            .ele('Comments')
            .up()
            .ele('Viewpoints')
            .ele('ViewPoint', { Guid: e.viewpointGuid })
            .ele('Viewpoint')
            .txt(`${e.viewpointGuid}.bcfv`)
            .up()
            .ele('Snapshot')
            .txt(`${e.viewpointGuid}.png`)
            .up()
            .ele('Index')
            .txt('0')
            .up()
            .up()
            .up()
            .up();

        const markup = doc.end(XML_WRITER_OPTIONS);
        return markup;
    }
}

export default Markup_XML;

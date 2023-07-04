import { create } from 'xmlbuilder2';
import XMLCreator from '../../xml/xml';
import Topic from './topic';
import Markup from './markup';

/**
 * The {@link Markup} can contain multiple viewpoints related to one or more comments.
 * A viewpoint has also the Guid attribute for identifying it uniquely.
 *
 * In addition, it has the following nodes:
 *
 * Element | Optional | Description |
 * :-----------|:------------|:------------
 * Viewpoint | Yes | Filename of the viewpoint (.bcfv)
 * Snapshot | Yes | Filename of the snapshot (png or jpeg)
 * Index | Yes | Parameter for sorting
 *
 * Viewpoints are immutable, therefore they should never be changed once created. If new comments on a topic require different visualization, new viewpoints should be added.
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#viewpoints](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#viewpoints)
 */
class Viewpoint extends Topic {
    public create(): string {
        const root = create({ version: '1.0', encoding: 'UTF-8', standalone: true })
            .ele('VisualizationInfo')
            .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .att('Guid', 'a1cbfe86-2934-4bb4-9794-507b3034f2a3')
            .att(
                'xsi:noNamespaceSchemaLocation',
                'https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/visinfo.xsd',
            );

        const components = root.ele('Components');

        // Add Selection element
        components.ele('Selection');

        // Add Visibility element
        const visibility = components.ele('Visibility');
        visibility.att('DefaultVisibility', 'true');
        visibility
            .ele('ViewSetupHints')
            .att('SpacesVisible', 'false')
            .att('SpaceBoundariesVisible', 'false')
            .att('OpeningsVisible', 'false');
        visibility.ele('Exceptions');

        // Add Coloring element
        const coloring = components.ele('Coloring');
        const color = coloring.ele('Color').att('Color', 'FF00FF00');
        const colorComponents = color.ele('Components');
        const component = colorComponents.ele('Component').att('IfcGuid', '1Ryb8XgUj3gebyYvJGdU2O');
        component.ele('OriginatingSystem').txt('Autodesk Revit 2023 (ENU)');
        component.ele('AuthoringToolId').txt('350815');

        // Add PerspectiveCamera element
        const perspectiveCamera = root.ele('PerspectiveCamera');
        const cameraViewPoint = perspectiveCamera.ele('CameraViewPoint');

        cameraViewPoint.ele('X').txt('2.459195214654866');
        cameraViewPoint.ele('Y').txt('-3.2626336461159022');
        cameraViewPoint.ele('Z').txt('2.484054818039438');

        const cameraDirection = perspectiveCamera.ele('CameraDirection');
        cameraDirection.ele('X').txt('0.07723484725873991');
        cameraDirection.ele('Y').txt('0.9882145480786174');
        cameraDirection.ele('Z').txt('-0.1321619662939877');

        const cameraUpVector = perspectiveCamera.ele('CameraUpVector');

        cameraUpVector.ele('X').txt('0.010297840552161751');
        cameraUpVector.ele('Y').txt('0.13176016019516443');
        cameraUpVector.ele('Z').txt('0.9912281345206597');

        perspectiveCamera.ele('FieldOfView').txt('59.99999999999999');
        perspectiveCamera.ele('AspectRatio').txt('1.9611829944547134');

        // Add Bitmaps element
        root.ele('Bitmaps');

        // Convert the XML to a string
        const viewpoint = root.end({ prettyPrint: true });

        return viewpoint;
    }
}

export default Viewpoint;

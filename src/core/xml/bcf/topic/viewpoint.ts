import { create } from 'xmlbuilder2';
import Topic_XML from './topic';
import Markup_XML from './markup';
import type { CreateParams_Worker } from '../../../../types';

/**
 * The {@link Markup_XML} can contain multiple viewpoints related to one or more comments.
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
class Viewpoint_XML extends Topic_XML {
    public create(e: CreateParams_Worker): string {
        const root = create({ version: '1.0', encoding: 'UTF-8', standalone: true })
            .ele('VisualizationInfo')
            .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .att('Guid', e.viewpointGuid)
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
        cameraViewPoint.ele('X').txt(`${e.cameraViewPoint[0]}`);
        cameraViewPoint.ele('Y').txt(`${e.cameraViewPoint[1]}`);
        cameraViewPoint.ele('Z').txt(`${e.cameraViewPoint[2]}`);

        const cameraDirection = perspectiveCamera.ele('CameraDirection');
        cameraDirection.ele('X').txt(`${e.cameraDirection[0]}`);
        cameraDirection.ele('Y').txt(`${e.cameraDirection[1]}`);
        cameraDirection.ele('Z').txt(`${e.cameraDirection[2]}`);

        const cameraUpVector = perspectiveCamera.ele('CameraUpVector');
        cameraUpVector.ele('X').txt(`${e.cameraUpVector[0]}`);
        cameraUpVector.ele('Y').txt(`${e.cameraUpVector[1]}`);
        cameraUpVector.ele('Z').txt(`${e.cameraUpVector[2]}`);

        perspectiveCamera.ele('FieldOfView').txt(`${e.fieldOfView}`);
        perspectiveCamera.ele('AspectRatio').txt(`${e.aspectRatio}`);

        // Add Bitmaps element
        root.ele('Bitmaps');

        // Convert the XML to a string
        const viewpoint = root.end({ prettyPrint: true });

        return viewpoint;
    }
}

export default Viewpoint_XML;

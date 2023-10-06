import { create } from 'xmlbuilder2';
import Topic_XML from './topic';
import MarkupFactory_XML from './markup';
import type { CreateParams_Worker } from '../../types';

/**
 * The {@link MarkupFactory_XML} can contain multiple viewpoints related to one or more comments.
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
class ViewpointFactory_XML extends Topic_XML {
    public create(e: CreateParams_Worker, guid?: string): string {
        const root = create({ version: '1.0', encoding: 'UTF-8', standalone: true })
            .ele('VisualizationInfo')
            .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .att('Guid', guid ?? '')
            .att(
                'xsi:noNamespaceSchemaLocation',
                'https://raw.githubusercontent.com/buildingSMART/BCF-XML/release_3_0/Schemas/visinfo.xsd',
            );

        const { components: _components } = e;

        _components.forEach((components) => {
            const { coloring: _coloring, selection: _selection, visibility } = components;
            const xmlComponents = root.ele('Components');

            // Add Selection element
            _selection.forEach((selection) => {
                const { components } = selection;
                const xmlSelection = xmlComponents.ele('Selection');

                components.forEach((component) => {
                    const { ifcGuid, originatingSystem, authoringToolId } = component;

                    // IFC GUID is required
                    if (!ifcGuid) return;

                    const xmlComponent = xmlSelection.ele('Component').att('IfcGuid', ifcGuid);

                    if (originatingSystem)
                        xmlComponent.ele('OriginatingSystem').txt(originatingSystem);
                    if (authoringToolId) xmlComponent.ele('AuthoringToolId').txt(authoringToolId);
                });
            });

            const {
                defaultVisibility,
                viewSetupHints,
                components: visibilityComponents,
            } = visibility;

            // Add Visibility element
            const xmlVisibility = xmlComponents.ele('Visibility');
            xmlVisibility.att('DefaultVisibility', `${defaultVisibility.toString()}`);

            xmlVisibility
                .ele('ViewSetupHints')
                .att('SpacesVisible', viewSetupHints.spacesVisible.toString())
                .att('SpaceBoundariesVisible', viewSetupHints.spaceBoundariesVisible.toString())
                .att('OpeningsVisible', viewSetupHints.openingsVisible.toString());
            const xmlExceptions = xmlVisibility.ele('Exceptions');

            visibilityComponents.forEach((component) => {
                const { ifcGuid, originatingSystem, authoringToolId } = component;
                // IFC GUID is required
                if (!ifcGuid) return;
                const xmlComponent = xmlExceptions.ele('Component').att('IfcGuid', ifcGuid);
                if (originatingSystem) xmlComponent.ele('OriginatingSystem').txt(originatingSystem);
                if (authoringToolId) xmlComponent.ele('AuthoringToolId').txt(authoringToolId);
            });

            // Add Coloring element
            _coloring.forEach((coloring) => {
                const { color, components } = coloring;
                const xmlColoring = xmlComponents.ele('Coloring');
                const xmlColor = xmlColoring.ele('Color').att('Color', `${color}`);
                const xmlColorComponents = xmlColor.ele('Components');
                components.forEach((component) => {
                    const { ifcGuid, originatingSystem, authoringToolId } = component;

                    // IFC GUID is required
                    if (!ifcGuid) return;

                    const xmlComponent = xmlColorComponents
                        .ele('Component')
                        .att('IfcGuid', ifcGuid);

                    if (originatingSystem)
                        xmlComponent.ele('OriginatingSystem').txt(originatingSystem);
                    if (authoringToolId) xmlComponent.ele('AuthoringToolId').txt(authoringToolId);
                });
            });
        });

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

export default ViewpointFactory_XML;

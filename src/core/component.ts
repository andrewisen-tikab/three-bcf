import { z } from 'zod';
import BCFBaseSchema from './zod';

/**
 * An IFC component.
 */
export const ComponentSchema = BCFBaseSchema.extend({
    /**
     * The `IfcGuid` of the component.
     *
     * E.g. `1Ryb8XgUj3gebyYvJGdU9n`.
     */
    ifcGuid: z.string().optional(),
    /**
     * Name of the system in which the component is originated.
     *
     * E.g. `Autodesk Revit 2023 (ENU)`.
     */
    originatingSystem: z.string().optional(),
    /**
     * System specific identifier of the component in the originating BIM tool
     *
     * E.g. `350390`.
     */
    authoringToolId: z.string().optional(),
});

/**
 * An IFC component.
 */
export type Component = z.infer<typeof ComponentSchema>;

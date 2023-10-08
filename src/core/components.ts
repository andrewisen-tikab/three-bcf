import { z } from 'zod';
import BCFBaseSchema from './zod';

import { ColoringSchema } from './Coloring';
import { SelectionSchema } from './Selection';
import { VisibilitySchema } from './Visibility';

export const ComponentsSchema = BCFBaseSchema.extend({
    /**
     * The `Selection` element lists all components that should be selected (highlighted) when displaying a viewpoint.
     *
     * BCF is suitable for selecting a few components.
     * A huge list of selected components causes poor performance. All clients should follow this rule:
     *
     * If the size of the selected components is huge (over 1000 components), alert the user and ask them to reduce the number of selected components.
     */
    selection: z.array(SelectionSchema),
    /**
     * The `Visibility` element decides which objects are visible and which are hidden.
     *
     * Element/Attribute | Optional | Description |
     * :-----------|:------------|:------------
     * DefaultVisibility | Yes | Boolean. Defaults to `false`</br><ul><li>When `true`, all components should be visible unless listed in the exceptions</li><li>When `false` all components should be invisible unless listed in the exceptions</li></ul>
     * Exceptions | Yes | A list of components to hide when `DefaultVisibility=true` or to show when `DefaultVisibility=false`
     * ViewSetupHints | Yes | Boolean flags to allow fine control over the visibility of [spaces](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcspace.htm), [space boundaries](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcrelspaceboundary.htm) and [openings](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcopeningelement.htm). A typical use of these flags is when `DefaultVisibility=true` but spaces, spaces boundaries and openings should remain hidden. </br>All flags default to `false`</br><ul><li>SpacesVisible - same as `DefaultVisibility` but restricted to spaces only</li><li>SpaceBoundariesVisible - same as `DefaultVisibility` but restricted to space boundaries only</li><li>OpeningsVisible - same as `DefaultVisibility` but restricted to openings only</li></ul>
     *
     * **Optimization Rules**
     *
     * BCF is suitable for hiding/showing a few components. A huge list of hidden/shown components causes poor performance. When encoding a viewpoint follow these rules:
     *
     * * If the list of hidden components is smaller than the list of visible components: set `DefaultVisibility` to true and put the hidden components in exceptions.
     * * If the list of visible components is smaller or equals the list of hidden components: set default_visibility to false and put the visible components in exceptions.
     * * If the size of exceptions is huge (over 1000 components), alert the user and ask them to alter the visibility to allow efficient encoding.
     * * For spaces, space boundaries and openings follow the following guideline (using spaces as an example): When a viewpoint has no visible spaces, set the value of `SpacesVisible` to false. If there are any spaces visible in the viewpoint, set the value to be the same as `DefaultVisibility` and follow the optimization rules above while treating spaces like any other component
     *
     * ##### Applying Visibility
     * The visibility is applied in following order:
     * 1. Apply the `DefaultVisibility`
     * 2. Apply the `ViewSetupHints`
     * 3. Apply the `Exceptions`
     *
     * ###### Example
     *
     * Consider the viewpoint provided below.
     * 1. Applying `DefaultVisibility="false"` hides all objects
     * 2. Applying `SpacesVisible="true"` shows all space
     * 3. Applying Exceptions
     * > 1. Inverting the Wall visibility makes it visible
     * > 2. Interting the Space visibility makes it invisible
     *
     * In summary, after applying the following viewpoint:
     * 1. All spaces are visible except one space which is hidden
     * 2. All the other objects are hidden except for one wall which is visible
     *
     */
    visibility: VisibilitySchema,
    /**
     * The `Coloring` element allows specifying the color of components. For each color a list of components to be displayed with the that color should be provided.
     *
     * The color is given in ARGB format. Colors are represented as 6 or 8 hexadecimal digits. If 8 digits are present, the first two represent the alpha (transparency) channel. For example, `40E0D0` would be the color Turquoise. [More information about the color format can be found on Wikipedia.](https://en.wikipedia.org/wiki/RGBA_color_space)
     *
     * **Optimization Rules**
     *
     * BCF is suitable for coloring a few components. A huge list of components causes poor performance. All clients should follow this rule:
     *
     * * If the size of colored components is huge (over 1000 components), alert the user and ask them to reduce the number of colored components.
     */
    coloring: z.array(ColoringSchema),
});

export type Components = z.infer<typeof ComponentsSchema>;

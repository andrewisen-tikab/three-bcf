import { z } from 'zod';

import BCFBaseSchema from './zod';

export const ComponentSchema_Core = z.object({
    /**
     * The IfcGuid of the component
     */
    ifcGuid: z.string().optional(),
    /**
     * Name of the system in which the component is originated
     */
    originatingSystem: z.string().optional(),
    /**
     * System specific identifier of the component in the originating BIM tool
     */
    authoringToolId: z.string().optional(),
});

export type Component_Core = z.infer<typeof ComponentSchema_Core>;

/**
 * The `Coloring` element allows specifying the color of {@link Component_Core | components}.
 */
export const ColoringSchema_Core = z.object({
    /**
     * The color is given in ARGB format. Colors are represented as 6 or 8 hexadecimal digits.
     * If 8 digits are present, the first two represent the alpha (transparency) channel.
     * For example, 40E0D0 would be the color Turquoise.
     *
     * [More information about the color format can be found on Wikipedia](https://en.wikipedia.org/wiki/RGBA_color_model).
     */
    color: z.string(),
    /**
     * The Coloring element allows specifying the color of components.
     * For each color a list of components to be displayed with the that color should be provided.
     */
    components: z.array(ComponentSchema_Core),
});

/**
 * The `Coloring` element allows specifying the color of {@link Component_Core | components}.
 */
export type Coloring_Core = z.infer<typeof ColoringSchema_Core>;

export const ComponentsSchema_Core = BCFBaseSchema.extend({
    /**
     * The `Selection` element lists all components that should be selected (highlighted) when displaying a viewpoint.
     *
     * BCF is suitable for selecting a few components.
     * A huge list of selected components causes poor performance. All clients should follow this rule:
     *
     * If the size of the selected components is huge (over 1000 components), alert the user and ask them to reduce the number of selected components.
     */
    selection: z.any(),
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
    visibility: z.any(),
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
    coloring: z.array(ColoringSchema_Core),
});

export type Components_Core = z.infer<typeof ComponentsSchema_Core>;

/**
 * The markup file can contain multiple viewpoints related to one or more comments.
 * A viewpoint has also the Guid attribute for identifying it uniquely.
 *
 * Viewpoints are immutable, therefore they should never be changed once created.
 * If new comments on a topic require different visualization, new viewpoints should be added.
 */
export const TopicViewpointSchema_Core = BCFBaseSchema.extend({
    /**
     * Filename of the viewpoint (.bcfv).
     */
    viewpoint: z.string(),
    /**
     * Filename of the snapshot (png or jpeg).
     */
    snapshot: z.string(),
    snapshotImage: z.string(),
    /**
     * Parameter for sorting.
     */
    index: z.number(),
});

/**
 * The markup file can contain multiple viewpoints related to one or more comments.
 * A viewpoint has also the Guid attribute for identifying it uniquely.
 *
 * Viewpoints are immutable, therefore they should never be changed once created.
 * If new comments on a topic require different visualization, new viewpoints should be added.
 */
export type TopicViewpoint_Core = z.infer<typeof TopicViewpointSchema_Core>;

/**
 * The markup file can contain comments related to the topic.
 * Their purpose is to record discussion between different parties related to the topic.
 * Each Comment has a Guid attribute for identifying it uniquely.
 * A comment can reference a viewpoint to support the discussion.
 * At least one of Viewpoint and/or Comment (text) must be provided.
 */
export const TopicCommentSchema_Core = BCFBaseSchema.extend({
    /**
     * Date of the comment
     */
    date: z.string(),
    /**
     * Comment author.
     */
    author: z.string(),
    /**
     * The comment text, must not be empty if provided.
     */
    comment: z.string().optional(),
    /**
     * Back reference to the viewpoint GUID.
     */
    viewpoint: z.string().uuid().optional(),
    /**
     * The date when comment was modified.
     */
    modifiedDate: z.string().optional(),
    /**
     * The author who modified the comment.
     */
    modifiedAuthor: z.string().optional(),
});

/**
 * The markup file can contain comments related to the topic.
 * Their purpose is to record discussion between different parties related to the topic.
 * Each Comment has a Guid attribute for identifying it uniquely.
 * A comment can reference a viewpoint to support the discussion.
 * At least one of Viewpoint and/or Comment (text) must be provided.
 */
export type TopicComment_Core = z.infer<typeof TopicCommentSchema_Core>;

/*
 * Topic node contains reference information of the topic.
 * It has one required attribute, which is the topic GUID (Guid).
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#topic](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#topic)
 */
const TopicSchema_Core = BCFBaseSchema.extend({
    /**
     * Title of the topic.
     */
    title: z.string(),
    /**
     * Description of the topic.
     */
    description: z.string().optional(),
    /**
     * Number to maintain the order of the topics.
     * This property is deprecated and will be removed in a future release
     */
    index: z.number(),
    /**
     * Date when the topic was created.
     *
     * E.g. `2023-07-03T21:02:50+02:00`
     */
    creationDate: z.string(),
    /**
     * User who created the topic.
     *
     * E.g. `andre.wisen@gmail.com`
     */
    creationAuthor: z.string(),
    /**
     * Date when the topic was last modified. Exists only when Topic has been modified after creation.
     *
     * E.g. `2023-07-03T21:02:50+02:00`
     */
    modifiedDate: z.string(),
    /**
     * User who modified the topic.
     * Exists only when Topic has been modified after creation.
     *
     * E.g. `andre.wisen@gmail.com`
     */
    modifiedAuthor: z.string(),
    /**
     * Type of the topic.
     */
    topicType: z.string(),
    /**
     * Type of the topic.
     */
    topicStatus: z.string(),
    /**
     * Date until when the topics issue needs to be resolved.
     *
     * E.g. `2023-09-19T00:00:00+02:00`
     *
     * ### DateTime Format
     *
     * DateTime values in this specification are always of type `xs:dateTime` which is an ISO 8601 compatible `YYYY-MM-DDThh:mm:ss` format with optional time zone indicators.
     * This is the same format as defined in the BCF-API specification.
     *
     * For example, `2016-04-28T16:31:12.270+02:00` would represent _Thursday, April 28th, 2016, 16:31:12 (270ms) with a time zone offset of +2 hours relative to UTC._
     * Please note that the colon in the timezone offset is optional, so `+02:00` is equivalent to `+0200`.
     *
     * To void ambiguity, this specification steps away from ISO 8601 on the topic of DateTime values with no timezone:
     * The ISO 8601 says that DateTime values with no timezone designator are local times - **In BCF all DateTime values with no timezone designator are assumed to be in UTC**.
     *
     */
    dueDate: z.string().nullable(),
    /**
     * The user(s) to whom this topic is assigned to. Recommended to be in email format (Predefined list in “extensions.xml”).
     *
     * E.g. `andre.wisen@gmail.com`
     *
     * Or, with multiple users: `foo@example.com, bar@example.comm, lorem@example.com`
     */
    assignedTo: z.string().nullable(),
    /**
     * The markup file can contain comments related to the topic. Their purpose is to record discussion between different parties related to the topic.
     */
    comments: z.array(TopicCommentSchema_Core),
    /**
     * The markup file can contain multiple viewpoints related to one or more comments.
     * A viewpoint has also the Guid attribute for identifying it uniquely.
     *
     * Viewpoints are immutable, therefore they should never be changed once created.
     * If new comments on a topic require different visualization, new viewpoints should be added.
     */
    viewpoints: z.array(TopicViewpointSchema_Core),
    components: z.array(ComponentsSchema_Core),
});

export type Topic_Core = z.infer<typeof TopicSchema_Core>;
export default TopicSchema_Core;

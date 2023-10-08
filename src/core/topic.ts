import { z } from 'zod';
import BCFBaseSchema from './zod';
import { ComponentsSchema } from './Components';
import { ViewpointSchema } from './Viewpoint';
import { CommentSchema } from './Comment';

/*
 * Topic node contains reference information of the topic.
 * It has one required attribute, which is the topic GUID (Guid).
 *
 * Read more:
 *
 * [https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#topic](https://github.com/BuildingSMART/BCF-XML/tree/release_3_0/Documentation#topic)
 */
const TopicSchema = BCFBaseSchema.extend({
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
     * E.g. `2023-07-03T21:02:50+02:00`.
     */
    creationDate: z.string(),
    /**
     * User who created the topic.
     *
     * E.g. `andre.wisen@gmail.com`.
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
    comments: z.array(CommentSchema),
    /**
     * The markup file can contain multiple viewpoints related to one or more comments.
     * A viewpoint has also the Guid attribute for identifying it uniquely.
     *
     * Viewpoints are immutable, therefore they should never be changed once created.
     * If new comments on a topic require different visualization, new viewpoints should be added.
     */
    viewpoints: z.array(ViewpointSchema),
    components: z.array(ComponentsSchema),
});

export type Topic = z.infer<typeof TopicSchema>;
export default TopicSchema;

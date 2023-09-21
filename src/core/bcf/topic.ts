import { z } from 'zod';

import BCFBaseSchema from './zod';

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
});

export type Topic_Core = z.infer<typeof TopicSchema_Core>;
export default TopicSchema_Core;

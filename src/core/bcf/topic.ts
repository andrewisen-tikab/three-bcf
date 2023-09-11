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
});

export type Topic_Core = z.infer<typeof TopicSchema_Core>;
export default TopicSchema_Core;

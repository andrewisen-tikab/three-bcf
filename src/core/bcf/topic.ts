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
    description: z.string(),
    /**
     * Number to maintain the order of the topics.
     * This property is deprecated and will be removed in a future release
     */
    index: z.number(),
});

export type Topic_Core = z.infer<typeof TopicSchema_Core>;
export default TopicSchema_Core;

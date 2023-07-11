import { z } from 'zod';

import BCFBaseSchema from './zod';

/**
 *
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
    description: z.string(),
});

export type Topic = z.infer<typeof TopicSchema>;
export default TopicSchema;

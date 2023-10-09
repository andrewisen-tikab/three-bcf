import { z } from 'zod';
import BCFBaseSchema from './zod';

/**
 * The markup file can contain comments related to the topic.
 * Their purpose is to record discussion between different parties related to the topic.
 * Each Comment has a Guid attribute for identifying it uniquely.
 * A comment can reference a viewpoint to support the discussion.
 * At least one of Viewpoint and/or Comment (text) must be provided.
 */
export const CommentSchema = BCFBaseSchema.extend({
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
export type Comment = z.infer<typeof CommentSchema>;

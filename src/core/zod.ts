import { z } from 'zod';

const BCFBaseSchema = z.object({
    uuid: z.string().uuid(),
});

export type BCFBase = z.infer<typeof BCFBaseSchema>;

export default BCFBaseSchema;

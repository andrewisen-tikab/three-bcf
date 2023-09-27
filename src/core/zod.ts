import { z } from 'zod';

const BCFBaseSchema = z.object({
    uuid: z.string().uuid(),
});

export default BCFBaseSchema;

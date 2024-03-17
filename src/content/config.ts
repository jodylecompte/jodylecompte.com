import { defineCollection } from 'astro:content';
import { z } from 'zod';

const postCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // slug: z.string(),
    postedDate: z.date(),
    // post: z.string(),
  }),
});

export const collections = {
  'posts': postCollection,
};
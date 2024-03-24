import partytown from '@astrojs/partytown'
import tailwind from "@astrojs/tailwind";

import { defineConfig } from 'astro/config';
export default defineConfig({
  integrations: [
    tailwind(),
  	partytown({
			config: {
			  forward: ["dataLayer.push"],
			},
		}),]
});
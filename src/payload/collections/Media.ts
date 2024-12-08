import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['link'],
        },
      }),
    },
  ],
}

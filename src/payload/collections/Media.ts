import { slateEditor } from '@payloadcms/richtext-slate'
import type { CollectionConfig } from 'payload/types'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

const upload = {
  staticURL: '/media',
  staticDir: 'media',
  disableLocalStorage: true,
  adapter: cloudStorage({
    config: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    }
  })
};

export const Media: CollectionConfig = {
  slug: 'media',
  upload,
  access: {
    read: () => true,
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

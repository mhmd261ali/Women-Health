import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'Blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'tip',
      type: 'string',
      title: 'tip',
    }),
    defineField({
      name: 'tip_date',
      type: 'date',
      title: 'tip Date',
    }),
    defineField({
      name: 'tip_category',
      type: 'string',
      title: 'tip Category',
    }),
    defineField({
      name: 'hook',
      type: 'text',
      title: 'Hook',
      description:
        'Short teaser shown on the blog card when there is no Instagram link. Full tip Description is shown on the detail page.',
      rows: 3,
    }),
    defineField({
      name: 'tip_description',
      type: 'text',
      title: 'tip Description',
      description: 'Full article content shown on the Read more detail page.',
      rows: 8,
    }),
    defineField({
      name: 'instagram_url',
      type: 'url',
      title: 'Instagram Post URL',
      description:
        'Optional link to a related Instagram post. When set, the card shows Instagram button and description. When empty, the card shows the Hook and a Read more button.',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
  ],
})

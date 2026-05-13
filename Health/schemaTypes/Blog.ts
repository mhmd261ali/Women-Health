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
      name: 'tip_description',
      type: 'string',
      title: 'tip Description',
    }),
  ],
})

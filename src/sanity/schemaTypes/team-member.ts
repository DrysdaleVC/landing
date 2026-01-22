import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "team-member",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "position",
      type: "text",
    }),
    defineField({
      name: "photoDark",
      type: "image",
    }),
    defineField({
      name: "photoLight",
      type: "image",
    }),
    defineField({
      name: "linkedinUrl",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      order: "order",
      media: "photoLight",
    },
    prepare({ title, subtitle, order, media }) {
      return {
        title: `${order !== undefined ? `${order}. ` : ""}${title || "Untitled"}`,
        subtitle,
        media,
      };
    },
  },
});

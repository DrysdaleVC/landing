import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "team-member",
  title: "Team Member",
  type: "document",
  fields: [
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
});

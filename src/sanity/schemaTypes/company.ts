import { defineField, defineType } from "sanity";

export const companyType = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "description",
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

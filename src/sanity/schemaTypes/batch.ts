import { defineField, defineType } from "sanity";

export const batchType = defineType({
  name: "batch",
  title: "Batch",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "companies",
      title: "Companies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "company" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      year: "year",
    },
    prepare({ year }) {
      return {
        title: `${year} Batch`,
      };
    },
  },
  orderings: [
    {
      title: "Year (Newest)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Year (Oldest)",
      name: "yearAsc",
      by: [{ field: "year", direction: "asc" }],
    },
  ],
});

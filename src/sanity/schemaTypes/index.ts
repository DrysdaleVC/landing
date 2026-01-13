import { type SchemaTypeDefinition } from "sanity";
import { companyType } from "./company";
import { teamMemberType } from "./team-member";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [companyType, teamMemberType],
};

import { type SchemaTypeDefinition } from "sanity";
import { batchType } from "./batch";
import { companyType } from "./company";
import { teamMemberType } from "./team-member";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [batchType, companyType, teamMemberType],
};

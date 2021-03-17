/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateStartup
// ====================================================

export interface CreateStartup_createStartup_sections_items {
  __typename: "Item";
  id: string;
  label: string;
  status: boolean;
}

export interface CreateStartup_createStartup_sections {
  __typename: "Section";
  id: string;
  label: string;
  items: CreateStartup_createStartup_sections_items[];
}

export interface CreateStartup_createStartup {
  __typename: "Card";
  id: string;
  label: string;
  sections: CreateStartup_createStartup_sections[];
}

export interface CreateStartup {
  createStartup: CreateStartup_createStartup | null;
}

export interface CreateStartupVariables {
  label?: string | null;
}

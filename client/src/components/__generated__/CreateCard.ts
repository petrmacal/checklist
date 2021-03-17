/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCard
// ====================================================

export interface CreateCard_createCard_sections_items {
  __typename: "Item";
  id: string;
  label: string;
  status: boolean;
}

export interface CreateCard_createCard_sections {
  __typename: "Section";
  id: string;
  label: string;
  items: CreateCard_createCard_sections_items[];
}

export interface CreateCard_createCard {
  __typename: "Card";
  id: string;
  label: string;
  sections: CreateCard_createCard_sections[];
}

export interface CreateCard {
  createCard: CreateCard_createCard | null;
}

export interface CreateCardVariables {
  label?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchCards
// ====================================================

export interface FetchCards_fetchCards_sections_items {
  __typename: "Item";
  id: string;
  label: string;
  status: boolean;
}

export interface FetchCards_fetchCards_sections {
  __typename: "Section";
  id: string;
  label: string;
  items: FetchCards_fetchCards_sections_items[];
}

export interface FetchCards_fetchCards {
  __typename: "Card";
  id: string;
  label: string;
  sections: FetchCards_fetchCards_sections[];
}

export interface FetchCards {
  fetchCards: FetchCards_fetchCards[] | null;
}

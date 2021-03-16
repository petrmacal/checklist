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
}

export interface FetchCards_fetchCards_sections {
  __typename: "Section";
  id: string;
  label: string;
  items: (FetchCards_fetchCards_sections_items | null)[];
}

export interface FetchCards_fetchCards {
  __typename: "Card";
  id: string;
  label: string;
  sections: (FetchCards_fetchCards_sections | null)[] | null;
}

export interface FetchCards {
  fetchCards: (FetchCards_fetchCards | null)[] | null;
}

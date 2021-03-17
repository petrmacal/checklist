/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CardProps
// ====================================================

export interface CardProps_sections_items {
  __typename: "Item";
  id: string;
  label: string;
  status: boolean;
}

export interface CardProps_sections {
  __typename: "Section";
  id: string;
  label: string;
  items: CardProps_sections_items[];
}

export interface CardProps {
  __typename: "Card";
  id: string;
  label: string;
  sections: CardProps_sections[];
}

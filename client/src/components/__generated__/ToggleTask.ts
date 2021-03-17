/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleTask
// ====================================================

export interface ToggleTask_toggleTask {
  __typename: "Item";
  status: boolean;
  id: string;
}

export interface ToggleTask {
  toggleTask: ToggleTask_toggleTask | null;
}

export interface ToggleTaskVariables {
  cardId: string;
  taskId: string;
}

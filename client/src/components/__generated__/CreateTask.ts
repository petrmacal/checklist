/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTask
// ====================================================

export interface CreateTask_createTask {
  __typename: "Item";
  label: string;
  status: boolean;
  id: string;
}

export interface CreateTask {
  createTask: CreateTask_createTask;
}

export interface CreateTaskVariables {
  cardId: string;
  sectionId: string;
  label?: string | null;
}

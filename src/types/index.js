// @flow
export type $id = number | string

export type $entity = {
  id: $id
}

export type $entities = {[key: string]: $entity[]}

export type $entityActionsCreator = {
  get?: (entity: $entity)=>any,
}

export type $entityActionsCreatorGenerator = (entityName: string)=>$entityActionsCreator

export type $entityOptions = {
  [key: $id]: {
    actionName?: string,
  }
}

export type $entitiesOptions = (entityName: string, id: $id)=>$entityOptions

export type $relationships = {
  [key: string]: {
    [key: string]: {id: $id, value: $id | $id[]}[]
  }
}

type $relationshipActionsCreator = {
  create?: (relationshipName: string, id: $id, value: $id | $id[])=>any
}

export type $relationshipsActionsCreatorGenerator = (entityName: string)=>$relationshipActionsCreator

export type $relationshipOptions = {
  [key: $id]: {
    actionName?: string,
  }
}

export type $relationshipsOptions = (entityName: string, relationshipName: string, id: $id)=>$relationshipOptions
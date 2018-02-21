import createNormerActionCreators from 'normer-actions'
import { batchActions } from 'redux-batched-actions'
import { createAction } from 'redux-actions'

import schema from '../schemas'
import pagesSchema from '../schemas/pages'

const addTodo = createAction('add todo entity')
const addHomePageRelationship = createAction('add home page relationship')

const entityActionsCreatorGenerator = (entityName, id)=>({
  get: (ent)=>addTodo(ent),
})

const relationshipActionsCreatorGenerator = (entityName)=>({
  create: (relationshipName, id, value)=>addHomePageRelationship(value),
})

const normerActionCreators = createNormerActionCreators(entityActionsCreatorGenerator, relationshipActionsCreatorGenerator, schema)

export default (input)=>batchActions(normerActionCreators({
  todos: [input]
}, 'pages', {startingSchema: pagesSchema.home}))
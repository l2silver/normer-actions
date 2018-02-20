# normer-actions

[![Build Status](https://travis-ci.org/l2silver/normer-actions.svg?branch=master)](https://travis-ci.org/l2silver/normer-actions)

A plugin that generates entity and relationship actions based on the normalized output of the normer plugin.

## Setup

```npm install normer normer-actions --save```

## Usage

```
import { relationshipTypes } from 'normer'
import createNormerActionsCreator from 'normer-actions'

const entityActionsCreatorGenerator = (entityName: string, id: string | number)=>{
  get: (entity)=>({
    type: `${entityName}/get`,
    payload: entity,
  }),
  ...
}

const relationshipActionsCreatorGenerator = (entityName: string, relationshipName: string, id: string | number)=>{
  create: (value)=>({
    type: `${entityName}/${relationshipName}/create`,
    payload: {id, value},
  }),
  ...
}

const normerSchema = {
  users: {
    modifier: ({friends, ...props})=>props,
    relationships: [{
      entityName: 'users',
      name: 'friends',
      type: relationshipTypes.MANY,
    }]
  }
}

const normerActionsCreator = createNormerActionsCreator(
  entityActionsCreatorGenerator,
  relationshipActionsCreatorGenerator,
  normerSchema
);

const input = {
  id: 1,
  name: 'Loyd',
  friends: [{
    id: 2,
    name: 'Harry'
  }]
}

const normerActions = normerActionsCreator(input, 'users')

console.log(normerActions)
/*
[
  {
    type: 'users/get',
    payload: {
      id: 1,
      name: 'Loyd',
    }
  },
  {
    type: 'users/get',
    payload: {
      id: 2,
      name: 'Harry',
    }
  },
  {
    type: 'users/friends/create',
    payload: {
      id: 1,
      value: [2],
    }
  },
]
*/

```

## Why is this necessary

There are a lot of normalizers on npm, and they all normalize very well, most particularly, normalizr. The trick is how to use that normalized data. For many redux users, as far as I know, this requires a custom approach. I wanted to abstract away some of that customization, but at the same time, leave the plugin open to almost any configuration.

## How it works

The basic idea is that normer-actions process a deeply nested object using the normer library's normalizing capabilities, and then parse the results into easy to use actions. The normer-actions library creates these actions through separate entity and relationship action creators. Action creators generator => action creators => actions. An action creator generator will return an object of action creator functions.

Entity action creator object
```
{
  get: (ent)=>({...}),
  ...
}
```

Relationship action creator object
```
{
  create: ({id, value})=>({...}),
  ...
}
```

The get action creator and create action creator are the default creators for the respective entity and relationship action creators.

## Advanced Features: Options

The third argument of the normerActionsCreator (ie. the resulting function when calling the createNormerActionsCreator) is an options object with the following properties:

```
entityActionsCreator(input, entityName, options)
```

### startingSchema

```
const options = {
  startingSchema: {
    idFunc: ()=>'pages'
  }
}
```

The starting schema is a normer concept, and it allows you to pass in the exact starting schema to be used when parsing a deeply nested object. Once the object goes through the first parse, it reverts back to using the regular schema for the remainder parsings.

### entity

```
const options = {
  entity: (entityName, id)=>{
    actionName: 'create'
  }
}
```

A function that takes the current entityName and id and returns an object. Currently, there is only one option, actionName, which allows you to change which actionCreator is called.

### relationship

```
const options = {
  relationship: (entityName, relationshipName, id)=>{
    actionName: 'create'
  }
}
```

A function that takes the current entityName, relationshipName and id and returns an object. Currently, there is only one option, actionName, which allows you to change which actionCreator is called.

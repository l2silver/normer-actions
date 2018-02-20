// @flow
import getActions from '.';
import { relationshipTypes } from 'normer';

describe('getActions', () => {

  const relationshipActionsCreatorGenerator = (entityName, name, id)=>({
    users: {
      create: (value) => ({ payload: { name, id, value } }),
      concat: (value) => ({
        payload: { name, id, value },
        type: 'concat'
      })
    }
  }[entityName])

  const entityActionMap = {
    users: {
      get: entity => ({ payload: entity })
    }
  };
  const entityActionCreatorGenerator = (entityName)=>entityActionMap[entityName]

  const input = {
    name: 'John',
    id: 1,
    friends: [2]
  }
  it('returns array of actions', () => {
    const erschemaAction = getActions(entityActionCreatorGenerator, relationshipActionsCreatorGenerator, {
      users: {
        relationships: [{
          name: 'friends',
          entityName: 'users',
          type: relationshipTypes.MANY,
        }]
      }
    })
    expect(
      erschemaAction(input, 'users')
    ).toEqual([
      { payload: { name: 'John', id: 1, friends: [2] } },
      { payload: {id: 1, name: 'friends', value: [2]}}
    ]);
  });
});
// @flow
import getRelationshipActions from '.';

describe('getRelationshipActions', () => {
  const relationships = {
    users: {
      friends: [{
        id: 1, value: [2]
      }]
    }
  };
  
  const relationshipActionsCreatorGenerator = (entityName)=>({
    users: {
      create: (name, id, value) => ({ payload: { name, id, value } }),
      concat: (name, id, value) => ({
        payload: { name, id, value },
        type: 'concat'
      })
    }
  }[entityName])
  it('normal', () => {
    expect(
      getRelationshipActions(relationships, relationshipActionsCreatorGenerator)
    ).toEqual([{ payload: { name: 'friends', id: 1, value: [2] } }]);
  });
  it('options', () => {
    const options = {
      users: { friends: { [1]: { actionName: 'concat' } } }
    }
    const optionsGenerator = (entityName, relationshipName)=>options[entityName][relationshipName]
    expect(
      getRelationshipActions(relationships, relationshipActionsCreatorGenerator, optionsGenerator)
    ).toEqual([
      { type: 'concat', payload: { name: 'friends', id: 1, value: [2] } }
    ]);
  });
});
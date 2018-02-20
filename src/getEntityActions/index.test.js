// @flow
import getEntityActions from '.';

describe('getEntityActions', () => {
  const entities = {
    users: [
      {
        id: 1,
        name: 'John'
      }
    ]
  };
  const entityActionMap = {
    users: {
      get: entity => ({ payload: entity })
    }
  };
  const entityActionCreatorGenerator = (entityName)=>entityActionMap[entityName]
  it('normal', () => {
    expect(getEntityActions(entities, entityActionCreatorGenerator)).toEqual([
      { payload: { id: 1, name: 'John' } }
    ]);
  });
});
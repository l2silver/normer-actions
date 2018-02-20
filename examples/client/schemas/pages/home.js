import {relationshipTypes} from 'normer';

export default {
  relationships: [{
    entityName: 'todos',
    type: relationshipTypes.MANY,
  }]
}
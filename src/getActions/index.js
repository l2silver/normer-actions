// @flow
import normalize, {validateSchema} from 'normer';
import { get } from 'lodash';
import getEntityActions from '../getEntityActions';
import getRelationshipActions from '../getRelationshipActions';

import type { $schema, $entitySchema } from 'normer/types';
import type { $entityOptions, $relationshipOptions, $entityActionsCreatorGenerator, $relationshipsActionsCreatorGenerator } from '../types'

type $options = {
  startingSchema?: $entitySchema,
  entity?: $entityOptions,
  relationship?: $relationshipOptions,
}

export default function getActions(
  entityActionGenerator: $entityActionsCreatorGenerator,
  relationshipActionGenerator: $relationshipsActionsCreatorGenerator,
  schema: $schema
) {
  validateSchema(schema)
  return (input: Object, entityName: string, options: $options = {}) => {
    const { startingSchema } = options;
    const { entities, relationships } = normalize(
      input,
      entityName,
      schema,
      startingSchema
    );
    const entityActions = getEntityActions(
      entities,
      entityActionGenerator,
      get(options, 'entity')
    );
    const relationshipActions = getRelationshipActions(
      relationships,
      relationshipActionGenerator,
      get(options, 'relationship')
    );
    return entityActions.concat(relationshipActions);
  };
}

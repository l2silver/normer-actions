// @flow

import { get } from 'lodash';

import type { $relationships, $relationshipsActionsCreatorGenerator, $relationshipsOptions } from '../types';

const defaultOptionsGenerator = ()=>({});

export default function getRelationshipActions (
  relationships: $relationships,
  relationshipActionsCreatorGenerator: $relationshipsActionsCreatorGenerator,
  optionsGenerator?: $relationshipsOptions = defaultOptionsGenerator,
) {
  return Object.keys(relationships).reduce((finalResult, entityName) => {
    const relationshipMap = relationships[entityName];
    return Object.keys(relationshipMap).reduce((fR, relationshipName) => {
      const idValueArray = relationshipMap[relationshipName];
      return idValueArray.reduce((fFR, {id, value}) => {
        const options = optionsGenerator(entityName, relationshipName, id);
        const relationshipActions = relationshipActionsCreatorGenerator(entityName);
        fFR.push(
          relationshipActions[
            get(options, `${id}.actionName`, 'create')
          ](relationshipName, id, value)
        );
        return fFR;
      }, fR);
    }, finalResult);
  }, []);
};

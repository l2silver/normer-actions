// @flow

import { get } from 'lodash'

import type {$entities, $entityActionsCreatorGenerator, $entitiesOptions} from '../types';

const defaultOptionsGenerator = ()=>({});

export default function getEntityActions (entitiesMap: $entities, entityActionsCreatorGenerator: $entityActionsCreatorGenerator, optionsGenerator?: $entitiesOptions = defaultOptionsGenerator) {
  return Object.keys(entitiesMap).reduce((finalResult, entityName) => {
    const entityActions = entityActionsCreatorGenerator(entityName);
    const entities = entitiesMap[entityName];
    return entities.reduce((fR, entity) => {
      const options = optionsGenerator(entityName, entity.id);
      finalResult.push(
        entityActions[get(options, `${entity.id}.actionName`, 'get')](
          entity
        )
      );
      return finalResult;
    }, finalResult);
  }, []);
};
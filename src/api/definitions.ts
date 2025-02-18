import { get, put } from './request';
import type { UIParam } from '../interface/application';
import { definition } from './productionLink';
import { getDomain } from '../utils/common';

const baseURLOject = getDomain();
const base = baseURLOject.APIBASE;

export function getDefinitionsList(params: {
  definitionType: 'component' | 'trait' | 'workflowstep' | 'policy';
  queryAll: boolean;
}) {
  const url = base + definition;
  const { definitionType, queryAll } = params;
  return get(url, { params: { type: definitionType, queryAll } }).then((res) => res);
}

export function detailDefinition(params: { name: string; type: string }) {
  const url = base + `${definition}/${params.name}`;
  return get(url, { params: { type: params.type } }).then((res) => res);
}

export function updateDefinitionStatus(params: {
  name: string;
  hiddenInUI: boolean;
  type: string;
}) {
  const url = base + `${definition}/${params.name}/status`;
  const paramsData = {
    hiddenInUI: params.hiddenInUI,
    type: params.type,
  };
  return put(url, paramsData).then((res) => res);
}

export function updateUISchema(params: {
  name: string;
  definitionType: string;
  uiSchema: UIParam[] | undefined;
}) {
  const url = base + `${definition}/${params.name}/uischema`;
  const paramsData = {
    type: params.definitionType,
    uiSchema: params.uiSchema,
  };
  return put(url, paramsData).then((res) => res);
}

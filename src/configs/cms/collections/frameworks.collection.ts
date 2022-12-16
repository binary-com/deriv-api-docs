import {
  ANGULAR_FRAMEWORK_COLLECTION_NAME,
  REACT_FRAMEWORK_COLLECTION_NAME,
  SOLIDJS_FRAMEWORK_COLLECTION_NAME,
  SVELTE_FRAMEWORK_COLLECTION_NAME,
  VUE_FRAMEWORK_COLLECTION_NAME,
} from '../constants';
import DocCollection from './docs-collection.class';
import { CmsCollection } from 'netlify-cms-core';

const react_framework_collection: CmsCollection = new DocCollection(
  REACT_FRAMEWORK_COLLECTION_NAME,
  'React Documentations',
  'React Documentation',
  'docs/frameworks/react',
);

const angular_framework_collection: CmsCollection = new DocCollection(
  ANGULAR_FRAMEWORK_COLLECTION_NAME,
  'Angular Documentations',
  'Angular Documentation',
  'docs/frameworks/angular',
);

const solidjs_framework_collection: CmsCollection = new DocCollection(
  SOLIDJS_FRAMEWORK_COLLECTION_NAME,
  'Solidjs Documentations',
  'Solidjs Documentation',
  'docs/frameworks/solidjs',
);

const svelte_framework_collection: CmsCollection = new DocCollection(
  SVELTE_FRAMEWORK_COLLECTION_NAME,
  'Svelte Documentations',
  'Svelte Documentation',
  'docs/frameworks/svelte',
);

const vue_framework_collection: CmsCollection = new DocCollection(
  VUE_FRAMEWORK_COLLECTION_NAME,
  'Vue Documentations',
  'Vue Documentation',
  'docs/frameworks/vue',
);

const frameworks_collections = [
  react_framework_collection,
  angular_framework_collection,
  solidjs_framework_collection,
  svelte_framework_collection,
  vue_framework_collection,
];

export default frameworks_collections;

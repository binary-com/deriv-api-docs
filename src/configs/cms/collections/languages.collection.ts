import {
  DART_LANG_COLLECTION_NAME,
  JS_LANG_COLLECTION_NAME,
  PYTHON_LANG_COLLECTION_NAME,
  TS_LANG_COLLECTION_NAME,
} from '../constants';
import DocCollection from './docs-collection.class';
import { CmsCollection } from 'netlify-cms-core';

const js_lang_collection: CmsCollection = new DocCollection(
  JS_LANG_COLLECTION_NAME,
  'Javascript Documentations',
  'Javascript Documentation',
  'docs/languages/javascript',
);

const ts_lang_collection: CmsCollection = new DocCollection(
  TS_LANG_COLLECTION_NAME,
  'Typescript Documentations',
  'Typescript Documentation',
  'docs/languages/typescript',
);
const dart_lang_collection: CmsCollection = new DocCollection(
  DART_LANG_COLLECTION_NAME,
  'Dart Documentations',
  'Dart Documentation',
  'docs/languages/dart',
);

const python_lang_collection: CmsCollection = new DocCollection(
  PYTHON_LANG_COLLECTION_NAME,
  'Python Documentations',
  'Python Documentation',
  'docs/languages/python',
);

const languages_collections = [
  js_lang_collection,
  ts_lang_collection,
  dart_lang_collection,
  python_lang_collection,
];
export default languages_collections;

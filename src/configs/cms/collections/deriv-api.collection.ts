import {
  FLUTTER_CLIENT_COLLECTION_NAME,
  PYTHON_CLIENT_COLLECTION_NAME,
  TS_CLIENT_COLLECTION_NAME,
} from '../constants';
import DocCollection from './docs-collection.class';
import { CmsCollection } from 'netlify-cms-core';

const typescript_client_collection: CmsCollection = new DocCollection(
  TS_CLIENT_COLLECTION_NAME,
  'Typescript Client Documentations',
  'Typescript Client Documentation',
  'docs/deriv-api/typescript',
);

const python_client_collection: CmsCollection = new DocCollection(
  PYTHON_CLIENT_COLLECTION_NAME,
  'Python Client Documentations',
  'Python Client Documentation',
  'docs/deriv-api/python',
);

const flutter_client_collection: CmsCollection = new DocCollection(
  FLUTTER_CLIENT_COLLECTION_NAME,
  'Flutter Client Documentations',
  'Flutter Client Documentation',
  'docs/deriv-api/flutter',
);

const derivapi_clients_collection = [
  typescript_client_collection,
  python_client_collection,
  flutter_client_collection,
];

export default derivapi_clients_collection;

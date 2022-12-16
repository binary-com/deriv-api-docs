import { GUIDES_COLLECTION_NAME } from '../constants';
import DocCollection from './docs-collection.class';
import { CmsCollection } from 'netlify-cms-core';

const guides_collection: CmsCollection = new DocCollection(
  GUIDES_COLLECTION_NAME,
  'Guides Documentations',
  'Guide Documentation',
  'docs/guides',
);

export default guides_collection;

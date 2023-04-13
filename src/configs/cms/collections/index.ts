import type { CmsCollection } from 'netlify-cms-core';
import {
  CLIENT_LIBRARIES_COLLECTION_NAME,
  CONCEPTS_COLLECTION_NAME,
  FAQ_POST_COLLECTION_NAME,
  FRAMEWORKS_COLLECTION_NAME,
  GUIDES_COLLECTION_NAME,
  LANGUAGES_COLLECTION_NAME,
  TERMINOLOGY_COLLECTION_NAME,
} from '../constants';
import DocCollection from './docs-collection.class';
import SinglePagesCollection from './singlepages.collection';

const faq_collection: CmsCollection = new DocCollection(
  FAQ_POST_COLLECTION_NAME,
  'Frequently Asked Questions',
  'Question',
  'docs/faq',
);

const core_concepts_collection: CmsCollection = new DocCollection(
  CONCEPTS_COLLECTION_NAME,
  'Core Concepts',
  'Concept',
  'docs/core-concepts',
);

const terminology_collection: CmsCollection = new DocCollection(
  TERMINOLOGY_COLLECTION_NAME,
  'Terminologies',
  'Terminology',
  'docs/terminology',
);

const languages_collection: CmsCollection = new DocCollection(
  LANGUAGES_COLLECTION_NAME,
  'Languages',
  'Language',
  'docs/languages',
);

const frameworks_collection: CmsCollection = new DocCollection(
  FRAMEWORKS_COLLECTION_NAME,
  'Frameworks',
  'Framework',
  'docs/frameworks',
);

const client_libraries_collection: CmsCollection = new DocCollection(
  CLIENT_LIBRARIES_COLLECTION_NAME,
  'Client Libraries',
  'Client Librariy',
  'docs/client-libraries',
);

const guides_collection: CmsCollection = new DocCollection(
  GUIDES_COLLECTION_NAME,
  'Guides',
  'Guide',
  'docs/guides',
);

const cms_collections: CmsCollection[] = [
  SinglePagesCollection,
  terminology_collection,
  core_concepts_collection,
  languages_collection,
  frameworks_collection,
  client_libraries_collection,
  guides_collection,
  faq_collection,
];

export default cms_collections;

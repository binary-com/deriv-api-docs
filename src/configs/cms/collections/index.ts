import type { CmsCollection } from "netlify-cms-core";
import {
  CONCEPTS_COLLECTION_NAME,
  FAQ_POST_COLLECTION_NAME,
} from "../constants";
import BlogPostCollection from "./blog.collection";
import derivapi_clients_collection from "./deriv-api.collection";
import DocCollection from "./docs-collection.class";
import frameworks_collections from "./frameworks.collection";
import guides_collection from "./guides.collection";
import languages_collections from "./languages.collection";
import SinglePagesCollection from "./singlepages.collection";

const faq_collection: CmsCollection = new DocCollection(
  FAQ_POST_COLLECTION_NAME,
  "Frequently Asked Questions",
  "Question",
  "docs/faq"
);

const core_concepts_collection: CmsCollection = new DocCollection(
  CONCEPTS_COLLECTION_NAME,
  "Core Concepts",
  "Concept",
  "docs/core-concepts"
);

const cms_collections: CmsCollection[] = [
  SinglePagesCollection,
  BlogPostCollection,
  core_concepts_collection,
  ...languages_collections,
  ...frameworks_collections,
  ...derivapi_clients_collection,
  guides_collection,
  faq_collection,
];

export default cms_collections;

import { CmsCollection } from 'netlify-cms-core';
import { default_doc_fields } from './docs-collection.class';

const SinglePagesCollection: CmsCollection = {
  name: 'pages',
  label: 'Single Pages',
  publish: false,
  files: [
    {
      name: 'intro',
      label: 'Introduction',
      file: 'docs/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'app_reg',
      label: 'How to setup an Application',
      file: 'docs/how_to_setup_an_app.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'language-intro',
      label: 'Language Introduction',
      file: 'docs/languages/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'dervi-api-intro',
      label: 'Deriv API Introduction',
      file: 'docs/deriv-api/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'frameworks-intro',
      label: 'Frameworks Introduction',
      file: 'docs/frameworks/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'guides-intro',
      label: 'Guides Introduction',
      file: 'docs/guides/intro.md',
      fields: [...default_doc_fields],
    },
  ],
};

export default SinglePagesCollection;

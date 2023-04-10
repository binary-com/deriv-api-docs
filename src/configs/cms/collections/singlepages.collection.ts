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
      name: 'language-intro',
      label: 'Language Introduction',
      file: 'docs/languages/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'client-libraries-intro',
      label: 'Client Libraries Introduction',
      file: 'docs/client-libraries/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'frameworks-intro',
      label: 'Frameworks Introduction',
      file: 'docs/frameworks/intro.md',
      fields: [...default_doc_fields],
    },
    {
      name: 'app_reg',
      label: 'Application Setup',
      file: 'docs/application_setup.md',
      fields: [...default_doc_fields],
    },
  ],
};

export default SinglePagesCollection;

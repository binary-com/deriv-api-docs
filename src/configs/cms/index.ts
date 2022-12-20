import { InitOptions } from 'netlify-cms-core';
import cms_backend from './backend.config';
import cms_collections from './collections';

const CmsConfig: InitOptions = {
  config: {
    load_config_file: false,
    backend: cms_backend,
    media_folder: 'static/img',
    public_folder: '/img/',
    publish_mode: 'editorial_workflow',
    collections: cms_collections,
    slug: {
      clean_accents: true,
      sanitize_replacement: '-',
      encoding: 'unicode',
    },
  },
};

export default CmsConfig;

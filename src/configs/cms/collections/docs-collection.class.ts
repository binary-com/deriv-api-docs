import type { CmsCollection, CmsField } from 'netlify-cms-core';

export const default_doc_fields: CmsField[] = [
  {
    name: 'title',
    required: true,
    hint: "Title of the document, this is required and slug of the page will be created based on it's value",
    label: 'Title',
    widget: 'string',
  },
  {
    name: 'hide_title',
    label: 'Hide Title',
    hint: 'By Default the title will be present on the document page, you can hide it with this',
    widget: 'boolean',
    required: false,
    default: false,
  },
  {
    name: 'draft',
    label: 'Draft',
    required: false,
    hint: 'A boolean flag to indicate that a document is a work-in-progress. Draft documents will only be displayed during development.',
    widget: 'boolean',
    default: false,
  },
  {
    name: 'sidebar_label',
    label: 'Sidebar Label',
    required: true,
    hint: 'The text shown in the document sidebar for this document, if not provided title will be used',
    widget: 'string',
  },
  {
    name: 'sidebar_position',
    required: true,
    hint: 'Controls the position of a doc inside the generated sidebar slice.',
    label: 'Sidebar Position',
    widget: 'number',
  },
  {
    name: 'body',
    required: true,
    hint: 'The actual content for the documentation',
    label: 'Body',
    widget: 'markdown',
  },
  {
    name: 'tags',
    required: true,
    label: 'Docusaurus Tags',
    hint: 'Based on these documents will be categorized',
    widget: 'list',
  },
  {
    name: 'keywords',
    required: true,
    label: 'Meta Keywords',
    hint: 'SEO Meta Keywords',
    widget: 'list',
  },
  {
    name: 'description',
    required: true,
    label: 'Meta Description',
    hint: 'SEO Meta Description',
    widget: 'string',
  },
  {
    name: 'image',
    required: false,
    label: 'Thumbnail Image',
    hint: 'Cover or thumbnail image that will be used when displaying the link to your post.',
    widget: 'image',
  },
];

class DocCollection implements CmsCollection {
  create = true;
  delete = true;
  meta = { path: { widget: 'string', label: 'Path', index_file: 'index' } };
  publish = false;
  slug = '{{slug}}';
  fields: CmsField[];
  nested = {
    depth: 10,
  };
  sortable_fields = ['sidebar_position', 'commit_date', 'title', 'commit_author'];
  constructor(
    public name: string,
    public label: string,
    public label_singular: string,
    public folder: string,
    public private_fields?: CmsField[],
  ) {
    this.fields = [...default_doc_fields];
    if (private_fields) {
      this.fields = this.fields.concat(private_fields);
    }
  }
}

export default DocCollection;

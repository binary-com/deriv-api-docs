import type { CmsCollection, CmsField } from "netlify-cms-core";

export const default_doc_fields: CmsField[] = [
  {
    name: "title",
    required: true,
    label: "Title",
    widget: "string",
  },
  {
    name: "sidebar_label",
    required: true,
    label: "Sidebar Label",
    widget: "string",
  },
  {
    name: "sidebar_position",
    required: true,
    label: "Sidebar Position",
    widget: "number",
  },
  { name: "body", label: "Body", widget: "markdown" },
  { name: "tags", label: "Tags", widget: "list" },
  { name: "keywords", label: "Keywords", widget: "list" },
];

class DocCollection implements CmsCollection {
  create = true;
  delete = true;
  meta = { path: { widget: "string", label: "Path", index_file: "index" } };
  publish = false;
  slug = "{{slug}}";
  fields: CmsField[];
  nested = {
    depth: 10,
  };
  sortable_fields = [
    "sidebar_position",
    "commit_date",
    "title",
    "commit_author",
  ];
  // I don't know if we need this or not, but for now let's keep it here, it's gonna add more detail into the item in cms
  // summary =
  //   "{{title | upper}} - Sidebar Position: {{sidebar_position}} written by {{commit_author}} on {{commit_date}}";
  constructor(
    public name: string,
    public label: string,
    public label_singular: string,
    public folder: string,
    public private_fields?: CmsField[]
  ) {
    this.fields = [...default_doc_fields];
    if (private_fields) {
      this.fields = this.fields.concat(private_fields);
    }
  }
}

export default DocCollection;

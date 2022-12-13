import { CmsCollection } from "netlify-cms-core";
import { BLOG_POST_COLLECTION_NAME } from "../constants";

const BlogPostCollection: CmsCollection = {
  name: BLOG_POST_COLLECTION_NAME,
  label: "Blog Posts",
  folder: "blog",
  create: true,
  delete: true,
  extension: "md",
  publish: false,
  slug: "{{slug}}",
  summary:
    "{{title | upper }} - {{date | date('YYYY-MM-DD')}} – {{body | truncate(20, '***')}}",
  fields: [
    {
      name: "title",
      required: true,
      hint: "Title of the document",
      label: "Title",
      widget: "string",
    },
    {
      name: "body",
      label: "Body",
      required: true,
      hint: "Actual Content of the Blog Post",
      widget: "markdown",
    },
    {
      name: "slug",
      label: "Slug",
      required: false,
      hint: "URL Slug, this will affect the generated URL for this Blog Post,",
      widget: "string",
    },
    {
      name: "tags",
      label: "Tags",
      allow_add: true,
      required: true,
      hint: "Tags for easier search, this will be used inside the Documentation Platform",
      widget: "list",
    },
    {
      name: "keywords",
      label: "Keywords",
      allow_add: true,
      required: true,
      hint: "Keywords meta tag for the document page, for search engines.",
      widget: "list",
    },
    {
      name: "authors",
      label: "Authors",
      widget: "hidden",
      fields: [
        { name: "name", label: "Name", widget: "string" },
        { name: "title", label: "Title", widget: "string" },
        { name: "url", label: "URL", widget: "string" },
        { name: "image_url", label: "ImageURL", widget: "string" },
      ],
    },
  ],
};

export default BlogPostCollection;

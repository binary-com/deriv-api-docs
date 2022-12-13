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
  fields: [
    {
      name: "title",
      required: true,
      hint: "Title of the document, this is required and slug of the page will be created based on it's value",
      label: "Title",
      widget: "string",
    },
    {
      name: "draft",
      label: "Draft",
      hint: "A boolean flag to indicate that the blog post is work-in-progress. Draft blog posts will only be displayed during development.",
      widget: "boolean",
      default: false,
    },
    {
      name: "body",
      required: true,
      hint: "The actual content for the documentation",
      label: "Body",
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
      required: true,
      label: "Docusaurus Tags",
      hint: "Based on these documents will be categorized",
      widget: "list",
    },
    {
      name: "keywords",
      required: true,
      label: "Meta Keywords",
      hint: "SEO Meta Keywords",
      widget: "list",
    },
    {
      name: "description",
      required: true,
      label: "Meta Description",
      hint: "SEO Meta Description",
      widget: "string",
    },
    {
      name: "image",
      required: false,
      label: "Thumbnail Image",
      hint: "Cover or thumbnail image that will be used when displaying the link to your post.",
      widget: "image",
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

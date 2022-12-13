import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React, { useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CmsConfig from "../configs/cms";
import { InitOptions } from "netlify-cms-core";
import blog_presave_listener from "../configs/cms/eventlisteners/blog.presave";

const CMS = () => {
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      import("netlify-cms-app").then(({ default: CMS }) => {
        CMS.registerEventListener(blog_presave_listener);
        const init_options: InitOptions = { ...CmsConfig };

        // to test the collections setup we use the test-repo, nothing will be pushed to github and if you refresh the page
        // all the changes and added items will be removed.
        if (process.env.NODE_ENV === "development") {
          // init_options.config.backend.name = "test-repo";
          init_options.config.local_backend = true;
        }
        CMS.init(init_options);
      });
    }
  });
  return (
    <BrowserOnly>
      {() => {
        // netlify-cms will be rendered inside this div
        return <div id="nc-root" />;
      }}
    </BrowserOnly>
  );
};

export default CMS;

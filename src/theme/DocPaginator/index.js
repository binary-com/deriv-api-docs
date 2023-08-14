import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import RenderOfficialContents from '@site/src/components/RenderOfficialContents';
export default function DocPaginator(props) {
  const { previous, next } = props;
  return (
    <RenderOfficialContents>
      <nav
        className='pagination-nav docusaurus-mt-lg'
        aria-label={translate({
          id: 'theme.docs.paginator.navAriaLabel',
          message: 'Docs pages navigation',
          description: 'The ARIA label for the docs pagination',
        })}
      >
        {previous && (
          <PaginatorNavLink
            {...previous}
            subLabel={
              <Translate
                id='theme.docs.paginator.previous'
                description='The label used to navigate to the previous doc'
              >
                Previous
              </Translate>
            }
          />
        )}
        {next && (
          <PaginatorNavLink
            {...next}
            subLabel={
              <Translate
                id='theme.docs.paginator.next'
                description='The label used to navigate to the next doc'
              >
                Next
              </Translate>
            }
            isNext
          />
        )}
      </nav>
    </RenderOfficialContents>
  );
}

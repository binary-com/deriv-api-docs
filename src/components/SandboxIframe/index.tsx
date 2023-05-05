import React from 'react';

type TSandboxIframe = {
  sandbox: string;
};

// For sandbox iframes, scss modules don't work
// Inline css styling is used here instead
const SandboxIframe = ({ sandbox }: TSandboxIframe) => {
  const sandbox_url_attributes =
    '?autoresize=1&runonclick=1&codemirror=1&expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Findex.js&theme=darkveiw&view=split';
  return (
    <div className='sandbox-wrapper'>
      <iframe
        className='sandbox-iframe'
        src={`${sandbox}${sandbox_url_attributes}`}
        style={{
          width: '100%',
          height: '500px',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '50px',
        }}
        title='static'
        sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
        loading='lazy'
      />
    </div>
  );
};

export default SandboxIframe;

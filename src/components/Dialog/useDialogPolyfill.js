import React from 'react';

let dialogPolyfill = null;

if (window.HTMLDialogElement === undefined) {
  import('dialog-polyfill/dialog-polyfill.css');
}

export function useDialogPolyfill(ref) {
  React.useLayoutEffect(() => {
    if (window.HTMLDialogElement === undefined) {
      if (dialogPolyfill) {
        dialogPolyfill.registerDialog(ref.current);
      } else {
        import('dialog-polyfill').then((polyfill) => {
          polyfill.default.registerDialog(ref.current);
          dialogPolyfill = polyfill.default;
        });
      }
    }
  }, [ref]);
}

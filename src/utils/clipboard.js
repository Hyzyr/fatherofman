export const copyTextToClipboard = (text, _callback) => {
  navigator.clipboard.writeText(text).then(
    () => {
      if (_callback) _callback();
    },
    (err) => {
      console.error('Could not copy text: ', err);
    }
  );
};

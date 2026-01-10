import { HTMLElement } from 'node-html-parser';

export const extractInputValue = (root: HTMLElement, name: string) => {
  const input = root.querySelector(`input[name="${name}"]`);
  return input ? input.getAttribute('value') : null;
};

export const extractGridCallbackState = (root: HTMLElement) => {
  // Alternative: look for it in inline JavaScript
  const scripts = root.querySelectorAll('script');
  for (const script of scripts) {
    const scriptText = script.text;

    // Look for callbackState in various patterns
    const patterns = [
      /callbackState["\s:]+["']([^"']+)["']/i,
      /["']callbackState["']:\s*["']([^"']+)["']/i,
      /callbackState=["']([^"']+)["']/i,
    ];

    for (const pattern of patterns) {
      const match = scriptText.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
  }

  throw new Error('Could not find grid callback state');
};

export const extractHtmlFromCallbackResponse = (responseText: string) => {
  // Regex to match 'html':'...' or "html":"..."
  // Captures everything between the quotes, handling escaped characters
  const replaced = responseText.replace(/\\'/g, '___ESCAPED_SINGLE___');
  const regex = /'html':'([^']+)'/;

  const match = replaced.match(regex);

  if (!match) {
    throw new Error('HTML field not found');
  }

  // Get the captured HTML content
  return match[1].replace(/___ESCAPED_SINGLE___/g, "\\'");
};

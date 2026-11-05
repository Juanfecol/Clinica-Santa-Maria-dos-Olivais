/**
 * Helper utility to programmatically trigger the LeadConnector / GoHighLevel AI Chat Widget
 * Widget ID: 6aecef46ce7c96a75adc3f9a
 */
export function openLeadConnectorChat(): boolean {
  try {
    // 1. Direct API methods exposed by LeadConnector / HighLevel chat widget
    const win = window as any;
    if (win.leadConnector && typeof win.leadConnector.openChat === 'function') {
      win.leadConnector.openChat();
      return true;
    }
    if (win.chatWidget && typeof win.chatWidget.open === 'function') {
      win.chatWidget.open();
      return true;
    }
    if (win.LC_CHAT && typeof win.LC_CHAT.open === 'function') {
      win.LC_CHAT.open();
      return true;
    }

    // 2. Check for LeadConnector custom element or container
    const candidates = [
      'chat-widget',
      '#chat-widget',
      '[data-widget-id="6aecef46ce7c96a75adc3f9a"]',
      '.lc-chat-button',
      '.chat-widget-button',
      '#lc-chat-bubble',
      'button[aria-label*="chat" i]',
      'button[aria-label*="conversa" i]'
    ];

    for (const selector of candidates) {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) {
        if (el.shadowRoot) {
          const shadowBtn = el.shadowRoot.querySelector('button, [role="button"], .launcher') as HTMLElement | null;
          if (shadowBtn) {
            shadowBtn.click();
            return true;
          }
        }
        el.click();
        return true;
      }
    }

    // 3. Dispatch standard custom events used by LeadConnector loader
    window.dispatchEvent(new CustomEvent('open-chat-widget'));
    window.dispatchEvent(new CustomEvent('lc:open-chat'));
    window.dispatchEvent(new CustomEvent('toggle-chat-widget'));
    window.postMessage({ action: 'openChat', type: 'open-chat-widget' }, '*');

    return true;
  } catch (e) {
    console.warn('[LeadConnector Chat] Unable to trigger chat widget programmatically:', e);
    return false;
  }
}

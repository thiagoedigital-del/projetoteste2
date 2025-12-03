/**
 * Utilitário para rastrear eventos do Meta Pixel (Facebook Pixel)
 */

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

/**
 * Verifica se o Meta Pixel está carregado
 */
export function isMetaPixelLoaded(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof window.fbq === 'function';
}

/**
 * Rastreia um evento padrão do Meta Pixel
 * @param eventName Nome do evento (ex: 'ViewContent', 'AddToCart', 'Purchase')
 * @param params Parâmetros adicionais do evento
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (!isMetaPixelLoaded()) {
    console.warn('Meta Pixel não está carregado. Evento não será rastreado:', eventName);
    return;
  }

  try {
    window.fbq('track', eventName, params || {});
  } catch (error) {
    console.error('Erro ao rastrear evento do Meta Pixel:', error);
  }
}

/**
 * Rastreia um evento customizado do Meta Pixel
 * @param eventName Nome do evento customizado
 * @param params Parâmetros do evento
 */
export function trackCustomEvent(eventName: string, params?: Record<string, any>): void {
  if (!isMetaPixelLoaded()) {
    console.warn('Meta Pixel não está carregado. Evento customizado não será rastreado:', eventName);
    return;
  }

  try {
    window.fbq('trackCustom', eventName, params || {});
  } catch (error) {
    console.error('Erro ao rastrear evento customizado do Meta Pixel:', error);
  }
}

/**
 * Funções de conveniência para eventos comuns
 */
export const metaPixel = {
  /**
   * Rastreia visualização de conteúdo
   */
  viewContent: (contentName?: string, value?: number, currency?: string) => {
    trackEvent('ViewContent', {
      content_name: contentName,
      value,
      currency: currency || 'USD',
    });
  },

  /**
   * Rastreia adição ao carrinho
   */
  addToCart: (value?: number, currency?: string, contentName?: string) => {
    trackEvent('AddToCart', {
      value,
      currency: currency || 'USD',
      content_name: contentName,
    });
  },

  /**
   * Rastreia iniciação do checkout
   */
  initiateCheckout: (value?: number, currency?: string, contentName?: string) => {
    trackEvent('InitiateCheckout', {
      value,
      currency: currency || 'USD',
      content_name: contentName,
    });
  },

  /**
   * Rastreia compra/conversão
   */
  purchase: (value: number, currency?: string, contentName?: string, transactionId?: string) => {
    trackEvent('Purchase', {
      value,
      currency: currency || 'USD',
      content_name: contentName,
      transaction_id: transactionId,
    });
  },

  /**
   * Rastreia lead
   */
  lead: (contentName?: string, value?: number) => {
    trackEvent('Lead', {
      content_name: contentName,
      value,
    });
  },
};







"use client";

import { useEffect } from "react";
import { metaPixel, isMetaPixelLoaded } from "@/utils/meta-pixel";

interface PurchaseTrackerProps {
  value: number;
  currency?: string;
  contentName?: string;
  transactionId?: string;
}

export default function PurchaseTracker({ 
  value, 
  currency = 'USD', 
  contentName,
  transactionId 
}: PurchaseTrackerProps) {
  
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10; // Máximo de 5 segundos (10 * 500ms)
    
    // Aguardar o pixel carregar antes de rastrear
    const trackPurchase = () => {
      attempts++;
      
      if (isMetaPixelLoaded()) {
        metaPixel.purchase(value, currency, contentName, transactionId);
      } else if (attempts < maxAttempts) {
        // Tentar novamente após um pequeno delay
        setTimeout(trackPurchase, 500);
      } else {
        console.warn('Meta Pixel não carregou após múltiplas tentativas. Evento Purchase não foi rastreado.');
      }
    };

    // Aguardar um pouco antes de tentar rastrear
    const timeout = setTimeout(trackPurchase, 1000);
    
    return () => clearTimeout(timeout);
  }, [value, currency, contentName, transactionId]);

  return null;
}



"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq: any;
  }
}

const META_PIXEL_ID = "1285253525674648";

export default function MetaPixel() {
  useEffect(() => {
    // Verificar se já foi inicializado
    if (typeof window !== 'undefined' && !window.fbq) {
      window.fbq = function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      window.fbq.l = +new Date();
    }
  }, []);

  return (
    <>
      <Script
        id="meta-pixel"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.fbq) {
            try {
              window.fbq('init', META_PIXEL_ID);
              window.fbq('track', 'PageView');
            } catch (error) {
              console.error('Erro ao inicializar Meta Pixel:', error);
            }
          }
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

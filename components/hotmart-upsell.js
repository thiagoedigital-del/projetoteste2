"use client";

import Script from "next/script";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const upsellClass = "flex flex-auto justify-center items-center overflow-hidden -mr-3";
const blackClass = "scale-110 !max-h-48 upsell"

export default function HotmartUpsell({ black }) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1750);
  }, []);

  const initCheckout = () => {
    console.log('🔍 Tentando inicializar salesFunnel...');
    console.log('📍 URL atual:', window.location.href);
    console.log('🔑 Parâmetros da URL:', window.location.search);
    
    if (typeof checkoutElements === 'undefined') {
      console.error('❌ checkoutElements não está disponível.');
      setError(true);
      // Tenta novamente após o script carregar
      setTimeout(() => {
        if (typeof checkoutElements !== 'undefined') {
          console.log('✅ checkoutElements carregado, tentando novamente...');
          initCheckout();
        }
      }, 2000);
      return;
    }

    // Verifica se há parâmetro fsid na URL
    const urlParams = new URLSearchParams(window.location.search);
    const fsid = urlParams.get('fsid');
    console.log('🎫 FSID encontrado:', fsid);

    if (!fsid) {
      console.warn('⚠️ Parâmetro fsid não encontrado na URL. O upsell pode não funcionar.');
    }

    try {
      console.log('🚀 Inicializando salesFunnel...');
      const funnel = checkoutElements.init('salesFunnel');
      console.log('✅ salesFunnel inicializado:', funnel);
      
      const mountResult = funnel.mount('#hotmart-sales-funnel');
      console.log('✅ salesFunnel montado com sucesso:', mountResult);
      setError(false);
    } catch (error) {
      console.error('❌ Erro ao inicializar salesFunnel:', error);
      setError(true);
      
      // Tenta novamente após um delay
      setTimeout(() => {
        console.log('🔄 Tentando novamente após erro...');
        try {
          const funnel = checkoutElements.init('salesFunnel');
          funnel.mount('#hotmart-sales-funnel');
          console.log('✅ Sucesso na segunda tentativa!');
          setError(false);
        } catch (retryError) {
          console.error('❌ Erro na segunda tentativa:', retryError);
          setError(true);
        }
      }, 1000);
    }
  };

  // Tenta inicializar quando o componente monta
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Aguarda um pouco para garantir que o DOM está pronto
      const timer = setTimeout(() => {
        if (typeof checkoutElements !== 'undefined') {
          initCheckout();
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const upsellClassName = black ? `${upsellClass} ${blackClass}` : upsellClass;

  return (
    <div className="flex justify-center rounded-xl shadow-lg relative overflow-hidden border-4 border-green-500 bg-[#F7F9FA]">
      {black && (
        <>
          <div className="flex top-0 w-full justify-center items-end absolute text-center px-5 pt-5 pb-3 z-50 text-gray-950 bg-[#F7F9FA]">
            <span className="text-xs font-semibold uppercase opacity-0">¡Toca el botón para recibir ahora! 👇</span>
          </div>
          <div className="flex bottom-0 w-full justify-center items-start absolute text-center px-5 pt-3 pb-5 z-50 text-gray-950 bg-[#F7F9FA]">
            <span className="text-xs font-semibold uppercase opacity-0">¡Estamos ansiosos por comenzar! 🎉</span>
          </div>
          {loading && (
            <div className="flex justify-center items-center top-0 w-full h-full absolute text-center z-40 text-gray-950 bg-[#F7F9FA]">
              <Loader2 size={50} className="animate-spin opacity-20" />
            </div>
          )}
        </>
      )}
      <div id="hotmart-sales-funnel" className={upsellClassName} />
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <div className="text-center text-sm text-red-600">
            <p className="font-semibold">Erro ao carregar oferta de upsell</p>
            <p className="text-xs mt-1">Verifique o console do navegador (F12) para mais detalhes</p>
          </div>
        </div>
      )}
      <Script
        src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('📦 Script hotmart-checkout-elements.js carregado');
          initCheckout();
        }}
        onError={(e) => {
          console.error('❌ Erro ao carregar script:', e);
          setError(true);
        }}
      />
    </div>
  );
}
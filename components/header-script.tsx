import Script from "next/script";

const idList: Record<string, string> = {
  kim: "6930a849a6cbcd96bc532f47",
  elon: "6930a849a6cbcd96bc532f47",
  shakira: "6930a849a6cbcd96bc532f47",
};

export default function HeaderScript({ content }: { content: string }) {

  const pixelId = idList[content];

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="utmify-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.pixelId=${JSON.stringify(pixelId)};`,
        }}
      />
      <Script
        id="utmify-pixel"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
      <script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-subids
        async
        defer
      />
    </>
  );
  
};
import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "openai-chatkit": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function App() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const existingScript = document.querySelector(
      'script[src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"]'
    );

    const setupChatKit = async () => {
      await customElements.whenDefined("openai-chatkit");

      const chatkitEl = document.getElementById("my-chatkit") as any;
      if (!chatkitEl) return;

      chatkitEl.setOptions({
        api: {
          domainKey: "domain_pk_69da17b306088194b38f01a92dc3288f0a6bf281dcae82e7",
          async getClientSecret(currentClientSecret: string | null) {
            if (currentClientSecret) {
              return currentClientSecret;
            }

            const response = await fetch(
              "https://customer-support-backend-production-62a3.up.railway.app/chatkit/session",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              const text = await response.text();
              throw new Error(`Session error: ${response.status} ${text}`);
            }

            const data = await response.json();
            return data.client_secret;
          },
        },
      });
    };

    if (existingScript) {
      setupChatKit();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";
    script.async = true;
    script.onload = setupChatKit;

    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <openai-chatkit
        id="my-chatkit"
        style={{ display: "block", width: "100%", height: "100%" }}
      ></openai-chatkit>
    </div>
  );
}

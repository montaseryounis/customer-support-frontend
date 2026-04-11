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

function getOrCreateUserId() {
  const storageKey = "azzam_user_id";
  const existing = localStorage.getItem(storageKey);

  if (existing) {
    return existing;
  }

  const newId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  localStorage.setItem(storageKey, newId);
  return newId;
}

export default function App() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const setupChatKit = async () => {
      await customElements.whenDefined("openai-chatkit");

      const chatkitEl = document.getElementById("my-chatkit") as any;
      if (!chatkitEl) return;

      chatkitEl.addEventListener(
        "chatkit.ready",
        () => {
          console.log("ChatKit is ready");
        },
        { once: true }
      );

      chatkitEl.setOptions({
        api: {
          async getClientSecret(currentClientSecret: string | null) {
            if (currentClientSecret) {
              return currentClientSecret;
            }

            const userId = getOrCreateUserId();

            const response = await fetch(
              "https://customer-support-backend-production-62a3.up.railway.app/chatkit/session",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: userId,
                }),
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

    const existingScript = document.querySelector(
      'script[src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"]'
    );

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            عزّام
          </div>

          <div
            style={{
              fontSize: "15px",
              color: "#475569",
              lineHeight: 1.7,
            }}
          >
            مساعد خدمة العملاء الذكي للرد على الاستفسارات ومتابعة المحادثات بشكل سريع وواضح.
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
            height: "calc(100vh - 150px)",
            minHeight: "700px",
          }}
        >
          <openai-chatkit
            id="my-chatkit"
            style={{ display: "block", width: "100%", height: "100%" }}
          ></openai-chatkit>
        </div>
      </div>
    </div>
  );
}

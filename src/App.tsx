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
        background:
          "radial-gradient(circle at top right, #dbeafe 0%, #eff6ff 24%, #f8fafc 58%, #ffffff 100%)",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "32px 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "22px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                letterSpacing: "0.12em",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              ERTQA | AI Assistant
            </div>

            <div
              style={{
                fontSize: "34px",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              عزّام
            </div>

            <div
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#334155",
                maxWidth: "780px",
              }}
            >
              مساعد ارتقاء الذكي لخدمة العملاء، يساعدك في الاستفسارات، التخصيص، الطلبات، والحلول
              المرتبطة بالهدايا المؤسسية والتصنيع الإبداعي بأسلوب واضح وسريع.
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(148,163,184,0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "18px",
              padding: "14px 18px",
              minWidth: "220px",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "6px",
              }}
            >
              الحالة
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              متصل وجاهز للمحادثة
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(226,232,240,0.95)",
            borderRadius: "26px",
            overflow: "hidden",
            boxShadow:
              "0 18px 50px rgba(15, 23, 42, 0.10), 0 2px 10px rgba(15, 23, 42, 0.04)",
            height: "calc(100vh - 170px)",
            minHeight: "720px",
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

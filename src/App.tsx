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
          "linear-gradient(180deg, #f8f5ef 0%, #f4efe6 42%, #f8fafc 100%)",
        fontFamily:
          "'IBM Plex Sans Arabic', 'Tahoma', 'Arial', sans-serif",
        padding: "32px 24px",
        boxSizing: "border-box",
        direction: "rtl",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "22px",
            padding: "22px 26px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.68)",
            border: "1px solid rgba(201, 169, 97, 0.35)",
            boxShadow:
              "0 12px 35px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  color: "#9a7b34",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                ERTQA | CUSTOMER EXPERIENCE
              </div>

              <div
                style={{
                  fontSize: "38px",
                  fontWeight: 800,
                  color: "#1f2937",
                  marginBottom: "10px",
                }}
              >
                عزّام
              </div>

              <div
                style={{
                  fontSize: "17px",
                  lineHeight: 1.9,
                  color: "#4b5563",
                  maxWidth: "840px",
                }}
              >
                مساعد ارتقاء الذكي لخدمة العملاء، صُمّم ليقدّم تجربة تواصل راقية تعكس
                هوية ارتقاء التي تجمع بين الحرفة، الإتقان، والتصنيع المخصص.
              </div>
            </div>

            <div
              style={{
                minWidth: "240px",
                padding: "14px 18px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg, rgba(201,169,97,0.14) 0%, rgba(255,255,255,0.92) 100%)",
                border: "1px solid rgba(201, 169, 97, 0.45)",
                boxShadow: "0 8px 20px rgba(201, 169, 97, 0.10)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#8b6b2e",
                  marginBottom: "6px",
                }}
              >
                الحالة
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1f2937",
                }}
              >
                متصل وجاهز لخدمتك
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: "30px",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(201,169,97,0.95) 0%, rgba(233,216,166,0.85) 35%, rgba(255,255,255,0.55) 100%)",
            boxShadow:
              "0 24px 60px rgba(15, 23, 42, 0.10), 0 8px 22px rgba(201, 169, 97, 0.12)",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.96)",
              borderRadius: "29px",
              overflow: "hidden",
              height: "calc(100vh - 190px)",
              minHeight: "760px",
            }}
          >
            <div
              style={{
                height: "64px",
                borderBottom: "1px solid rgba(201, 169, 97, 0.20)",
                background:
                  "linear-gradient(180deg, rgba(250,247,241,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 22px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#374151",
                }}
              >
                تجربة محادثة راقية تعكس هوية ارتقاء
              </div>

              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: "#c9a961",
                  boxShadow: "0 0 12px rgba(201, 169, 97, 0.55)",
                }}
              />
            </div>

            <div style={{ width: "100%", height: "calc(100% - 64px)" }}>
              <openai-chatkit
                id="my-chatkit"
                style={{ display: "block", width: "100%", height: "100%" }}
              ></openai-chatkit>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

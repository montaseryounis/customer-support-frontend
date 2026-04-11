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
        background: `
          radial-gradient(circle at 15% 10%, rgba(150, 120, 30, 0.30) 0%, rgba(150, 120, 30, 0.00) 26%),
          radial-gradient(circle at 85% 88%, rgba(152, 119, 36, 0.22) 0%, rgba(152, 119, 36, 0.00) 28%),
          radial-gradient(circle at 18% 45%, rgba(4, 60, 48, 0.40) 0%, rgba(4, 60, 48, 0.00) 30%),
          radial-gradient(circle at 72% 62%, rgba(32, 52, 28, 0.30) 0%, rgba(32, 52, 28, 0.00) 26%),
          linear-gradient(180deg, #040404 0%, #050606 36%, #07110d 68%, #050505 100%)
        `,
        fontFamily: "'IBM Plex Sans Arabic', 'Tahoma', 'Arial', sans-serif",
        padding: "28px 24px",
        boxSizing: "border-box",
        direction: "rtl",
      }}
    >
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#bda57a",
                marginBottom: "10px",
                fontWeight: 700,
              }}
            >
              ERTQA | AI CONCIERGE
            </div>

            <div
              style={{
                fontSize: "44px",
                lineHeight: 1.1,
                fontWeight: 300,
                marginBottom: "14px",
                color: "#e9dcc0",
                textShadow: "0 0 18px rgba(233, 220, 192, 0.10)",
              }}
            >
              عزّام
            </div>

            <div
              style={{
                fontSize: "17px",
                lineHeight: 1.95,
                color: "#d8ccb4",
                maxWidth: "860px",
              }}
            >
              مساعد ارتقاء الذكي لتجربة خدمة عملاء راقية، يساعدك في الاستفسارات والطلبات
              والتخصيص، بروح تعكس هوية ارتقاء حيث تتحول الفكرة إلى أثر ملموس.
            </div>
          </div>

          <div
            style={{
              minWidth: "240px",
              padding: "16px 18px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201, 169, 97, 0.35)",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#b89d6f",
                marginBottom: "6px",
              }}
            >
              الحالة
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#f0e5cd",
              }}
            >
              متصل وجاهز لخدمتك
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: "30px",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(201,169,97,0.95) 0%, rgba(128,102,48,0.85) 38%, rgba(255,240,205,0.45) 100%)",
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.35), 0 0 35px rgba(201,169,97,0.10)",
          }}
        >
          <div
            style={{
              borderRadius: "29px",
              overflow: "hidden",
              background:
                "linear-gradient(180deg, rgba(8,8,8,0.96) 0%, rgba(10,12,11,0.96) 100%)",
              height: "calc(100vh - 180px)",
              minHeight: "760px",
            }}
          >
            <div
              style={{
                height: "68px",
                borderBottom: "1px solid rgba(201, 169, 97, 0.18)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
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
                  color: "#ddcfb2",
                  fontWeight: 600,
                }}
              >
                تجربة محادثة فاخرة مستوحاة من هوية ارتقاء
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: "#c9a961",
                    boxShadow: "0 0 12px rgba(201, 169, 97, 0.6)",
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: "#bfa97d",
                  }}
                >
                  Online
                </div>
              </div>
            </div>

            <div style={{ width: "100%", height: "calc(100% - 68px)" }}>
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

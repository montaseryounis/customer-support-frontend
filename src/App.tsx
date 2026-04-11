export default function App() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

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
        padding: isMobile ? "20px 14px" : "28px 24px",
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
            marginBottom: "24px",
            textAlign: "right",
          }}
        >
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
              fontSize: isMobile ? "34px" : "44px",
              lineHeight: 1.1,
              fontWeight: 300,
              marginBottom: "14px",
              color: "#e9dcc0",
              textShadow: "0 0 18px rgba(233, 220, 192, 0.10)",
            }}
          >
            أرتقاء
          </div>

          <div
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.95,
              color: "#d8ccb4",
              maxWidth: "860px",
              marginLeft: "auto",
            }}
          >
            هذه نسخة اختبار بدون ChatKit للتأكد هل المشكلة من الشات نفسه أو من إعدادات
            النشر على الدومين الإنتاجي.
          </div>
        </div>

        <div
          style={{
            maxWidth: "1120px",
            width: "100%",
            margin: "0 auto",
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
              minHeight: isMobile ? "640px" : "760px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "24px" : "40px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "760px",
                borderRadius: "24px",
                background: "#f7f5f1",
                padding: isMobile ? "28px 20px" : "40px 32px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "24px" : "30px",
                  color: "#2b2b2b",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                اختبار الواجهة
              </div>

              <div
                style={{
                  fontSize: isMobile ? "15px" : "17px",
                  lineHeight: 1.9,
                  color: "#4d4d4d",
                  marginBottom: "18px",
                }}
              >
                إذا ظهرت هذه البطاقة على رابط الإنتاج، فهذا يعني أن التطبيق يعمل وأن
                المشكلة على الأغلب من ChatKit أو من إعدادات الدومين المرتبطة به.
              </div>

              <div
                style={{
                  display: "inline-block",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "#111111",
                  color: "#f3e4bf",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Production Test Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

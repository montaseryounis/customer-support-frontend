import { ChatKit, useChatKit } from "@openai/chatkit-react";

export default function App() {
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ChatKit control={control} className="h-full w-full" />
    </div>
  );
}

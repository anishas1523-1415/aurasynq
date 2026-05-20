import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justify-content: "center",
      minHeight: "100vh",
      background: "radial-gradient(circle at center, #2e1065, #000000)",
      padding: "1rem"
    }}>
      <SignIn 
        appearance={{
          variables: {
            colorPrimary: "#a855f7",
            colorBackground: "#141416",
            colorInputBackground: "#1d1d21",
            colorText: "#ffffff",
            colorTextSecondary: "#94a3b8",
            colorInputText: "#ffffff",
            colorButtonText: "#ffffff",
            colorTextOnPrimaryBackground: "#ffffff"
          },
          elements: {
            card: "border border-zinc-800 shadow-2xl shadow-purple-900/20",
            footerActionLink: "text-purple-400 hover:text-purple-300"
          }
        }}
      />
    </div>
  );
}

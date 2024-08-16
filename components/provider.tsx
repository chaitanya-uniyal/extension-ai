// import { ChatProvider } from "@/context/chat-context"
import { ExtensionProvider } from "@/context/extension-context"
import { SummaryProvider } from "@/context/summary-context"
import { TranscriptProvider } from "@/context/transcript-context"

export default function Providers({ children }) {
  return (
    <ExtensionProvider>
      {/* <ChatProvider> */}
        <SummaryProvider>
          <TranscriptProvider>{children}</TranscriptProvider>
        </SummaryProvider>
      {/* </ChatProvider> */}
    </ExtensionProvider>
  )
}
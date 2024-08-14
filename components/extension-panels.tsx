import { useExtension } from "../context/extension-context"

export default function ExtensionPanels() {
  const { extensionPanel } = useExtension()

  return (
    <div>
      {extensionPanel === "Summary" && <Summary />}
      {extensionPanel === "Transcript" && <Transcript />}
      {extensionPanel === "Chat" && <Chat />}
    </div>
  )
}
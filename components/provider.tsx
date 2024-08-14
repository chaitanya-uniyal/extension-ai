import { ExtensionProvider } from "@/context/extension-context";

export default function Providers({children})
{
    return (
        <ExtensionProvider>
            {children}
        </ExtensionProvider>
    )
}
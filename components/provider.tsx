import { ExtensionProvider } from "../context/extension-context";
import { SummaryProvider } from "../context/summary-context";

export default function Providers({children})
{
    return (
        <ExtensionProvider>
            <SummaryProvider>
                {children}
            </SummaryProvider>
        </ExtensionProvider>
    )
}
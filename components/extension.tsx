import  { useExtension } from "@/context/extension-context";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { useEffect } from "react";
import { getVideoData } from "@/utils/functions";
import ExtensionActions from "./extension-actions";
import ExtensionPanels from "./extension-panels";

export default function Extension(){

    const {
        setExtensionContainer,
        setExtensionData,
        setExtensionIsOpen,
        setExtensionLoading,
        setExtensionPanel,
        setExtensionTheme,
        setExtensionVideoId,
        extensionTheme,
        extensionIsOpen, 
        extensionVideoId,
    } = useExtension()

    useEffect(()=> {

        const getVideoId = () =>{
            return new URLSearchParams(window.location.search).get("v")
        }

        const fetchVideoData = async() =>{
            const id = getVideoId()

            if(id && id !== extensionVideoId){
                setExtensionVideoId(id)
                setExtensionLoading(true)
                const data = await getVideoData(id)
                setExtensionData(data)
                setExtensionLoading(false)
            }
        }
        fetchVideoData() 
        const intervalid = setInterval(fetchVideoData,2000)
        return ()=> clearInterval(intervalid)
    }, [extensionVideoId])

    useEffect(() => {
        console.log("Fetches Theme ")
        const getCssVariable = (name: string) => {
          const rootStyle = getComputedStyle(document.documentElement)
          return rootStyle.getPropertyValue(name).trim()
        }
        const backgroundColor = getCssVariable("--yt-spec-base-background")
    
        if (backgroundColor === "#fff") {
          setExtensionTheme("light")
        } else {
          setExtensionTheme("dark")
        }
      }, [])
    

    return (
        <main ref={setExtensionContainer} className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
            <div className="w-full">
                <Collapsible open={extensionIsOpen} onOpenChange={setExtensionIsOpen} className="space-y-3">
                    <ExtensionActions/>
                    <CollapsibleContent>
                        <ExtensionPanels/>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </main>
    )
}
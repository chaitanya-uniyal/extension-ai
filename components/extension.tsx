import { Collapsible } from "./ui/collapsible";

export default function Extension(){
    return (
        <main className={`antialiased w-full mb-3 z-10`}>
            <div className="w-full">
                <Collapsible className="space-y-3">
                    <h1>extension actions</h1>
                </Collapsible>
            </div>
        </main>
    )
}
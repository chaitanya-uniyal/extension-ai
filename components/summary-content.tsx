import { useSummary } from "../context/summary-context";
import SummarySkeleton from "./summary-skeleton";
import { Button } from "./ui/button";




export default function SummaryContent() {
    const {summaryContent, generateSummary, summaryIsGenerating} = useSummary()


    if(!summaryContent && summaryIsGenerating){
        return (
            <div>
                <SummarySkeleton></SummarySkeleton>
            </div>
        )
    }


    if(!summaryContent && !summaryIsGenerating){
        return (
            <div>
                <Button>
                    <span>generate summary</span>
                </Button>
            </div>
        )
    }


    return (
        <div>
            <div>{summaryContent}</div>
        </div>
    )
}


// OPENAI API USED

// import { OpenAI } from "openai";
// import type { PlasmoMessaging } from "@plasmohq/messaging";

// // Initialize OpenAI client with your API key
// const openai = new OpenAI({ apiKey: "sk-af48_OGKD1--p2-0zjPVmpKvW-uBG8VscQFs18aNoST3BlbkFJ0MiTBzEwbIl5Y3Kvkd-GlN3HA38BGBPEM-EEGMi88A" });

// async function createCompletion(model: string, prompt: string, context: any) {
//   const parsed = context.transcript.events
//     .filter((x: { segs: any[] }) => x.segs)
//     .map((x: { segs: any[] }) =>
//       x.segs.map((y: { utf8: string }) => y.utf8).join(" ")
//     )
//     .join(" ")
//     .replace(/[\u200B-\u200D\uFEFF]/g, "")
//     .replace(/\s+/g, " ");

//   const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`;

//   return openai.chat.completions.create({
//     messages: [{ role: "user", content: USER }],
//     model: model || "gpt-3.5-turbo",
//     stream: true
//   });
// }

// const handler: PlasmoMessaging.PortHandler = async (req, res) => {
//   const { prompt, model, context } = req.body;

//   try {
//     const stream = await createCompletion(model, prompt, context);

//     for await (const chunk of stream) {
//       const content = chunk.choices[0]?.delta?.content || "";
//       if (content) {
//         res.send({ message: content, error: "", isEnd: false });
//       }
//     }

//     res.send({ message: "END", error: "", isEnd: true });
//   } catch (error) {
//     console.error("Error:", error);
//     res.send({ error: error.message || "Something went wrong", message: "", isEnd: true });
//   }
// };

// export default handler;


import { error } from "console"
import { OpenAI } from "openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const llm = new OpenAI({
  apiKey: "your api key"
})

async function createCompletion(model: string, prompt: string, context: any) {
  const parsed = context.transcript.events
    .filter((x: { segs: any }) => x.segs)
    .map((x: { segs: any[] }) =>
      x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
    )
    .join(" ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")

  const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`

  return llm.beta.chat.completions.stream({
    messages: [{ role: "user", content: USER }],
    model: "gpt-3.5-turbo",
    stream: true
  })
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  let cumulativeData = ""

  const prompt = req.body.prompt
  const model = req.body.model
  const context = req.body.context

  try {
    const completion = await createCompletion(model, prompt, context)

    completion.on("content", (delta, snapshot) => {
      cumulativeData += delta
      res.send({ message: cumulativeData, error: "", isEnd: false })
    })

    completion.on("end", () => {
      res.send({ message: "END", error: "", isEnd: true })
    })
  } catch (error) {
    res.send({ error: "something went wrong" })
  }
}

export default handler

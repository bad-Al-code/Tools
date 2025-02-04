import 'dotenv/config'

import { Chroma } from '@langchain/community/vectorstores/chroma'
import {
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings,
} from '@langchain/google-genai'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createRetrievalChain } from 'langchain/chains/retrieval'

const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
})

const db = new Chroma(embeddings, {
    collectionName: 'emb',
})

const prompt = ChatPromptTemplate.fromMessages([
    ['system', '{context}'],
    ['human', '{input}'],
])

const retriever = db.asRetriever()

;(async () => {
    const combineDocsChain = await createStuffDocumentsChain({
        llm,
        prompt,
    })

    const chain = await createRetrievalChain({ retriever, combineDocsChain })

    const result = await chain.invoke({
        input: 'Longest word ',
    })

    console.log(result)
    console.log(result.answer)
})()

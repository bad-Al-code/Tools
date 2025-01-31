import 'dotenv/config'

import { Chroma } from '@langchain/community/vectorstores/chroma'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { VectorStore } from '@langchain/core/vectorstores'

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
})

const db = new Chroma(embeddings, {
    collectionName: 'emb',
})

const retriever = db.asRetriever()

import 'dotenv/config'

import chalk from 'chalk'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { CharacterTextSplitter } from '@langchain/textsplitters'
import { Chroma } from '@langchain/community/vectorstores/chroma'

const geminiModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
})

const textSplitter = new CharacterTextSplitter({
    separator: '\n',
    chunkSize: 200,
    chunkOverlap: 0,
})

const loader = new TextLoader('./data/facts.txt')

const loadDocs = async () => {
    const rawDocuments = await loader.load()
    const docs = await textSplitter.splitDocuments(rawDocuments)

    const db = await Chroma.fromDocuments(docs, embeddings, {
        collectionName: 'facts-collection',
    })

    const results = await db.similaritySearch(
        'What is an intersting fact about the english lanugage?',
    )

    for (let result of results) {
        console.log(chalk.cyan('-').repeat(81))
        // console.log(result[1])
        console.log(result.pageContent)
    }
}

loadDocs()

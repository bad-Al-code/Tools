import 'dotenv/config'

import chalk from 'chalk'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import {
    CharacterTextSplitter,
    RecursiveCharacterTextSplitter,
} from '@langchain/textsplitters'

const geminModel = new ChatGoogleGenerativeAI({
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
    const docs = textSplitter.splitDocuments(rawDocuments)

    console.log(
        (await docs).forEach((doc) => {
            console.log(chalk.cyan('-').repeat(81))
            console.log(doc.pageContent)
        }),
    )
}

loadDocs()

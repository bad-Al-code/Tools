import 'dotenv/config'

import chalk from 'chalk'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

const geminModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

const loader = new TextLoader('./data/facts.txt')

const loadDocs = async () => {
    const docs = await loader.load()
    console.log(chalk.blue('DOCS'))
    console.log(docs[0])
    console.log(chalk.yellow('Metadata'))
    console.log(docs[0].metadata)
}

loadDocs()

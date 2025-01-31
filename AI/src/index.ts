import 'dotenv/config'

import { OpenAI } from '@langchain/openai'
import chalk from 'chalk'
import inquirer from 'inquirer'

const openai = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })

async function generatecode(task: string, language: string) {
    const prompt = `Write a program in ${language} to accomplish the following task: ${task}. Provide only the code without explanations.`

    try {
        console.log(chalk.blue('\nGenerating Code '))
        const response = await openai.invoke(prompt)
        console.log(chalk.green('Generated Code \n'))
        console.log(chalk.yellow(response))
    } catch (err) {
        console.error(chalk.red('Error generating code ', err))
    }
}

async function main() {
    console.log(chalk.cyan('\n Langchain Code Genreator CLI \n'))

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'task',
            message: 'Enter the task for which you wnat code: ',
        },
        {
            type: 'input',
            name: 'language',
            message: 'Enter the programming language',
        },
    ])

    await generatecode(answers.task, answers.language)
}

main()

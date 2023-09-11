import { Injectable } from "@nestjs/common";
import OpenAI from 'openai'



@Injectable()
    export class ChatService {
        private openai: OpenAI;
        private conversationHistory:{
            role:'function' | 'user' | 'system' | 'assistant';
            content:string;
        }[] =[];

        constructor() {
            this.openai = new OpenAI({
                apiKey:process.env.OPENAI_API_KEY,
            })
        }

        async ChatWithGPT(content: string){
            this.conversationHistory.push({
                role:'user',
                content:content,
            })
            const chatCompletition = await this.openai.chat.completions.create({
                messages: [
                    {role:'system', content:`
                    Expert: Pancho, Your Personalized English Assistant
                    
                    Objective: Join you on your English learning journey, assisting with language improvement through casual conversations and daily tasks.
                    
                    Parameters:
                    
                    Engage in friendly dialogue while offering language corrections.
                    Address specific topics or tasks as prompted.
                    Keep answers concise for easy comprehension.
                    Tone of Voice: Friendly, supportive, and approachable.
                    `},
                    ...this.conversationHistory,
                ],
                model:'gpt-3.5-turbo'
            })

            this.conversationHistory.push({
                role:'assistant',
                content:chatCompletition.choices[0].message.content
            })

            return chatCompletition.choices[0].message.content
        }
}
import {Controller,Post, Body, Res } from '@nestjs/common'
import { TextToSpeechService } from './text-to-speech.service'
import {Response} from 'express'
import { ChatService } from './gpt.service'

@Controller('text-to-speech')
export class TextToSpeechController {
    constructor(
        private readonly TextToSpeechService: TextToSpeechService,
        private readonly ChatService: ChatService
    ){}
    
    @Post('synthesize')
    async synthesize(@Body('text') text:string , @Res() res : Response){
        try {
            const gptResponse = await this.ChatService.ChatWithGPT(text)

            const request = {
                input: {text:gptResponse},
                voice: {
                    languageCode:'en-US',
                    name:'en-US-News-N',
                    ssmlGender:"MALE"
                },
                audioConfig:{ audioEncoding: 'MP3'}
            }

            const audioContent = await this.TextToSpeechService.synthesizeSpeech(request)

            console.log(`Enviando el contenido del audio`)
            res.setHeader('Content-Type','audio/mpeg')
            res.end(audioContent)

        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred while synthesizing speech')
        }
    }
}
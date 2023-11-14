import {
  Body,
  Get,
  JsonController,
  Middleware,
  Post,
  UseBefore,
} from "routing-controllers";
import { ITranscriptionProtocl } from "../interfaces/ITranscription";
import axios from "axios";
import { MiddlewareTokenRequired } from "../middleware";

@JsonController("/main")
export class TranscriptionImageController {
  @Get("/")
  async test() {
    return { msg: "tudo certo" };
  }

  @Post("/transcription")
  @UseBefore(MiddlewareTokenRequired)
  async HandleTranscription(
    @Body() { imageDataBase64 }: ITranscriptionProtocl
  ) {
    try {
      const { data } = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_GOOGLE_VISION}`,
        {
          requests: [
            {
              image: {
                content: imageDataBase64,
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                },
              ],
            },
          ],
        }
      );
      console.log(data.responses[0]);
      return {
        textTranscreved: data.responses[0].textAnnotations[0].description,
      };
    } catch {
      return { errors: ["Falha ao transcrever imagem"] };
    }
  }
}

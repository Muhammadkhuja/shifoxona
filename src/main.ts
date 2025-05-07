import { NestFactory } from "@nestjs/core";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle("Shifoxona project")
      .setDescription("Shifoxona REST API")
      .setVersion("1.0")
      .addTag("Shifoxona", "Swagger")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/", app, document);

    // app.enableCors({
    //   origin: (origin, callback) => {
    //     const allowedOrigins = [
    //       "http://localhost:3002",
    //       "http://localhost:8000",
    //       "http://shifoxona.uz",
    //       "http://api.shifoxona.uz",
    //       "http://shifoxona.vercel.app",
    //     ];
    //     if (!origin || allowedOrigins.includes(origin)) {
    //       callback(null, true);
    //     } else {
    //       callback(new BadRequestException("Not allowed by CORS"));
    //     }
    //   },
    //   methods: "GET, HEAD, PUT,PATCH,POST,DELETE",
    //   credentials: true, //cookie be header
    // });

    app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

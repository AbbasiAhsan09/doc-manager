import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function SetupSwagger(app : INestApplication){
    const config = new DocumentBuilder()
    .setTitle('DocManager')
    .setDescription('DocManager API ')
    // .setVersion('1.0')
    // .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
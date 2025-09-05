"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const cfg = new swagger_1.DocumentBuilder()
        .setTitle('Simple Encrypt API')
        .setDescription('Endpoints: /get-encrypt-data, /get-decrypt-data')
        .setVersion('1.0.0')
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, cfg);
    swagger_1.SwaggerModule.setup('api-docs', app, doc);
    await app.listen(3000);
    console.log('http://localhost:3000/api-docs');
}
bootstrap();
//# sourceMappingURL=main.js.map
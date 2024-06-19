import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  CommandFactory.run(AppModule, ['warn', 'error']);
}
bootstrap();

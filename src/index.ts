import 'module-alias/register';
import container from './container';

export const app: any = container.resolve('app');

// Start the server
app.start().catch((error: { stack: any }) => {
  app.logger.error(error.stack);
  process.exit();
});

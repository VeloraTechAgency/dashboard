import app from './app.js';
import { config } from './config.js';

const HOST = '127.0.0.1';

app.listen(config.port, HOST, () => {
  console.log(`Server running at http://${HOST}:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

import './application/config/Misc';

import { Server } from '@application/Server';

process.on('SIGTERM', Server.stop);
process.on('SIGINT', Server.stop);

(async (): Promise<void> => {
  await Server.start();
})();

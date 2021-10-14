import { ProjectConfig } from '@mdrajibul/cloud-config-utils';
import express from 'express';
import opn from 'opn';

import BootStrap from './bootstrap';
import Log from './utils/log';

/**
 * Application Startup class
 */
export default abstract class Startup {
  /** Start the appplication */
  static async start(app: express.Application) {
    await BootStrap.init();

    const serverPort = ProjectConfig.configs.port || 3000;
    const host = ProjectConfig.configs.host || 'http://localhost';

    app.listen(serverPort, '0.0.0.0', () => {
      if (ProjectConfig.configs.openBrowser) {
        opn(`${host}:${serverPort}`, { wait: true });
      }
      if (!ProjectConfig.configs.test) {
        Log.info(`Server running on ${host}:${serverPort}`);
      }
    });
  }
}

import express from 'express';
import { ProjectConfig } from '@mdrajibul/cloud-config-utils';
import opn from 'opn';

import BootStrap from './bootstrap';

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
      console.log(`Server running on ${host}:${serverPort}`);
    });
  }
}

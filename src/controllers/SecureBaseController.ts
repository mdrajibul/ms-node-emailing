import { ProjectConfig } from '@mdrajibul/cloud-config-utils';
import { Request, Response } from 'express';
import Log from '../utils/log';

export default abstract class SecureBaseController {

  constructor(protected req: Request, protected res: Response) {
  }

  authFilter(): boolean {
    if (ProjectConfig.configs.jwtToken !== this.req.headers.authorization) {
      Log.error('Token invalid');
      this.res.status(401).send('Token invalid');
      return false;
    }
    return true;
  }
}

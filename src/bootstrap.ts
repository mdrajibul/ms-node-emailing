import { loadConfigs, ProjectConfig } from '@mdrajibul/cloud-config-utils';

/**
 * Use to initialize all necessay configs and class
 * @author - Md.Rajib-Ul-Islam<mdrajibul@gmail.com>
 */
export default abstract class BootStrap {
  /**
   * Init porject basic setup like configs, application holder and initialize api cache
   */
  static async init() {
    const configs = await loadConfigs();
    ProjectConfig.init(configs);
  }
}

import { environment } from '../../../environments/environment';

export class ConfigService {

  public static get(keyEnv: keyof Env): string {
    return environment[keyEnv];
  }
}

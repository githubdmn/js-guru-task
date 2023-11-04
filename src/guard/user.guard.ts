import { CanActivate, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

const userRegister = 'api/user';
const userLogin = 'api/user/login';

export class UserGuard implements CanActivate {
  checkArgs(method: string, url: string) {
    console.log(method, url);
    return method === 'POST' && (url === userRegister || userLogin);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { method, url } = context.getArgs()[0];
    if (this.checkArgs(method, url)) return true;
    const { access_token, refresh_token } = context
      .switchToHttp()
      .getRequest().headers;
    if (!access_token || !refresh_token) return false;
    try {
      const result = verify(access_token, 'access');
      if (!result) return false;
      return true;
    } catch {
      return false;
    }
  }
}
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class DoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user || req.user.role !== "doctor") {
      throw new ForbiddenException({
        message: "Kirish mumkin bo'lmagan joyga kirdingisiz",
      });
    }
    return true;
  }
}

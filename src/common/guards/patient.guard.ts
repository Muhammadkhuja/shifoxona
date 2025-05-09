import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class PatientGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user || req.user.role !== "patient") {
      throw new ForbiddenException({
        message: "Kirish mumkin bo'lmagan joyga kirdingisiz",
      });
    }
    return true;
  }
}

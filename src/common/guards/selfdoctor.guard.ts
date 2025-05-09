import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SelfDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = request.params.id;

    const Doctor = user?.role === "doctor";
    const IdNum = !isNaN(paramId);
    const Owner = user?.id === paramId;

    if (!user || !Doctor || !IdNum || !Owner) {
      throw new ForbiddenException({
        message: "Faqat o'z profilingizga kirish mumkin",
      });
    }

    return true;
  }
}

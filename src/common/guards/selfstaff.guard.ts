import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SelfStaffGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = (request.params.id); 


    const Staff = user?.role === "staff";
    const IdNum = !isNaN(paramId);
    const Owner = user.id === paramId;

    console.log(user.role);
    console.log(user.id);
    

    if (!user || !Staff || !IdNum || !Owner) {
      
      throw new ForbiddenException({
        message: "Faqat o'z profilingizga kirish mumkin",
      });
    }

    return true;
  }
}

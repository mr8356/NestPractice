import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    //의존성 주입 
    constructor(private readonly usersService : UsersService){}

    @Get()
    getUsers(@Req() req){
        
    }

    @Post()
    postUsers(@Body() data : JoinRequestDto){
        this.usersService.postUsers(data.email , data.nickname , data.password);

    }

    @Post('login')
    logIn(){
        
    }

    @Post('logout')
    logOut(@Req() req , @Res() res){
        req.logOut();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}

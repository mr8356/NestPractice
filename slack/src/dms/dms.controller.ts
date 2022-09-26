import { Controller, Get, Param, Query } from '@nestjs/common';
import { query } from 'express';

@Controller('api/workspaces/:url/dms')
export class DmsController {
    @Get(':id/chats')
    getChats(@Param() param , @Query() query){
        console.log(param.id , param.url);
    }

}

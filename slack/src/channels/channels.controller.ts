import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    @Get(':id/chats')
    getChats(@Param() param , @Query() query){
        console.log(param.id , param.url);
    }
}

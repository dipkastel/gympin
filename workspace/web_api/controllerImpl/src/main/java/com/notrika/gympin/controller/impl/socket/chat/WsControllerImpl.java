package com.notrika.gympin.controller.impl.socket.chat;

import com.notrika.gympin.common.socket.chat.api.WsController;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.service.WsService;
import com.notrika.gympin.common.util.annotation.IgnoreWrapAspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/ws")
public class WsControllerImpl implements WsController {


    @Autowired
    WsService wsService;

    @MessageMapping("/SupportChatM/{driverId}")
    @SendTo("/chat/SupportChatS/{driverId}")
    @IgnoreWrapAspect
    @Override
    public ChatMessageDto SupportChat(ChatMessageParam message, @DestinationVariable String driverId) {
        return wsService.SupportChat(message,driverId);
    }


}

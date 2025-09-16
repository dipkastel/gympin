package com.notrika.gympin.common.socket.chat.api;

import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import org.springframework.messaging.handler.annotation.DestinationVariable;

public interface WsController {

    ChatMessageDto SupportChat(ChatMessageParam message, @DestinationVariable String driverId);

}

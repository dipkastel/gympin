package com.notrika.gympin.common.socket.chat.service;

import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;

public interface WsService {

    ChatMessageDto SupportChat(ChatMessageParam message, String driverId);
}

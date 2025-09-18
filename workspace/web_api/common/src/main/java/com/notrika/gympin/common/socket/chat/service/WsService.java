package com.notrika.gympin.common.socket.chat.service;

import com.notrika.gympin.common.socket.chat.dto.ChatDto;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.dto.WsSessionInfo;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.query.ChatQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

import java.util.List;
import java.util.Map;

public interface WsService  extends BaseService<ChatMessageParam, ChatMessageDto, ChatQuery> {

    ChatMessageDto SupportChat(ChatMessageParam message, String driverId, StompHeaderAccessor sha);

    Map<String, WsSessionInfo> getSessionList();

}

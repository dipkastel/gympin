package com.notrika.gympin.common.socket.chat.api;

import com.notrika.gympin.common.socket.chat.dto.ChatDto;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.dto.WsSessionInfo;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.query.ChatQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface WsController extends BaseController<ChatMessageParam, ChatMessageDto, ChatQuery> {

    ChatMessageDto SupportChat(ChatMessageParam message, @DestinationVariable String driverId, StompHeaderAccessor sha);

    ResponseEntity<Map<String, WsSessionInfo>> getSessionList();



}

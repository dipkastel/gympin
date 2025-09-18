package com.notrika.gympin.controller.impl.socket.chat;

import com.notrika.gympin.common.socket.chat.api.WsController;
import com.notrika.gympin.common.socket.chat.dto.ChatDto;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.dto.WsSessionInfo;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.query.ChatQuery;
import com.notrika.gympin.common.socket.chat.service.WsService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.annotation.IgnoreWrapAspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.ws.rs.POST;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/ws")
public class WsControllerImpl implements WsController {


    @Autowired
    WsService wsService;

    @MessageMapping("/SupportChatM/{driverId}")
    @SendTo("/chat/SupportChatS/{driverId}")
    @IgnoreWrapAspect
    @Override
    public ChatMessageDto SupportChat(ChatMessageParam message, @DestinationVariable String driverId, StompHeaderAccessor sha) {
        return wsService.SupportChat(message,driverId,sha);
    }


    @Override
    @GetMapping("getSessionList")
    public ResponseEntity<Map<String, WsSessionInfo>> getSessionList() {
        return ResponseEntity.ok(wsService.getSessionList());
    }


    @Override
    public ResponseEntity<ChatMessageDto> add(ChatMessageParam chatMessageParam) {
        return null;
    }

    @Override
    public ResponseEntity<ChatMessageDto> update(ChatMessageParam chatMessageParam) {
        return null;
    }

    @Override
    public ResponseEntity<ChatMessageDto> delete(ChatMessageParam chatMessageParam) {
        return null;
    }

    @Override
    public ResponseEntity<List<ChatMessageDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(wsService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<ChatMessageDto> getById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<Page<ChatMessageDto>> query(ChatQuery filter) {
        return ResponseEntity.ok(wsService.query(filter));
    }
}

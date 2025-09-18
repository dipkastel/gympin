package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.socket.chat.dto.ChatDto;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.dto.WsSessionInfo;
import com.notrika.gympin.persistence.entity.management.chat.ManageChatEntity;

public final class ChatConvertor {

    public static ChatMessageDto toDto(ChatMessageParam entity) {
        ChatMessageDto dto = new ChatMessageDto();
        dto.setId(entity.getId());
        dto.setMessage(entity.getMessage());
        dto.setSender(entity.getSender());
        return dto;
    }
    public static ChatMessageDto toDto(ManageChatEntity entity) {
        ChatMessageDto dto = new ChatMessageDto();
        dto.setId(entity.getId());
        dto.setMessage(entity.getMessage());
        dto.setSender(entity.getSender());
        return dto;
    }

    public static WsSessionInfo toSessionDto(ManageChatEntity entity) {
        WsSessionInfo dto = new WsSessionInfo();
        dto.setSessionId(entity.getChatId());
        dto.setUsername(entity.getUsername());
        dto.setUserId(entity.getUser()!=null?entity.getUser().getId():null);
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setAppName(entity.getAppName());
        dto.setDriverId(entity.getDriverId());
        dto.setIsOnline(false);
        return dto;
    }

}

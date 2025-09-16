package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.settings.corporateSettings.dto.CorporateSettingDto;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.persistence.entity.management.settings.CorporateSettingsEntity;

public final class ChatConvertor {

    public static ChatMessageDto toDto(ChatMessageParam entity) {
        ChatMessageDto dto = new ChatMessageDto();
        dto.setId(entity.getId());
        dto.setMessage(entity.getMessage());
        dto.setSender(entity.getSender());
        return dto;
    }

}

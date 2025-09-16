package com.notrika.gympin.domain.socket;

import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.service.WsService;
import com.notrika.gympin.domain.util.convertor.ChatConvertor;
import org.springframework.stereotype.Service;

@Service
public class WsServiceImpl implements WsService {


    @Override
    public ChatMessageDto SupportChat(ChatMessageParam message, String driverId) {
        return ChatConvertor.toDto(message);
    }

}

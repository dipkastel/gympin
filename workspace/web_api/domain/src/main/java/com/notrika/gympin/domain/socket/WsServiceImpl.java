package com.notrika.gympin.domain.socket;

import com.notrika.gympin.common.socket.chat.dto.ChatDto;
import com.notrika.gympin.common.socket.chat.dto.ChatMessageDto;
import com.notrika.gympin.common.socket.chat.dto.WsSessionInfo;
import com.notrika.gympin.common.socket.chat.param.ChatMessageParam;
import com.notrika.gympin.common.socket.chat.query.ChatQuery;
import com.notrika.gympin.common.socket.chat.service.WsService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.ChatConvertor;
import com.notrika.gympin.domain.util.convertor.PagingConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageChatRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.management.chat.ManageChatEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WsServiceImpl extends AbstractBaseService<ChatMessageParam, ChatMessageDto, ChatQuery, ManageChatEntity> implements WsService {


    @Autowired
    ManageChatRepository manageChatRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WebSocketSessionTracker webSocketSessionTracker;

    @Override
    public ChatMessageDto SupportChat(ChatMessageParam message, String driverId, StompHeaderAccessor sha) {
        WsSessionInfo info = webSocketSessionTracker.getSession(sha.getSessionId());
        manageChatRepository.add(ManageChatEntity.builder()
                .driverId(driverId)
                .appName(info.getAppName())
                .chatId(info.getSessionId())
                .username(info.getUsername())
                .message(message.getMessage())
                .sender(message.getSender())
                .phoneNumber(info.getPhoneNumber())
                .user((info.getUserId()!=null)?userRepository.getById(info.getUserId()):null)
                .build());
        return ChatConvertor.toDto(message);
    }

    @Override
    public Map<String, WsSessionInfo> getSessionList() {
        Map<String, WsSessionInfo> sessions =  webSocketSessionTracker.getSessions();
       List<ManageChatEntity> lastOfflines = manageChatRepository.findLastMessageOfEachChat(PageRequest.of(0, 100));
        for (ManageChatEntity chat :lastOfflines) {
            sessions.put(chat.chatId,ChatConvertor.toSessionDto(chat));
        }
        return sessions;
    }


    @Override
    public ChatMessageDto add(@NonNull ChatMessageParam chatMessageParam) {
        return null;
    }

    @Override
    public ChatMessageDto update(@NonNull ChatMessageParam chatMessageParam) {
        return null;
    }

    @Override
    public ChatMessageDto delete(@NonNull ChatMessageParam chatMessageParam) {
        return null;
    }

    @Override
    public ChatMessageDto getById(long id) {
        return null;
    }

    @Override
    public ManageChatEntity add(ManageChatEntity entity) {
        return null;
    }

    @Override
    public ManageChatEntity update(ManageChatEntity entity) {
        return null;
    }

    @Override
    public ManageChatEntity delete(ManageChatEntity entity) {
        return null;
    }

    @Override
    public ManageChatEntity getEntityById(long id) {
        return null;
    }

    @Override
    public List<ManageChatEntity> getAll(Pageable pageable) {
        return manageChatRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageChatEntity> findAll(Specification<ManageChatEntity> specification, Pageable pageable) {
        return manageChatRepository.findAll(specification, pageable);
    }

    @Override
    public List<ChatMessageDto> convertToDtos(List<ManageChatEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(ChatConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<ChatMessageDto> convertToDtos(Page<ManageChatEntity> entities) {
        return entities.map(ChatConvertor::toDto);
    }
}

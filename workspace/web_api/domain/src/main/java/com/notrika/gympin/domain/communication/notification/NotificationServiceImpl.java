package com.notrika.gympin.domain.communication.notification;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;
import com.notrika.gympin.common.communication.notification.service.NotificationService;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.NotificationRepository;
import com.notrika.gympin.persistence.entity.communication.notification.NotificationEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImpl extends AbstractBaseService<NotificationParam, NotificationDto, BaseQuery<?>, NotificationEntity> implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public NotificationDto add(@NonNull NotificationParam param) {
        List<UserDto> userDtos = new ArrayList<>();
        for (UserParam userParam : param.getTargetUsers()) {
            UserEntity user = userService.getEntityById(userParam.getId());
            NotificationEntity notificationEntity = new NotificationEntity();
            notificationEntity.setUser(user);
            notificationEntity.setNotif(param.getNotif());
            notificationEntity.setExpiredDate(param.getExpiredDate());
            notificationRepository.add(notificationEntity);
            userDtos.add(UserConvertor.toDtoBrief(user));
        }

        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setTargetUsers(userDtos);
        notificationDto.setExpiredDate(param.getExpiredDate());
        notificationDto.setNotif(param.getNotif());
        return notificationDto;
    }

    @Override
    public NotificationDto update(@NonNull NotificationParam param) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationDto delete(@NonNull NotificationParam param) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationDto getById(long id) {
        //        NotificationEntity notification = notificationRepository.getById(id);
        //        NotificationDto dto=new NotificationDto();
        //        dto.setId(notification.getId());
        //        dto.set
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationEntity add(NotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationEntity update(NotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationEntity delete(NotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public NotificationEntity getEntityById(long id) {
        throw new NotYetImplementedException();
    }

    @Override
    public List<NotificationEntity> getAll(Pageable pageable) {
        throw new NotYetImplementedException();
    }

    @Override
    public Page<NotificationEntity> findAll(Specification<NotificationEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<NotificationDto> convertToDtos(List<NotificationEntity> entities) {
        throw new NotYetImplementedException();
    }

    @Override
    public Page<NotificationDto> convertToDtos(Page<NotificationEntity> entities) {
        return null;
    }

    @Override
    public List<NotificationDto> getUserNotifications(BasePagedParam pagedParam) {
        List<NotificationDto> notifications = new ArrayList<>();
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        List<NotificationEntity> allByUserAndDeletedIsFalse = notificationRepository.findAllByUserAndDeletedIsFalse(user);
        notifications.add(NotificationDto.builder().notif("خوش آمدید").build());
        for (NotificationEntity entity : allByUserAndDeletedIsFalse) {
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setId(entity.getId());
            notificationDto.setNotif(entity.getNotif());
            notificationDto.setExpiredDate(entity.getExpiredDate());
            notifications.add(notificationDto);
        }
        return notifications;
    }
}

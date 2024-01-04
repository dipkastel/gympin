package com.notrika.gympin.domain.settings.notification;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import com.notrika.gympin.common.settings.notification.service.NotificationService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNotificationRepository;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationEntity;
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
public class NotificationServiceImpl extends AbstractBaseService<NotificationParam, NotificationDto, BaseQuery<?>, ManageNotificationEntity> implements NotificationService {

    @Autowired
    private ManageNotificationRepository manageNotificationRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public NotificationDto add(@NonNull NotificationParam param) {
        List<UserDto> userDtos = new ArrayList<>();
        for (UserParam userParam : param.getTargetUsers()) {
            UserEntity user = userService.getEntityById(userParam.getId());
            ManageNotificationEntity manageNotificationEntity = new ManageNotificationEntity();
            manageNotificationEntity.setUser(user);
            manageNotificationEntity.setNotif(param.getNotif());
            manageNotificationEntity.setExpiredDate(param.getExpiredDate());
            manageNotificationRepository.add(manageNotificationEntity);
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
        //        ManageNotificationEntity notification = notificationRepository.getById(id);
        //        NotificationDto dto=new NotificationDto();
        //        dto.setId(notification.getId());
        //        dto.set
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity add(ManageNotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity update(ManageNotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity delete(ManageNotificationEntity entity) {
        throw new NotYetImplementedException();
    }

    @Override
    public ManageNotificationEntity getEntityById(long id) {
        throw new NotYetImplementedException();
    }

    @Override
    public List<ManageNotificationEntity> getAll(Pageable pageable) {
        throw new NotYetImplementedException();
    }

    @Override
    public Page<ManageNotificationEntity> findAll(Specification<ManageNotificationEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<NotificationDto> convertToDtos(List<ManageNotificationEntity> entities) {
        throw new NotYetImplementedException();
    }

    @Override
    public Page<NotificationDto> convertToDtos(Page<ManageNotificationEntity> entities) {
        return null;
    }

    @Override
    public List<NotificationDto> getUserNotifications(BasePagedParam pagedParam) {
        List<NotificationDto> notifications = new ArrayList<>();
        UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
        List<ManageNotificationEntity> allByUserAndDeletedIsFalse = manageNotificationRepository.findAllByUserAndDeletedIsFalse(user);
        notifications.add(NotificationDto.builder().notif("خوش آمدید").build());
        for (ManageNotificationEntity entity : allByUserAndDeletedIsFalse) {
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setId(entity.getId());
            notificationDto.setNotif(entity.getNotif());
            notificationDto.setExpiredDate(entity.getExpiredDate());
            notifications.add(notificationDto);
        }
        return notifications;
    }
}

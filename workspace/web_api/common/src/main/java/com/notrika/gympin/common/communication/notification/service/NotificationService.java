package com.notrika.gympin.common.communication.notification.service;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.BaseService;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;

import java.util.List;

public interface NotificationService extends BaseService<NotificationParam, NotificationDto> {

    List<NotificationDto> getUserNotifications(BasePagedParam<?> pagedParam);

}

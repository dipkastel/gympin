package com.notrika.gympin.common.communication.notification.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;

import java.util.List;

public interface NotificationService extends BaseService<NotificationParam, NotificationDto, BaseQuery<?>> {

    List<NotificationDto> getUserNotifications(BasePagedParam pagedParam);

}

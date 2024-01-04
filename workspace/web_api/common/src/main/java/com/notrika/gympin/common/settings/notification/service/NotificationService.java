package com.notrika.gympin.common.settings.notification.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;

import java.util.List;

public interface NotificationService extends BaseService<NotificationParam, NotificationDto, BaseQuery<?>> {

    List<NotificationDto> getUserNotifications(BasePagedParam pagedParam);

}

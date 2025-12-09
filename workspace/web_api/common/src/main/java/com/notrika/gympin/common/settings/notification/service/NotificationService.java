package com.notrika.gympin.common.settings.notification.service;

import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.query.NotificationQuery;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface NotificationService extends BaseService<NotificationParam, NotificationDto, NotificationQuery> {


    CompletableFuture<Integer> sendNotificationToAll(NotificationBasePayload param) throws Exception;

    CompletableFuture<Integer> sendNotificationToApplication(NotificationBasePayload data) throws Exception;
}

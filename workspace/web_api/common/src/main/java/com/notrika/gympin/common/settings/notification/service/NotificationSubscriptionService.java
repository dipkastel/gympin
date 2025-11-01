package com.notrika.gympin.common.settings.notification.service;

import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.dto.NotificationSubscriptionDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import com.notrika.gympin.common.settings.notification.param.NotificationSubscriptionParam;
import com.notrika.gympin.common.settings.notification.query.NotificationSubscriptionQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;

import java.util.List;

public interface NotificationSubscriptionService extends BaseService<NotificationSubscriptionParam, NotificationSubscriptionDto, NotificationSubscriptionQuery> {
}

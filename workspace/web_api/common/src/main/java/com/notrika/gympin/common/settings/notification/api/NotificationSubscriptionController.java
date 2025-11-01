package com.notrika.gympin.common.settings.notification.api;

import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.dto.NotificationSubscriptionDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import com.notrika.gympin.common.settings.notification.param.NotificationSubscriptionParam;
import com.notrika.gympin.common.settings.notification.query.NotificationSubscriptionQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NotificationSubscriptionController extends BaseController<NotificationSubscriptionParam, NotificationSubscriptionDto, NotificationSubscriptionQuery> {


}

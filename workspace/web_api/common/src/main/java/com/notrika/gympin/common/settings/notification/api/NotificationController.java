package com.notrika.gympin.common.settings.notification.api;

import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.query.NotificationQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NotificationController extends BaseController<NotificationParam, NotificationDto, NotificationQuery> {

    ResponseEntity<Integer> sendNotificationToAll(@RequestBody NotificationBasePayload data) throws Exception;

    ResponseEntity<Integer> sendNotificationToApp(@RequestBody NotificationBasePayload data) throws Exception;

}

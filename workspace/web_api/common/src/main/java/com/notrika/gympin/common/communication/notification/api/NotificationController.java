package com.notrika.gympin.common.communication.notification.api;

import com.notrika.gympin.common.BaseController;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationController extends BaseController<NotificationParam, NotificationDto> {

    ResponseEntity<List<NotificationDto>> getUserNotifications(BasePagedParam<?> pagedParam);

}

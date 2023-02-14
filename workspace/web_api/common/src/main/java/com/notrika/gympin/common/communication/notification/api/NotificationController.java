package com.notrika.gympin.common.communication.notification.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationController extends BaseController<NotificationParam, NotificationDto, BaseQuery<?>> {

    ResponseEntity<List<NotificationDto>> getUserNotifications(BasePagedParam pagedParam);

}

package com.notrika.gympin.common.settings.notification.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationController extends BaseController<NotificationParam, NotificationDto, BaseQuery<?>> {

    ResponseEntity<List<NotificationDto>> getUserNotifications(BasePagedParam pagedParam);

}

package com.notrika.gympin.controller.impl.settings.notification;

import com.notrika.gympin.common.settings.notification.api.NotificationSubscriptionController;
import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.dto.NotificationSubscriptionDto;
import com.notrika.gympin.common.settings.notification.param.NotificationSubscriptionParam;
import com.notrika.gympin.common.settings.notification.query.NotificationSubscriptionQuery;
import com.notrika.gympin.common.settings.notification.service.NotificationSubscriptionService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/NotificationSubscription")
public class NotificationSubscriptionControllerImpl implements NotificationSubscriptionController {

    @Autowired
    private NotificationSubscriptionService notificationSubscriptionService;

    @Override
    public ResponseEntity<NotificationSubscriptionDto> add(NotificationSubscriptionParam param) {
        return ResponseEntity.ok(notificationSubscriptionService.add(param));
    }

    @Override
    public ResponseEntity<NotificationSubscriptionDto> update(NotificationSubscriptionParam corporateParam) {
        return ResponseEntity.ok(notificationSubscriptionService.update(corporateParam));
    }

    @Override
    public ResponseEntity<NotificationSubscriptionDto> delete(NotificationSubscriptionParam corporateParam) {
        return ResponseEntity.ok(notificationSubscriptionService.delete(corporateParam));
    }

    @Override
    public ResponseEntity<List<NotificationSubscriptionDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(notificationSubscriptionService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<NotificationSubscriptionDto> getById(Long id) {
        return ResponseEntity.ok(notificationSubscriptionService.getById(id));
    }


    @Override
    public ResponseEntity<Page<NotificationSubscriptionDto>> query(NotificationSubscriptionQuery param) {
        return null;
    }


}

package com.notrika.gympin.persistence.entity.management.notification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.settings.notification.enums.NotificationSubscriberStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "manageNotificationSubscribes")
public class ManageNotificationSubscribesEntity extends BaseEntityWithCreateUpdate<ManageNotificationSubscribesEntity> {

    @ManyToOne
    @JoinColumn(name = "notifUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;

    @Column(name ="AppName")
    public String appName;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private NotificationSubscriberStatus status;


    @Column(name = "endpoint")
    private String endpoint;

    @Column(name = "p256dh")
    private String p256dh;

    @Column(name = "auth")
    private String auth;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageNotificationSubscribesEntity that = (ManageNotificationSubscribesEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

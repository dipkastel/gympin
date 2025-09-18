package com.notrika.gympin.persistence.entity.management.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util.ApplicationEnum;
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
@Table(name = "manageChat")
public class ManageChatEntity extends BaseEntityWithCreateUpdate<ManageChatEntity> {

    @Column(name = "Message")
    private String message;

    @Column(name = "Username")
    private String username;

    @Column(name ="Sender")
    public String sender;

    @Column(name ="ChatId")
    public String chatId;

    @Column(name ="DriverId")
    public String driverId;

    @Column(name ="AppName")
    public String appName;

    @Column(name ="PhoneNumber")
    public String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "UserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageChatEntity that = (ManageChatEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

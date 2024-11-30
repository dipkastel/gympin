package com.notrika.gympin.persistence.entity.management.settings;

import com.notrika.gympin.common.settings.userSettings.enums.UserSettingTypesEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "manageUserSettings")
public class UserSettingsEntity extends BaseEntityWithCreateUpdate<UserSettingsEntity> {


    @Column(name = "settingKey", nullable = false)
    private UserSettingTypesEnum key;

    @Column(name = "settingValue")
    private String value;

    @Column(name = "settingData")
    private String data;

    @Column(name = "settingDescription")
    private String description;

    @ManyToOne
    @JoinColumn(name = "settingUserId")
    private UserEntity user;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserSettingsEntity that = (UserSettingsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

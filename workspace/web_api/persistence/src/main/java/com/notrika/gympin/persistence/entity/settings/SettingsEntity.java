package com.notrika.gympin.persistence.entity.settings;

import com.notrika.gympin.common.gympin.base.enums.settingsType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
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
@Table(name = "settings")
public class SettingsEntity extends BaseEntityWithCreateUpdate<SettingsEntity> {


    @Column(name = "settingKey", nullable = false)
    private String key;

    @Column(name = "settingValue")
    private String value;

    @Column(name = "settingData")
    private String data;

    @Column(name = "settingDescription")
    private String description;

    @Column(name = "settingType")
    @Enumerated(EnumType.STRING)
    private settingsType type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SettingsEntity that = (SettingsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

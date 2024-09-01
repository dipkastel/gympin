package com.notrika.gympin.persistence.entity.management.settings;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsEntity;
import com.notrika.gympin.persistence.entity.management.sms.ManageSmsPatternEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "manageSettings")
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


    @OneToMany(mappedBy = "provider",fetch = FetchType.LAZY)
   @JsonIgnore
@ToString.Exclude
    private List<ManageSmsPatternEntity> smsPatterns;

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

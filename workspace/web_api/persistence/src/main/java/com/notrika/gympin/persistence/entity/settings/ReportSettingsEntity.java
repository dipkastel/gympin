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
@Table(name = "reportSettings")
public class ReportSettingsEntity extends BaseEntityWithCreateUpdate<ReportSettingsEntity> {


    @Column(name = "reportSettingKey", nullable = false)
    private String key;

    @Column(name = "reportSettingValue")
    private String value;

    @Column(name = "reportSettingDescription")
    private String description;

    @Column(name = "updateAuto",columnDefinition = "boolean default true")
    private Boolean updateAuto;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ReportSettingsEntity that = (ReportSettingsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

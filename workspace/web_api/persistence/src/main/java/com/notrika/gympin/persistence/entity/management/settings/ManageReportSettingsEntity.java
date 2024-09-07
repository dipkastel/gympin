package com.notrika.gympin.persistence.entity.management.settings;

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
@Table(name = "manageReport")
public class ManageReportSettingsEntity extends BaseEntityWithCreateUpdate<ManageReportSettingsEntity> {


    @Column(name = "reportSettingKey", nullable = false)
    private String key;

    @Column(name = "reportSettingValue")
    private String value;

    @Column(name = "reportSettingDescription")
    private String description;

    @Column(name = "updateAuto",columnDefinition = "tinyint(1) default 0")
    private Boolean updateAuto;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageReportSettingsEntity that = (ManageReportSettingsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

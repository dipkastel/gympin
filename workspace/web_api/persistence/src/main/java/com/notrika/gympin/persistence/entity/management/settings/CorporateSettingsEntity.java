package com.notrika.gympin.persistence.entity.management.settings;

import com.notrika.gympin.common.settings.corporateSettings.enums.CorporateSettingTypesEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
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
@Table(name = "manageCorporateSettings")
public class CorporateSettingsEntity extends BaseEntityWithCreateUpdate<CorporateSettingsEntity> {


    @Column(name = "settingKey", nullable = false)
    private CorporateSettingTypesEnum key;

    @Column(name = "settingValue")
    private String value;

    @Column(name = "settingData")
    private String data;

    @Column(name = "settingDescription")
    private String description;

    @ManyToOne
    @JoinColumn(name = "settingCorporateId")
    private CorporateEntity corporate;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CorporateSettingsEntity that = (CorporateSettingsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

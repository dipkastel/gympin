package com.notrika.gympin.persistence.entity.management.sms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
import com.notrika.gympin.persistence.entity.sport.SportMultimediaEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "manageSmsPattern")
public class ManageSmsPatternEntity extends BaseEntityWithCreateUpdate<ManageSmsPatternEntity> {

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "PatternKey", nullable = false)
    private String patternKey;

    @Column(name = "PatternCode", nullable = false)
    private String patternCode;

    @Column(name = "Template", nullable = false)
    private String template;

    @Column(name = "SmsType", nullable = false)
    private SmsTypes smsTypes;

    @Column(name = "DelayInMin", nullable = false)
    private Integer delayInMin;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ProviderSettingId")
    @JsonIgnore
    private SettingsEntity provider;

    @OneToMany(mappedBy = "pattern",fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<ManageSmsEntity> smsList;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageSmsPatternEntity that = (ManageSmsPatternEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

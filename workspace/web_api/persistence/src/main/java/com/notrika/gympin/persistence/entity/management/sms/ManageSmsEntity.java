package com.notrika.gympin.persistence.entity.management.sms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.settings.sms.enums.SmsStatus;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.management.settings.SettingsEntity;
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
@Table(name = "manageSms")
public class ManageSmsEntity extends BaseEntityWithCreateUpdate<ManageSmsEntity> {

    @Column(name = "UserNumber", nullable = false)
    private String userNumber;

    @Column(name = "SmsStatus")
    @Enumerated(EnumType.STRING)
    private SmsStatus smsStatus;

    @Column(name = "sendTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date sendTime;

    @Column(name = "SmsTypes")
    @Enumerated(EnumType.STRING)
    private SmsTypes smsTypes;

    @Column(name = "Text1")
    private String text1;

    @Column(name = "Text2")
    private String text2;

    @Column(name = "Text3")
    private String text3;

    @Column(name = "Text4")
    private String text4;

    @Column(name = "SentBodyCode")
    private String sentBodyCode;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PatternId")
   @JsonIgnore
@ToString.Exclude
    private ManageSmsPatternEntity pattern;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageSmsEntity that = (ManageSmsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

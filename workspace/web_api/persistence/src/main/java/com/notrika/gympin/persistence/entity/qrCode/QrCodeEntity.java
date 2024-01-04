package com.notrika.gympin.persistence.entity.qrCode;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.qrCodes.enums.QrCodeType;
import com.notrika.gympin.common.sport.sport.enums.LaunchStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.sport.SportMultimediaEntity;
import com.notrika.gympin.persistence.entity.sport.option.sportOptionOfSportEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
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
@Table(name = "qrCode")
public class QrCodeEntity extends BaseEntity<QrCodeEntity> {

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "qrCodeType")
    @Enumerated(EnumType.STRING)
    private QrCodeType qrCodeType;

    @Column(name = "referenceId")
    private Long referenceId;

    @Column(name = "description")
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        QrCodeEntity sport = (QrCodeEntity) o;
        return getId() != null && Objects.equals(getId(), sport.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

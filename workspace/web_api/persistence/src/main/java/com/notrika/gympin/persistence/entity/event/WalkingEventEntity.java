package com.notrika.gympin.persistence.entity.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "walkingEvent")
public class WalkingEventEntity extends BaseEventEntity {

    @Column(name = "startLatitude", nullable = false)
    private double startLatitude;

    @Column(name = "startLongitude", nullable = false)
    private double startLongitude;

    @Column(name = "endLatitude", nullable = false)
    private double endLatitude;

    @Column(name = "endLongitude", nullable = false)
    private double endLongitude;

    @Lob
    @Column(name = "address")
    private String address;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        WalkingEventEntity entity = (WalkingEventEntity) o;
        return getId() != null && Objects.equals(getId(), entity.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

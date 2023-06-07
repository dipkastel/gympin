package com.notrika.gympin.persistence.entity.gate;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import com.notrika.gympin.persistence.entity.comment.CommentGateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelGateAccessEntity;
import com.notrika.gympin.persistence.entity.rating.RateGateEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "gate")
@PrimaryKeyJoinColumn(name = "id")
public class GateEntity extends BaseEntityWithCreateUpdate<GateEntity> {

    @Column(name = "name")
    private String name;

    @Column(name = "openingTime")
    private Time openingTime;

    @Column(name = "closingTime")
    private Time closingTime;

    @Column(name = "trafficManagement")
    private Boolean trafficManagement;

    @Column(name = "enable")
    private Boolean enable;

    @ManyToOne(cascade = CascadeType.ALL)
    private PlaceEntity place;

    @ManyToOne
    private SportEntity sport;

    @OneToMany(mappedBy = "gate")
    @ToString.Exclude
    private List<PlacePersonnelGateAccessEntity> placePersonnelGateAccess;

    @ManyToMany
    @JoinTable(name = "gateGuard", joinColumns = @JoinColumn(name = "gate_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    @ToString.Exclude
    private List<UserEntity> guard;

    @OneToMany(mappedBy = "gate")
    @ToString.Exclude
    private List<EnterGateEntity> enterGate;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<GateTimingEntity> gateTimings;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<GateTrafficEntity> gateTraffic;

    @ManyToMany
    @JoinTable(name = "gateOwner", joinColumns = @JoinColumn(name = "gate_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    @ToString.Exclude
    private List<UserEntity> owner;

    @OneToMany
    private List<CommentGateEntity> gateComments;

    @OneToMany
    private List<RateGateEntity> gateRates;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GateEntity that = (GateEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

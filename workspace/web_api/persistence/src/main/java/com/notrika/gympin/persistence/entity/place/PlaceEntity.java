package com.notrika.gympin.persistence.entity.place;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.location.LocationEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.note.NoteEntity;
import com.notrika.gympin.persistence.entity.place.comment.CommentPlaceEntity;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.rating.RatePlaceEntity;
import com.notrika.gympin.persistence.entity.sportplace.SportPlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.OptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "place")
public class PlaceEntity extends BaseEntityWithCreateUpdate<PlaceEntity> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PlaceStatusEnum status;

    @Column(name = "commissionFee")
    private double commissionFee;

    @Column(name = "balance", nullable = false, columnDefinition = "BigDecimal default 0")
    private BigDecimal balance;

    @Column(name = "address")
    private String address;

    @Column(name = "inviteCode")
    private String inviteCode;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id")
    @JsonIgnore
    private LocationEntity location;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<OptionOfPlaceEntity> optionsOfPlaces;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<SupportEntity> support;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlaceAboutEntity> aboutPlaces;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlaceQrMessageEntity> qrMessages;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlacePersonnelEntity> placeOwners;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<SportPlaceEntity> sportPlaces;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<GateEntity> gates;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<PlanEntity> plans;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<NoteEntity> notes;

    @OneToMany(mappedBy = "place")
    @ToString.Exclude
    private List<TransactionEntity> transactions;

    @OneToMany
    private List<CommentPlaceEntity> placeComments;

    @OneToMany
    private List<RatePlaceEntity> placeRates;

    @ManyToMany
    @JoinTable(name = "placeImage", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "multimedia_id"))
    @ToString.Exclude
    private List<MultimediaEntity> multimedias;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceEntity place = (PlaceEntity) o;

        return Objects.equals(getId(), place.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

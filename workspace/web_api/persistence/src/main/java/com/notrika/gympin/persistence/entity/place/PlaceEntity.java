package com.notrika.gympin.persistence.entity.place;

import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.comment.PlaceCommentEntity;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;
import com.notrika.gympin.persistence.entity.place.rating.PlaceRateEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.sport.placeSport.PlaceSportEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
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

    @Column(name = "balance", nullable = false, columnDefinition = "decimal(19,2) default 0")
    private BigDecimal balance;

    @Column(name = "Tell")
    private String tell;

    @Column(name = "CallUs", nullable = false, columnDefinition = "bit default 0")
    private boolean callUs;

    @Column(name = "address")
    private String address;

    @Column(name = "activeTimes", columnDefinition = "varchar(800)")
    private String activeTimes;

    @Column(name = "inviteCode")
    private String inviteCode;

    @Column(name = "autoDiscount", nullable = false, columnDefinition = "bit default 1")
    private boolean autoDiscount;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "locationId")
    @ToString.Exclude
    private ManageLocationEntity location;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PlaceOptionOfPlaceEntity> optionsOfPlaces;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<SupportEntity> support;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PlaceAboutEntity> aboutPlaces;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PlaceQrMessageEntity> qrMessages;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PlacePersonnelEntity> placeOwners;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<PlaceSportEntity> placeSport;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<HallEntity> halls;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<BuyableEntity> buyables;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<InvoiceBuyableEntity> invoiceBuyables;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<ManageNoteEntity> notes;

    @OneToMany(mappedBy = "place",fetch = FetchType.LAZY)
    private List<PlaceCommentEntity> placeComments;

    @OneToMany(mappedBy = "place",fetch = FetchType.LAZY)
    private List<PlaceRateEntity> placeRates;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    private List<PurchasedBaseEntity> purchased;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FinanceUserTransactionEntity> userTransactions;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "placeImage", joinColumns = @JoinColumn(name = "multimediaPlaceId"), inverseJoinColumns = @JoinColumn(name = "multimediaId"))
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

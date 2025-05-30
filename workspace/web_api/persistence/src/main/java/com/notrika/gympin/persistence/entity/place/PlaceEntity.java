package com.notrika.gympin.persistence.entity.place;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.place.placeBase.enums.PlaceTypesEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.management.location.ManageLocationEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;
import com.notrika.gympin.persistence.entity.place.about.PlaceAboutEntity;
import com.notrika.gympin.persistence.entity.place.comment.PlaceCommentEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.rating.PlaceRateEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
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
@Table(name = "place")
@Inheritance(strategy = InheritanceType.JOINED)
public class PlaceEntity<P> extends BaseEntityWithCreateUpdate<P> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PlaceStatusEnum status;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private PlaceTypesEnum type;

    @Column(name = "Tell")
    private String tell;


    @Column(name = "address")
    private String address;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "locationId")
    @JsonIgnore
    @ToString.Exclude
    private ManageLocationEntity location;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<SupportEntity> support;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceAboutEntity> aboutPlaces;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlacePersonnelEntity> placeOwners;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<TicketSubscribeEntity> ticketSubscribes;

    @OneToMany(mappedBy = "placeGym", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<InvoiceBuyableEntity> invoiceBuyables;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<ManageNoteEntity> notes;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    private List<PlaceCommentEntity> placeComments;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    private List<PlaceRateEntity> placeRates;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    private List<PurchasedBaseEntity> purchased;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceUserTransactionEntity> userTransactions;

    @OneToMany(mappedBy = "place" , fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceUserEntity> financeUsers;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "placeTags", joinColumns = @JoinColumn(name = "placeId"), inverseJoinColumns = @JoinColumn(name = "tagId"))
    @JsonIgnore
    @ToString.Exclude
    private List<ManageTagsEntity> tags;

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

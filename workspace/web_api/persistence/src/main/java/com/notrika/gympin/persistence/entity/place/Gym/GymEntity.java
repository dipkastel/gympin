package com.notrika.gympin.persistence.entity.place.Gym;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.authCodes.PlaceContractCodeEntity;
import com.notrika.gympin.persistence.entity.finance.affiliate.FinanceAffiliatorEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeGym")
public class GymEntity extends PlaceEntity<GymEntity> {


    @Column(name = "ContractData", columnDefinition = "varchar(2000)")
    private String contractData;

    @Column(name = "listOrder")
    private Short order;

    @Column(name = "hasContract", nullable = false, columnDefinition = "bit default 0")
    private boolean hasContract;

    @Column(name = "CallUs", nullable = false, columnDefinition = "bit default 0")
    private boolean callUs;

    @Column(name = "activeTimes", columnDefinition = "varchar(800)")
    private String activeTimes;

    @Column(name = "inviteCode")
    private String inviteCode;

    @Column(name = "autoDiscount", nullable = false, columnDefinition = "bit default 1")
    private boolean autoDiscount;

    @Column(name = "searchStr", columnDefinition = "varchar(12000)")
    private String searchStr;


    @OneToOne(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private PlaceContractCodeEntity contractCode;

    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<OptionOfGymEntity> optionsOfPlaces;


    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceQrMessageEntity> qrMessages;


    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<GymSportEntity> placeSport;


    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private FinanceAffiliatorEntity affiliator;

    @JsonIgnore
    public List<TicketSubscribeEntity> getTicketSubscribes() {
        if(getBuyables()==null) return new ArrayList<>();
        return getBuyables().stream()
                .filter(b -> b instanceof TicketSubscribeEntity)
                .map(b -> (TicketSubscribeEntity) b)
                .collect(Collectors.toList());
    }

    public void addTicketSubscribe(TicketSubscribeEntity ticket) {
        addBuyable(ticket);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GymEntity place = (GymEntity) o;

        return Objects.equals(getId(), place.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

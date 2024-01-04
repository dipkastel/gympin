package com.notrika.gympin.persistence.entity.sport.placeSport;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.sport.SportEntity;
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
@Table(name = "placeSport")
public class PlaceSportEntity extends BaseEntityWithCreateUpdate<PlaceSportEntity> {

    @ManyToOne
    @JoinColumn(name = "placeSportId")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "sportId")
    private SportEntity sport;

    @ManyToMany(mappedBy = "ticketSubscribeSport")
    @ToString.Exclude
    private List<TicketSubscribeEntity> ticketSubscribes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceSportEntity that = (PlaceSportEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

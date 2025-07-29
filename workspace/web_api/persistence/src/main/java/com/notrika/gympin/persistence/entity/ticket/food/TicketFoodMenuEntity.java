package com.notrika.gympin.persistence.entity.ticket.food;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.ticket.ticketFood.enums.FoodItemStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "ticketFoodMenu")
public class TicketFoodMenuEntity extends BaseEntityWithCreateUpdate<TicketFoodMenuEntity> {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "TicketFoodId")
    @JsonIgnore
    @ToString.Exclude
    private TicketFoodItemEntity foodItem;

    @Column(name = "date")
    private Date date;

    @Column(name = "foodItemStatus")
    @Enumerated(EnumType.STRING)
    private FoodItemStatus foodItemStatus;

    @Column(name = "category")
    private String category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketFoodMenuEntity that = (TicketFoodMenuEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

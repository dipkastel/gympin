package com.notrika.gympin.persistence.entity.ticket;

import com.notrika.gympin.common.athlete.gate.enums.TicketEntryStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "ticketEntryMessage")
public class TicketEntryMessageEntity extends BaseEntityWithCreateUpdate<TicketEntryMessageEntity> {

    @ManyToOne
    private TicketEntryEntity ticketEntry;

    @Column(name = "message")
    private String message;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketEntryMessageEntity that = (TicketEntryMessageEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

package com.notrika.gympin.persistence.entity.ticket;

import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
import com.notrika.gympin.common.ticket.enums.TicketStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.note.NoteEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.plan.PlanGateTimingEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "ticket")
public class TicketEntity extends BaseEntityWithCreateUpdate<TicketEntity> {

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private PlanEntity plan;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "planName")
    private String planName;

    @Column(name = "paymentSerial")
    private String paymentSerial;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "description")
    private String description;

    @Column(name = "entryTotalCount", nullable = false)
    private Short entryTotalCount;

    @Column(name = "planExpireDate")
    private Date planExpireDate;

    @Column(name = "expireDate")
    private Date expireDate;

    @OneToMany(mappedBy = "ticket")
    @ToString.Exclude
    private List<TicketEntryEntity> entryList;

    @OneToMany(mappedBy = "ticket")
    @ToString.Exclude
    private List<NoteEntity> notes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TicketEntity that = (TicketEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

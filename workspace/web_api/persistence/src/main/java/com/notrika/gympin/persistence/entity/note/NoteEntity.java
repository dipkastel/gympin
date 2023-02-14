package com.notrika.gympin.persistence.entity.note;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.common.note.enums.NoteType;
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
@Table(name = "noteEntity")
public class NoteEntity extends BaseEntityWithCreateUpdate<NoteEntity> {


    @Column(name = "text")
    private String text;

    @Column(name = "Type")
    @Enumerated(EnumType.STRING)
    private NoteType type;

    @Column(name = "isToDo")
    private Boolean isToDo;

    @ManyToOne
    private CorporateEntity corporate;

    @ManyToOne
    private PlaceEntity place;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private TicketEntity ticket;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        NoteEntity that = (NoteEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

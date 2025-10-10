package com.notrika.gympin.persistence.entity.management.note;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.settings.note.enums.NoteType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
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
@Table(name = "manageNote")
public class ManageNoteEntity extends BaseEntityWithCreateUpdate<ManageNoteEntity> {


    @Column(name = "text")
    private String text;

    @Column(name = "Type")
    @Enumerated(EnumType.STRING)
    private NoteType type;

    @Column(name = "isToDo")
    private Boolean isToDo;

    @ManyToOne
    @JoinColumn(name = "corporateId")
    @JsonIgnore
    @ToString.Exclude
    private CorporateEntity corporate;

    @ManyToOne
    @JoinColumn(name = "notePlaceId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceGymEntity place;

    @ManyToOne
    @JoinColumn(name = "noteUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "noteInvoiceId")
    @JsonIgnore
    @ToString.Exclude
    private InvoiceEntity invoice;

    @ManyToOne
    @JoinColumn(name = "purchasedId")
    @JsonIgnore
    @ToString.Exclude
    private PurchasedBaseEntity purchased;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageNoteEntity that = (ManageNoteEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

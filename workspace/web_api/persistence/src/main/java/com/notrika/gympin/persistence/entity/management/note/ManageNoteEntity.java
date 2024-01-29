package com.notrika.gympin.persistence.entity.management.note;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.common.settings.note.enums.NoteType;
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
    private CorporateEntity corporate;

    @ManyToOne
    @JoinColumn(name = "notePlaceId")
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "noteUserId")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "noteInvoiceId")
    private InvoiceEntity invoice;

    @ManyToOne
    @JoinColumn(name = "purchasedId")
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

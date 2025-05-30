package com.notrika.gympin.persistence.entity.place.qrMessage;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
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
@Table(name = "placeQrMessage")
public class PlaceQrMessageEntity extends BaseEntityWithCreateUpdate<PlaceQrMessageEntity> {

    @ManyToOne
    @JoinColumn(name = "qrplaceId")
    private PlaceGymEntity place;


    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "replaceText", nullable = false)
    private String replaceText;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PlaceQrMessageEntity that = (PlaceQrMessageEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

package com.notrika.gympin.persistence.entity.management.tags;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.settings.sms.enums.SmsTypes;
import com.notrika.gympin.common.settings.tag.enums.TagTypes;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
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
@Table(name = "manageTags")
public class ManageTagsEntity extends BaseEntityWithCreateUpdate<ManageTagsEntity> {


    @Column(name = "name")
    private String name;

    @Column(name = "priority")
    private Short priority;

    @Column(name = "tagTypes")
    @Enumerated(EnumType.STRING)
    private TagTypes tagTypes;


    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceEntity> places;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ManageTagsEntity that = (ManageTagsEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

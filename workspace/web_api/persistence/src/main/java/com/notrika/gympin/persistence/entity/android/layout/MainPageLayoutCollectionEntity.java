package com.notrika.gympin.persistence.entity.android.layout;

import com.notrika.gympin.persistence.entity.BaseEntity;
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
@Table(name = "main_page_layout_collection")
public class MainPageLayoutCollectionEntity extends BaseEntity<MainPageLayoutCollectionEntity> {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @JoinTable(name = "main_page_layout_item_collection", joinColumns = @JoinColumn(name = "main_page_layout_collection_id"), inverseJoinColumns = @JoinColumn(name =
            "main_page_layout_item_id"))
    @ToString.Exclude
    private List<MainPageLayoutItemEntity> items;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MainPageLayoutCollectionEntity entity = (MainPageLayoutCollectionEntity) o;
        return getId() != null && Objects.equals(getId(), entity.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

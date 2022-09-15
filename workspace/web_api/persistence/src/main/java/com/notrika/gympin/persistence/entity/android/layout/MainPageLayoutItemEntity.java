package com.notrika.gympin.persistence.entity.android.layout;

import com.notrika.gympin.common.android.gympin.layout.enums.MainPageLayoutItemType;
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
@Table(name = "main_page_layout_item")
public class MainPageLayoutItemEntity extends BaseEntity<MainPageLayoutItemEntity> {

    @Column(updatable = false, name = "type")
    @Enumerated(EnumType.STRING)
    private MainPageLayoutItemType type;

    @Column(name = "priority", nullable = false, unique = true)
    private Integer priority;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @JoinTable(name = "main_page_layout_item_child_item", joinColumns = @JoinColumn(name = "main_page_layout_item_id"), inverseJoinColumns = @JoinColumn(name =
            "main_page_layout_child_item_id"))
    @ToString.Exclude
    private List<MainPageLayoutChildItemEntity> items;

    @ManyToMany(mappedBy = "items")
    @ToString.Exclude
    private List<MainPageLayoutCollectionEntity> collections;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MainPageLayoutItemEntity that = (MainPageLayoutItemEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

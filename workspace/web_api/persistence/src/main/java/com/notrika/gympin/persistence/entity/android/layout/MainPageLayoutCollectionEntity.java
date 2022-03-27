package com.notrika.gympin.persistence.entity.android.layout;

import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "main_page_layout_collection")
public class MainPageLayoutCollectionEntity extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @JoinTable(name = "main_page_layout_item_collection", joinColumns = @JoinColumn(name = "main_page_layout_collection_id"), inverseJoinColumns = @JoinColumn(name =
            "main_page_layout_item_id"))
    private List<MainPageLayoutItemEntity> items;
}

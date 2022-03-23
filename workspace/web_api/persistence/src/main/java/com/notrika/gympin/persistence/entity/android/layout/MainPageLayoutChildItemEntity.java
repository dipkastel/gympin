package com.notrika.gympin.persistence.entity.android.layout;

import com.notrika.gympin.common.android.gympin.layout.enums.MainPageChildItemDestination;
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
@Table(name = "main_page_layout_child_item")
public class MainPageLayoutChildItemEntity extends BaseEntity {

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "destination")
    @Enumerated(EnumType.STRING)
    private MainPageChildItemDestination destination;

    @Column(name = "data")
    private String data;

    @Column(name = "priority")
    private Integer priority;

    @ManyToMany(mappedBy = "items")
    private List<MainPageLayoutItemEntity> mainPages;
}

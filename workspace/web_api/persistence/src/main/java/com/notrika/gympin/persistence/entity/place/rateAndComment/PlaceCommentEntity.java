package com.notrika.gympin.persistence.entity.place.rateAndComment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.place.placeBase.enums.PlaceCommentStatusEnum;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
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
@Table(name = "placeComment")
public class PlaceCommentEntity extends BaseEntityWithCreateUpdate<PlaceCommentEntity> {

    @ManyToOne
    @JoinColumn(name = "commentPlaceId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "commentUserId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;

    private String comment;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PlaceCommentStatusEnum status;

    @ManyToOne
    @JoinColumn(name = "parentId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceCommentEntity parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceCommentEntity> childs;

}

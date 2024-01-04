package com.notrika.gympin.persistence.entity.place.comment;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;

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
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "commentUserId")
    private UserEntity user;

    private String comment;

    private Date date;

}

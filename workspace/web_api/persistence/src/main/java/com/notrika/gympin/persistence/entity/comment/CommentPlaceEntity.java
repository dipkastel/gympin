package com.notrika.gympin.persistence.entity.comment;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.location.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "comment_place")
public class CommentPlaceEntity extends BaseEntityWithCreateUpdate<CommentPlaceEntity> {

    @ManyToOne
    private PlaceEntity place;

    @ManyToOne
    private UserEntity user;

    private String comment;

    private Date date;

}

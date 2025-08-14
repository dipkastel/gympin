package com.notrika.gympin.persistence.entity.place.rateAndComment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeRate")
public class PlaceRateEntity extends BaseEntityWithCreateUpdate<PlaceRateEntity> {

    @ManyToOne
    @JoinColumn(name = "placeId")
    @JsonIgnore
    @ToString.Exclude
    private PlaceEntity place;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    @ToString.Exclude
    private UserEntity user;


    private Double rate;

}

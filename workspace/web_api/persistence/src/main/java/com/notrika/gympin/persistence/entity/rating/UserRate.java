package com.notrika.gympin.persistence.entity.rating;

import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "user_rate")
public class UserRate extends BaseEntity {

    @ManyToOne
    private User judgerUser;

    @ManyToOne
    private User judgingUser;

    @Column(name = "rate")
    private Integer rate;

}

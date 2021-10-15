package com.notrika.gympin.dao.location;

import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "place_owner")
public class PlaceOwner extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
}

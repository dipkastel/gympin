package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.persistence.entity.BaseEntity;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;

public class Role extends BaseEntity {

    @OneToMany(cascade = CascadeType.ALL)
    private User user;
}

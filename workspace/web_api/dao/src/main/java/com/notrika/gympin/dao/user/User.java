package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.UserRoles;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

//import lombok.Data;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User extends BaseEntity {

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private UserRoles userRoles = UserRoles.USER;

    @Column(unique = true)
    private String username;

    private String phoneNumber;



}


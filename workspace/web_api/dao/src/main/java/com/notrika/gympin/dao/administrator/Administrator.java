package com.notrika.gympin.dao.administrator;

import com.notrika.gympin.common.user.enums.AdminRoles;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "administrator")
public class Administrator extends BaseEntity {

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private AdminRoles administratorRoles = AdminRoles.ADMIN;

    @Column(unique = true)
    private String administratorname;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;


}


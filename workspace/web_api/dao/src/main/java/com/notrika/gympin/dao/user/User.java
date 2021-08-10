package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.UserRoles;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

//import lombok.Data;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private UserRoles userRoles = UserRoles.USER;

    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date CreatedDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date UpdatedDate = new Date();

    @Column(unique = true)
    private String username;

    private String phoneNumber;



}


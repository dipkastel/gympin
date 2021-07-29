package com.notrika.gympin.dao.user;

import com.notrika.gympin.dao.user.enums.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
//import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Data
@NoArgsConstructor
@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date CreatedDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date UpdatedDate = new Date();

    @Column(unique = true)
    private String username;

    @Column(name = "phone_number")
    private String phoneNumber;

}


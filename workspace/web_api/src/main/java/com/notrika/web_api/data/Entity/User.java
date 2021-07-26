package com.notrika.web_api.data.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
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

    private String phoneNumber;


}


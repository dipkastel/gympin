package com.notrika.gympin.dao;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Data
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date CreatedDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date UpdatedDate = new Date();

    private boolean isDeleted = false;
    

}

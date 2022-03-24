package com.notrika.gympin.persistence.entity;

import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntityWithCreate extends BaseEntity  {

    @Column(name = "create_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    //        @Column(name = "creator_user")
    @ManyToOne(cascade = CascadeType.MERGE)
    private User creatorUser;
}

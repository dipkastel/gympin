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
public class BaseEntityWithCreateUpdate extends BaseEntityWithCreate {

        @Column(name = "updated_date")
        @Temporal(TemporalType.TIMESTAMP)
        private Date updatedDate;

//        @Column(name = "updater_user")
        @ManyToOne(cascade = CascadeType.MERGE)
        private User updaterUser;

}

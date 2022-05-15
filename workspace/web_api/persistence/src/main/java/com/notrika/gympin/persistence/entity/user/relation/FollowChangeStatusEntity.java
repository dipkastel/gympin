package com.notrika.gympin.persistence.entity.user.relation;

import com.notrika.gympin.common.relation.enums.FollowingStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
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
@Entity
@Table(name = "change_follow_status")
public class FollowChangeStatusEntity extends BaseEntity {

    @ManyToOne
    private FollowEntity follow;

    @Column(name = "pre_status")
    @Enumerated(EnumType.STRING)
    private FollowingStatus preStatus;

    @Column(name = "new_status")
    @Enumerated(EnumType.STRING)
    private FollowingStatus newStatus;

    @Column(name = "change_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date changeDate;

}

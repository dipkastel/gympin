package com.notrika.gympin.persistence.entity.user.relation;

import com.notrika.gympin.common.relation.enums.FollowingStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "follow")
public class FollowEntity extends BaseEntity {

    @ManyToOne
    @ToString.Exclude
    private User requesterUser;

    @ManyToOne()
    @ToString.Exclude
    private User requestedUser;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private FollowingStatus status;

    @OneToMany(mappedBy = "follow")
    @Column(name = "change_follow_status")
    @ToString.Exclude
    private List<FollowChangeStatusEntity> followChangeStatus;
}

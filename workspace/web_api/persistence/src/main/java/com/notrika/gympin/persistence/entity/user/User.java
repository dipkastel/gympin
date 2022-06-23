package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreate;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCode;
import com.notrika.gympin.persistence.entity.communication.notification.NotificationEntity;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.location.PlaceOwner;
import com.notrika.gympin.persistence.entity.multimedia.Multimedia;
import com.notrika.gympin.persistence.entity.multimedia.UserMultimediaEntity;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.rating.UserRate;
import com.notrika.gympin.persistence.entity.security.service.ServiceExecution;
import com.notrika.gympin.persistence.entity.user.relation.FollowEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "user")
public class User extends BaseEntityWithCreate {

    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(unique = true, name = "username")
    private String username;

    @Column(unique = true, name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "nationalCode")
    private String nationalCode;

    @Column(name = "email")
    private String email;

    @Column(updatable = false, name = "user_group", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserGroup userGroup;

    @ToString.Exclude
    //    @OneToMany(mappedBy = "user")
    //    @ToString.Exclude
    @ManyToMany
    @JoinTable(name = "role_user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> userRole;

    //    @Where(clause = "deleted=0 and expired=0")
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Password> password;

    @Column(updatable = false, nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Column(name = "bio", length = 250)
    private String bio;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<PlaceOwner> placeOwners;

    //    @Where(clause = "expiredDate<=CURRENT_DATE")
    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    @ToString.Exclude
    private ActivationCode activationCode;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    //@OrderBy("expireDate desc")
    //@Where(clause = "userTokens.tokenStatus='ACTIVE'")
    @Where(clause = "token_status='ACTIVE'")
    @ToString.Exclude
    private Set<UserToken> userTokens;

    @OneToMany
    @ToString.Exclude
    private Set<ServiceExecution> serviceExecutions;

    @OneToMany
    @ToString.Exclude
    private Set<Multimedia> multimediaSet;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<EventParticipantEntity> participants;

    @OneToMany(mappedBy = "requesterUser")
    @ToString.Exclude
    private List<FollowEntity> followings;

    @OneToMany(mappedBy = "requestedUser")
    @ToString.Exclude
    private List<FollowEntity> followers;

    @OneToMany(mappedBy = "judgingUser")
    @ToString.Exclude
    private List<UserRate> judged;

    @OneToMany(mappedBy = "judgerUser")
    @ToString.Exclude
    private List<UserRate> hasJudged;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<UserMultimediaEntity> userMultimedias;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<NotificationEntity> notifs;

    @OneToOne(mappedBy = "user")
    private PlanRegisterEntity registeredPlan;

    @Transient
    private Float rate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;

        return Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return 562048007;
    }
}


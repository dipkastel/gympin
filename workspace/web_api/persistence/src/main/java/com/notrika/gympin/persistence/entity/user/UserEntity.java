package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.common.user.enums.Gender;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCodeEntity;
import com.notrika.gympin.persistence.entity.athlete.gate.EnterGateEntity;
import com.notrika.gympin.persistence.entity.comment.CommentGateEntity;
import com.notrika.gympin.persistence.entity.communication.notification.NotificationEntity;
import com.notrika.gympin.persistence.entity.event.EventParticipantEntity;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.note.NoteEntity;
import com.notrika.gympin.persistence.entity.place.comment.CommentPlaceEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.plan.PlanRegisterEntity;
import com.notrika.gympin.persistence.entity.rating.RateGateEntity;
import com.notrika.gympin.persistence.entity.rating.RatePlaceEntity;
import com.notrika.gympin.persistence.entity.rating.UserRateEntity;
import com.notrika.gympin.persistence.entity.security.service.ServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import com.notrika.gympin.persistence.entity.user.relation.FollowEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.math.BigDecimal;
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
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(name = "username", columnNames = {"username"}),
        @UniqueConstraint(name = "phoneNumber", columnNames = {"phoneNumber"})
})
@PrimaryKeyJoinColumn(name = "id")
public class UserEntity extends BaseEntityWithCreateUpdate<UserEntity> {

    @Column(name = "fullName")
    private String fullName;

    @Column(unique = true, name = "username")
    private String username;

    @Column(unique = true, name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "nationalCode")
    private String nationalCode;

    @Column(name = "email")
    private String email;

    @Column(name = "balance", nullable = false, columnDefinition = "BigDecimal default 0")
    private BigDecimal Balance;

    @Column(name = "userGroup", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserGroup userGroup;

    @Column(name = "userRole", nullable = false, columnDefinition = "varchar(60) default 'USER'")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(name = "invitedBy")
    private String invitedBy;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<PasswordEntity> password;

    @Column(name = "userStatus")
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Column(name = "bio", length = 250)
    private String bio;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<PlacePersonnelEntity> placePersonnel;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<SupportEntity> support;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<TransactionEntity> transactions;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    @ToString.Exclude
    private ActivationCodeEntity activationCode;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    //@OrderBy("expireDate desc")
    //@Where(clause = "userTokens.tokenStatus='ACTIVE'")
    @Where(clause = "token_status='ACTIVE'")
    @ToString.Exclude
    private Set<UserTokenEntity> userTokens;

    @OneToMany
    @ToString.Exclude
    private Set<ServiceExecutionEntity> serviceExecutions;

    @OneToMany
    @ToString.Exclude
    private Set<MultimediaEntity> multimediaSet;

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
    private List<UserRateEntity> judged;

    @OneToMany(mappedBy = "judgerUser")
    @ToString.Exclude
    private List<UserRateEntity> hasJudged;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<UserMultimediaEntity> userMultimedias;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<NotificationEntity> notifs;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<NoteEntity> notes;

    @OneToOne
    @ToString.Exclude
    private MultimediaEntity userAvatar;

    @OneToOne(mappedBy = "user")
    @ToString.Exclude
    private PlanRegisterEntity registeredPlan;

    @ManyToMany(mappedBy = "guard")
    @ToString.Exclude
    private List<GateEntity> gates;

    @OneToMany(mappedBy = "athlete")
    @ToString.Exclude
    private List<EnterGateEntity> enterGateAthlete;

    @OneToMany(mappedBy = "guard")
    @ToString.Exclude
    private List<EnterGateEntity> enterGateGuard;

    @OneToMany(mappedBy = "acceptedBy")
    @ToString.Exclude
    private List<TicketEntryEntity> entranceAcceptes;

    @OneToMany
    private List<CommentGateEntity> gateComments;

    @OneToMany
    private List<CommentPlaceEntity> placeComments;

    @OneToMany
    private List<RateGateEntity> gateRates;

    @OneToMany
    private List<RatePlaceEntity> placeRates;

    @Transient
    private Float rate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserEntity user = (UserEntity) o;

        return Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}


package com.notrika.gympin.persistence.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.user.user.enums.UserGroup;
import com.notrika.gympin.common.user.user.enums.UserStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.finance.affiliate.FinanceAffiliatorEntity;
import com.notrika.gympin.persistence.entity.finance.user.requests.FinanceIncreaseUserDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.user.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.user.FinanceUserEntity;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import com.notrika.gympin.persistence.entity.management.notification.ManageNotificationEntity;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.management.settings.UserSettingsEntity;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.place.comment.PlaceCommentEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.place.rating.PlaceRateEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryRequstEntity;
import com.notrika.gympin.persistence.entity.support.SupportEntity;
import com.notrika.gympin.persistence.entity.ticket.course.TicketCourseEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
import com.notrika.gympin.persistence.entity.authCodes.UserActivationCodeEntity;
import com.notrika.gympin.persistence.entity.user.relation.UserFollowEntity;
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
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"phoneNumber"})
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

    @Column(name = "userGroup", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserGroup userGroup;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<UserRolesEntity> userRoles;

    @Column(name = "invitedBy")
    private String invitedBy;

    @Column(name = "userStatus")
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Column(name = "bio", length = 250)
    private String bio;

    @Transient
    private Float rate;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<UserPasswordEntity> password;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<PlacePersonnelEntity> placePersonnel;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<SupportEntity> support;

    @OneToMany(mappedBy = "user" , fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceUserEntity> financeUser;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private UserActivationCodeEntity activationCode;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private FinanceAffiliatorEntity affiliate;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @Where(clause = "token_status='ACTIVE'")
    @JsonIgnore
    @ToString.Exclude
    private Set<UserTokenEntity> userTokens;

    @OneToMany(mappedBy = "executorUser", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<ManageServiceExecutionEntity> serviceExecutions;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<MultimediaEntity> multimediaSet;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<UserSettingsEntity> settings;

    @OneToMany(mappedBy = "requesterUser", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<UserFollowEntity> followings;

    @OneToMany(mappedBy = "requestedUser", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<UserFollowEntity> followers;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<UserMultimediaEntity> userMultimedias;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<ManageNotificationEntity> notifs;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<ManageNoteEntity> notes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<ManageGiftCreditEntity> gifts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private MultimediaEntity userAvatar;


    @OneToMany(mappedBy = "requester", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PurchasedSubscribeEntryRequstEntity> enterHallAthlete;

    @OneToMany(mappedBy = "acceptedBy", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PurchasedSubscribeEntryEntity> entranceAcceptes;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<CorporatePersonnelEntity> corporatesPersonel;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<FinanceIncreaseUserDepositRequestEntity> userIncreases;


    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PurchasedBaseEntity> userPurchased;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceCommentEntity> placeComments;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<PlaceRateEntity> placeRates;


    @ManyToMany(mappedBy = "coaches", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<TicketCourseEntity> ticketsCourseCoach;

    @ManyToMany(mappedBy = "coaches", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<TicketSubscribeEntity> ticketsSubscribeCoach;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<InvoiceEntity> invoices;

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


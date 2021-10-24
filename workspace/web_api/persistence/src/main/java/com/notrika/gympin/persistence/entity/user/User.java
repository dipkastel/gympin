package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.persistence.entity.BaseEntity;
import com.notrika.gympin.persistence.entity.activationCode.ActivationCode;
import com.notrika.gympin.persistence.entity.location.PlaceOwner;
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
public class User extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(unique = true,name = "username")
    private String username;

    @Column(unique = true,name = "phoneNumber",nullable = false)
    private String phoneNumber;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "nationalCode")
    private String nationalCode;

    @Column(name = "email")
    private String email;

    @Column(updatable = false,name = "user_group",nullable = false)
    @Enumerated(EnumType.STRING)
    private UserGroup userGroup;

    @Column(updatable = false,name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

//    @Where(clause = "deleted=0 and expired=0")
    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
    private List<Password> password;

    @Column(updatable = false,nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

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


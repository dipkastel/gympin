package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.activationCode.ActivationCode;
import com.notrika.gympin.dao.location.PlaceOwner;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "user")
public class User extends BaseEntity implements UserDetails {

    @Column
    private String name;

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private UserGroup userGroup;

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String phoneNumber;

    @Column(updatable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private Set<PlaceOwner> placeOwners;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @ToString.Exclude
    private Set<ActivationCode> activationCodes;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    //@OrderBy("expireDate desc")
    //@Where(clause = "userTokens.tokenStatus='ACTIVE'")
    @Where(clause = "token_status='ACTIVE'")
    @ToString.Exclude
    private Set<UserToken> userTokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userRole.name()));
        return authorities;
    }


    @Override
    public String getPassword() {
        ActivationCode activationCode = activationCodes.stream().findAny().orElse(null);
        if (activationCode != null)
            return activationCode.getCode();

        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isDeleted();
    }

    @Override
    public boolean isAccountNonLocked() {
        return !userStatus.equals(UserStatus.LOCKED);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        UserToken userToken = userTokens.stream().findFirst().orElse(null);
        if (userToken == null)
            return true;

        return !userToken.getExpireDate().before(new Date());
    }

    @Override
    public boolean isEnabled() {
        return userStatus.equals(UserStatus.ENABLED);
    }

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


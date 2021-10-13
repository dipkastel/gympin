package com.notrika.gympin.dao.administrator;

import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.dao.BaseEntity;
import com.notrika.gympin.dao.activationCode.ActivationCode;
import com.notrika.gympin.dao.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "administrator")
public class Administrator extends BaseEntity implements UserDetails {

    @OneToOne
    @MapsId
    private User baseUser;

    @Column(unique = true)
    private String administratorName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(baseUser.getUserRole().name()));
        return authorities;
    }


    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return baseUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isDeleted();
    }

    @Override
    public boolean isAccountNonLocked() {
        return !baseUser.getUserStatus().equals(UserStatus.LOCKED);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return baseUser.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return baseUser.getUserStatus().equals(UserStatus.ENABLED);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Administrator that = (Administrator) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return 1785962647;
    }
}


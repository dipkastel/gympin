package com.notrika.gympin.persistence.entity.user;

import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.BaseEntity;
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
@Table(name = "role")
public class Role extends BaseEntity {

    @Column(updatable = false,name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @ToString.Exclude
    @ManyToMany//(cascade = CascadeType.ALL)
//    @JoinColumn(name = "user_id",nullable = false)
    @JoinTable(name = "role_user_role",
    joinColumns = @JoinColumn(name = "role_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;
}

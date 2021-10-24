package com.notrika.gympin.persistence.entity.security;

import com.notrika.gympin.common.user.enums.UserRole;
import com.notrika.gympin.persistence.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "service_user")
public class ServiceUser extends BaseEntity {

    @Column(name = "user_role")
    private UserRole userRole;

}

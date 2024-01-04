package com.notrika.gympin.persistence.entity.support;

import com.notrika.gympin.common.support.enums.SupportMessageStatus;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "supportMessage")
public class SupportMessagesEntity extends BaseEntityWithCreateUpdate<SupportMessagesEntity> {

    @ManyToOne
    @JoinColumn(name = "supportId")
    private SupportEntity support;

    @ManyToOne
    @JoinColumn(name = "supportUserId")
    private UserEntity user;

    @Column(name = "supportMessageStatus")
    @Enumerated(EnumType.STRING)
    private SupportMessageStatus supportMessageStatus;

    @Column(name = "supportMessage")
    private String supportMessage;

    @Column(nullable = false,name = "isAnswer")
    private boolean isAnswer;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SupportMessagesEntity that = (SupportMessagesEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

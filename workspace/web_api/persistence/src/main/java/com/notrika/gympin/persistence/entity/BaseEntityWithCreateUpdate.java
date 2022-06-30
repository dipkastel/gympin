package com.notrika.gympin.persistence.entity;

import com.notrika.gympin.persistence.entity.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntityWithCreateUpdate extends BaseEntityWithCreate {

        @Column(name = "updated_date")
        @Temporal(TemporalType.TIMESTAMP)
        private Date updatedDate;

//        @Column(name = "updater_user")
        @ManyToOne(cascade = CascadeType.MERGE)
        private User updaterUser;

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
                BaseEntityWithCreateUpdate that = (BaseEntityWithCreateUpdate) o;
                return getId() != null && Objects.equals(getId(), that.getId());
        }

        @Override
        public int hashCode() {
                return getClass().hashCode();
        }

}

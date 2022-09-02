package com.notrika.gympin.persistence.entity.event;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.sport.Sport;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "base_event")
@Inheritance(strategy = InheritanceType.JOINED)
public class BaseEventEntity extends BaseEntityWithCreateUpdate<BaseEventEntity> {

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "sport_id")
    private Sport sport;

    //    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    //    @ToString.Exclude
    //    private List<EventDataEntity> eventData;

    @Column(name = "title", nullable = false,length = 50)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "participant_count",nullable = false, columnDefinition = "default 0")
    private int participantCount;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    private List<EventParticipantEntity> participants;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BaseEventEntity that = (BaseEventEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

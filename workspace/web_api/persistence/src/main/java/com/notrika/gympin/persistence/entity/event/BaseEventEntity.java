package com.notrika.gympin.persistence.entity.event;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.sport.Sport;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "base_event")
@Inheritance(strategy = InheritanceType.JOINED)
public class BaseEventEntity extends BaseEntityWithCreateUpdate {

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

    @Column(name = "participant_count",nullable = false)
    private int participantCount;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    private List<EventParticipantEntity> participants;

}

package com.notrika.gympin.persistence.entity.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "walking_event")
public class WalkingEventEntity extends BaseEventEntity {

    @Column(name = "start_latitude",nullable = false)
    private double startLatitude;

    @Column(name = "start_longitude",nullable = false)
    private double startLongitude;

    @Column(name = "end_latitude",nullable = false)
    private double endLatitude;

    @Column(name = "end_longitude",nullable = false)
    private double endLongitude;

    @Lob
    @Column(name = "address")
    private String address;

}

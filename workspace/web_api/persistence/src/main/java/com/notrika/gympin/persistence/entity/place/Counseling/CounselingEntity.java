package com.notrika.gympin.persistence.entity.place.Counseling;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.notrika.gympin.persistence.entity.authCodes.PlaceContractCodeEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.ticket.appointment.TicketAppointmentEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "placeCounseling")
public class CounselingEntity extends PlaceEntity<CounselingEntity> {


    @Column(name = "ContractData", columnDefinition = "varchar(2000)")
    private String contractData;

    @Column(name = "hasContract", nullable = false, columnDefinition = "bit default 0")
    private boolean hasContract;

    @Column(name = "listOrder")
    private Short order;

    @Column(name = "CallUs", nullable = false, columnDefinition = "bit default 0")
    private boolean callUs;

    @Column(name = "protfolio", columnDefinition = "varchar(1000)")
    private String protfolio;

    @Column(name = "autoDiscount", nullable = false, columnDefinition = "bit default 1")
    private boolean autoDiscount;

    @Column(name = "searchStr", columnDefinition = "varchar(12000)")
    private String searchStr;

    @Column(name = "activeTimes", columnDefinition = "varchar(800)")
    private String activeTimes;

    @OneToOne(mappedBy = "place", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private PlaceContractCodeEntity contractCode;

    @OneToMany(mappedBy = "counseling", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private List<CounselingProficienciesEntity> proficiencies;



    @JsonIgnore
    public List<TicketAppointmentEntity> getTicketAppointments() {
        if (getBuyables() == null) return new ArrayList<>();
        return getBuyables().stream()
                .filter(b -> b instanceof TicketAppointmentEntity)
                .map(b -> (TicketAppointmentEntity) b)
                .collect(Collectors.toList());
    }

    public void addTicketAppointment(TicketAppointmentEntity ticket) {
        addBuyable(ticket);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CounselingEntity place = (CounselingEntity) o;

        return Objects.equals(getId(), place.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

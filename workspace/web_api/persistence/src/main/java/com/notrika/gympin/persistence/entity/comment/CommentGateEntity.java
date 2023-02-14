package com.notrika.gympin.persistence.entity.comment;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.gate.GateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "commentGate")
public class CommentGateEntity extends BaseEntityWithCreateUpdate<CommentGateEntity> {

    @ManyToOne
    private GateEntity gate;

    @ManyToOne
    private UserEntity user;

    private String comment;

}

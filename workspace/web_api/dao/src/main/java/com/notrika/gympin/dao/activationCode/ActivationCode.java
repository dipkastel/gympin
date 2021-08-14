package com.notrika.gympin.dao.activationCode;

import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Data
@NoArgsConstructor
@Entity
@Table(name = "activation_code")
public class ActivationCode extends BaseEntity {

    public ActivationCode(Long userId, String phoneNumber, String code,String senderId) {
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.senderId = senderId;
    }



    @Column(name = "userId")
    private Long userId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "code")
    private String code;

    @Column(name = "senderId")
    private String senderId;


}


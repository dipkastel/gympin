package com.notrika.gympin.dao.activationCode;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Data
@NoArgsConstructor
@Entity
@Table(name = "activation_code")
public class ActivationCode {

    public ActivationCode(Long userId, String phoneNumber, String code,String senderId) {
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.senderId = senderId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date CreatedDate = new Date();


    @Column(name = "userId")
    private Long userId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "code")
    private String code;

    @Column(name = "senderId")
    private String senderId;


}


package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.TokenStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

//import lombok.Data;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_token")
public class UserToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TokenStatus tokenStatus = TokenStatus.ACTIVE;

    @Column(updatable = false)
    private Long userId ;

    @Column(updatable = false)
    private String token ;

    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date CreatedDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date ExpireDate ;



}


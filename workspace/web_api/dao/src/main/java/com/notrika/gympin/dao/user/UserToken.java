package com.notrika.gympin.dao.user;

import com.notrika.gympin.common.user.enums.TokenStatus;
import com.notrika.gympin.dao.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

//import lombok.Data;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_token")
public class UserToken extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TokenStatus tokenStatus = TokenStatus.ACTIVE;

    @Column(updatable = false)
    private Long userId ;

    @Column(updatable = false)
    private String token ;


    @Temporal(TemporalType.TIMESTAMP)
    private Date ExpireDate ;


    @Override
    public void setUpdatedDate(Date UpdatedDate) {
    }

}


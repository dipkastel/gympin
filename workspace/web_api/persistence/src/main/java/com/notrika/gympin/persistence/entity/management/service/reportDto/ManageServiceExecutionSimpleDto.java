package com.notrika.gympin.persistence.entity.management.service.reportDto;

import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@ToString
public class ManageServiceExecutionSimpleDto {

    private Long id;
    private UserEntity executorUser;
    private Date createdDate;
    private Date executionDate;

    public ManageServiceExecutionSimpleDto(Long id, UserEntity executorUser,
                            Date createdDate, Date executionDate) {
        this.id = id;
        this.executorUser = executorUser;
        this.createdDate = createdDate;
        this.executionDate = executionDate;
    }

}

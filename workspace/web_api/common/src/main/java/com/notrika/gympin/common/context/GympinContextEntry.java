package com.notrika.gympin.common.context;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.User;

@Data
public class GympinContextEntry {

    private BaseParam baseParam=new BaseParam();

}

package com.notrika.web_api.data.Dto;

import com.notrika.web_api.data.Entity.Role;
import lombok.Data;

@Data
public class User_Dto {

    private Long id;
    private Role role = Role.USER;
    private String username;
    private String phoneNumber;

}

package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.user.dto.AdministratorDto;
import com.notrika.gympin.common.user.enums.UserGroup;
import com.notrika.gympin.common.user.enums.UserStatus;
import com.notrika.gympin.common.user.param.AdministratorParam;
import com.notrika.gympin.common.user.service.AdministratorService;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.dao.repository.AdministratorRepository;
import com.notrika.gympin.persistence.entity.administrator.Administrator;
import com.notrika.gympin.persistence.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AdministratorDto add(AdministratorParam administratorParam) {
        User initUser =
                User.builder().userRole(administratorParam.getRole()).username(administratorParam.getUsername()).phoneNumber(administratorParam.getPhoneNumber()).userGroup(UserGroup.ADMINISTRATION).userStatus(UserStatus.ENABLED).build();
        User user = userService.addUser(initUser);
        Administrator initAdministrator =
                Administrator.builder().baseUser(user).administratorName(administratorParam.getAdministratorName()).password(passwordEncoder.encode(administratorParam.getPassword())).email(administratorParam.getEmail()).build();
        Administrator administrator = addAdministrator(initAdministrator);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    public Administrator addAdministrator(Administrator administrator) {
        return administratorRepository.add(administrator);
    }

    @Override
    public AdministratorDto update(AdministratorParam administratorParam) {
        Administrator initAdministrator = getAdministratorById(administratorParam.getId());
        initAdministrator.getBaseUser().setUserRole(administratorParam.getRole());
        initAdministrator.getBaseUser().setUsername(administratorParam.getUsername());
        initAdministrator.getBaseUser().setPhoneNumber(administratorParam.getPhoneNumber());
        initAdministrator.setAdministratorName(administratorParam.getAdministratorName());
        initAdministrator.setPassword(administratorParam.getPassword());
        initAdministrator.setEmail(administratorParam.getEmail());
        Administrator administrator = updateAdministrator(initAdministrator);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    public Administrator updateAdministrator(Administrator administrator) {
        return administratorRepository.update(administrator);
    }

    @Override
    public AdministratorDto delete(AdministratorParam administratorParam) {
        throw new UnsupportedOperationException();
    }

    @Override
    public List<AdministratorDto> getAll() {
        List<Administrator> administratorList = administratorRepository.findAllUndeleted();
        return UserConvertor.administratorsToAdministratorDtos(administratorList);
    }

    @Override
    public AdministratorDto getById(long id) {
        Administrator administrator = getAdministratorById(id);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    public Administrator getAdministratorById(long id) {
        return administratorRepository.getById(id);
    }

    public Administrator getAdministratorByBaseUser(User user) {
        return administratorRepository.findAdministratorByBaseUser(user);
    }

    public Administrator findByAdministratorName(String username) {
        return administratorRepository.findByAdministratorName(username);
    }
}

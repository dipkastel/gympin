package com.notrika.gympin.domain.user;

import com.notrika.gympin.common.primitive.param.LongParam;
import com.notrika.gympin.common.user.dto.AdministratorDto;
import com.notrika.gympin.common.user.param.AdministratorParam;
import com.notrika.gympin.common.user.service.AdministratorService;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.domain.util.convertor.UserConvertor;
import com.notrika.gympin.persistence.repository.AdministratorRepository;
import com.notrika.gympin.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public AdministratorDto add(AdministratorParam administratorParam) {
        User initUser=User.builder().userRole(administratorParam.getRole()).username(administratorParam.getUsername()).phoneNumber(administratorParam.getPhoneNumber()).build();
        User user = userRepository.add(initUser);
        Administrator initAdministrator=Administrator.builder().baseUser(user).administratorName(administratorParam.getAdministratorName()).password(administratorParam.getPassword()).email(administratorParam.getEmail()).build();
        Administrator administrator = administratorRepository.add(initAdministrator);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    public AdministratorDto update(AdministratorParam administratorParam) {
        Administrator initAdministrator = administratorRepository.getById(administratorParam.getId());
        initAdministrator.getBaseUser().setUserRole(administratorParam.getRole());
        initAdministrator.getBaseUser().setUsername(administratorParam.getUsername());
        initAdministrator.getBaseUser().setPhoneNumber(administratorParam.getPhoneNumber());
        initAdministrator.setAdministratorName(administratorParam.getAdministratorName());
        initAdministrator.setPassword(administratorParam.getPassword());
        initAdministrator.setEmail(administratorParam.getEmail());
        Administrator administrator = administratorRepository.update(initAdministrator);
        return UserConvertor.administratorToAdministratorDto(administrator);
    }

    @Override
    public void delete(AdministratorParam administratorParam) {

    }

    @Override
    public List<AdministratorDto> getAll() {
        List<Administrator> administratorList = administratorRepository.findAll();
        return UserConvertor.administratorsToAdministratorDtos(administratorList);
    }

    @Override
    public AdministratorDto getById(LongParam longParam) {
        Administrator administrator = administratorRepository.getById(longParam.getValue());
        return UserConvertor.administratorToAdministratorDto(administrator);
    }
}

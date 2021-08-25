package com.notrika.gympin.framework.spring.aspect;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.ResponseModel;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.dao.user.User;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.logging.Level;
import java.util.logging.Logger;

import static com.notrika.gympin.common.ResponseModel.ERROR;
import static com.notrika.gympin.common.ResponseModel.SUCCESS;

@Aspect
@Component
public class ApiAspect {
    private final static Logger LOGGER = Logger.getLogger("ApiAspect");

    @Around("execution(* com.notrika.gympin.controller.impl..*.*(..))")
    public Object process(ProceedingJoinPoint pjp) throws Throwable {
        // start stopwatch
        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDto){
            UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            BaseParam arg = ((BaseParam) pjp.getArgs()[0]);
            if(arg!=null) {
                arg.getUser().setId(userDto.getId());
                arg.getUser().setCreatedDate(userDto.getCreatedDate());
                arg.getUser().setUpdatedDate(userDto.getUpdatedDate());
                arg.getUser().setDeleted(userDto.isDeleted());
                arg.getUser().setRole(userDto.getRole());
                arg.getUser().setUsername(userDto.getUsername());
                arg.getUser().setPhoneNumber(userDto.getPhoneNumber());
                arg.getUser().setToken(userDto.getToken());
            }
        }else if(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof AdministratorLoginDto){
            AdministratorLoginDto userDto = (AdministratorLoginDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            BaseParam arg = ((BaseParam) pjp.getArgs()[0]);
            if(arg!=null) {
                arg.getUser().setId(userDto.getId());
                arg.getUser().setCreatedDate(userDto.getCreatedDate());
                arg.getUser().setUpdatedDate(userDto.getUpdatedDate());
                arg.getUser().setDeleted(userDto.isDeleted());
//                arg.getUser().setRole(userDto.getRole());
//                arg.getUser().setUsername(userDto.getUsername());
                arg.getUser().setPhoneNumber(userDto.getPhoneNumber());
                arg.getUser().setToken(userDto.getToken());
            }
        }

        StringBuffer paramBuffer =
                new StringBuffer().append("\n==============================================================\n")
                        .append("Method ").append(pjp.getSignature().toLongString()).append(" started with following input param: ");
        for (int i = 0; i < pjp.getArgs().length; i++) {
            paramBuffer.append(pjp.getArgs()[i]).append("\n");
        }
        LOGGER.log(Level.INFO, paramBuffer.toString());
        StringBuffer resultBuffer = new StringBuffer().append(" and return following result: \n");
        try {
            Object retVal = pjp.proceed();
            ResponseEntity responseModel = (ResponseEntity) retVal;
            Object responseModelBody = responseModel.getBody();
            ResponseModel responseModel1 = new ResponseModel();
            responseModel1.setData(responseModelBody);
            responseModel1.setSuccess(true);
            responseModel1.setMessageType(SUCCESS);
            resultBuffer.append(responseModel1);
            return new ResponseEntity<ResponseModel>(responseModel1, responseModel.getStatusCode());
        } catch (ExceptionBase e) {
            resultBuffer.append(e);
            Error error = new Error(e.getErrorType(), e);
            ResponseModel responseModel = new ResponseModel();
            responseModel.setSuccess(false);
            responseModel.setMessageType(ERROR);
            responseModel.setMessage(error.getErrorMessage());
            responseModel.setError(error);
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.BAD_REQUEST);
        } catch (Throwable throwable) {
            throw throwable;
        } finally {
            LOGGER.log(Level.INFO, resultBuffer.append("\n==============================================================\n").toString());
        }
        // stop stopwatch
    }

}

package com.notrika.gympin.framework.spring.aspect;

import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.ResponseModel;
import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextEntry;
import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.dao.administrator.Administrator;
import com.notrika.gympin.dao.user.User;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
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
        GympinContextEntry contextEntry = new GympinContextEntry();
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User) {
            User userDto = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            BaseParam arg = new BaseParam();
            arg.getUser().setId(userDto.getId());
            arg.getUser().setCreatedDate(userDto.getCreatedDate());
            arg.getUser().setUpdatedDate(userDto.getUpdatedDate());
            arg.getUser().setDeleted(userDto.isDeleted());
            arg.getUser().setUserRole(userDto.getUserRole());
            arg.getUser().setUsername(userDto.getUsername());
            arg.getUser().setPhoneNumber(userDto.getPhoneNumber());
            arg.getUser().setToken(userDto.getUserTokens().stream().findFirst().orElse(null).toString());
            contextEntry.setBaseParam(arg);
        } else if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof Administrator) {
            Administrator userDto = (Administrator) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            BaseParam arg = new BaseParam();
            arg.getUser().setId(userDto.getId());
            arg.getUser().setCreatedDate(userDto.getCreatedDate());
            arg.getUser().setUpdatedDate(userDto.getUpdatedDate());
            arg.getUser().setDeleted(userDto.isDeleted());
            arg.getUser().setUserRole((userDto.getBaseUser().getUserRole()));
            arg.getUser().setUsername(userDto.getUsername());
            arg.getUser().setPhoneNumber(userDto.getBaseUser().getPhoneNumber());
            arg.getUser().setToken(userDto.getBaseUser().getUserTokens().stream().findFirst().orElse(null).toString());
            contextEntry.setBaseParam(arg);
        }
        GympinContext.setContext(contextEntry);
        StringBuffer paramBuffer =
                new StringBuffer().append("\n==============================================================\n").append("Method ").append(pjp.getSignature().toLongString()).append(" started with following input param: ");
        for (int i = 0; i < pjp.getArgs().length; i++) {
            paramBuffer.append(pjp.getArgs()[i]).append("\n");
        }
        LOGGER.log(Level.INFO, paramBuffer.toString());
        StringBuffer resultBuffer = new StringBuffer().append(" and return following result: \n");
        try {
            Object retVal = pjp.proceed();
            MethodSignature signature = (MethodSignature) pjp.getSignature();
            Method method = signature.getMethod();
            IgnoreWrapAspect ignoreWrapAspect = method.getAnnotation(IgnoreWrapAspect.class);
            if (ignoreWrapAspect == null) {
                ResponseEntity responseModel = (ResponseEntity) retVal;
                Object responseModelBody = responseModel.getBody();
                ResponseModel responseModel1 = new ResponseModel();
                responseModel1.setData(responseModelBody);
                responseModel1.setSuccess(true);
                responseModel1.setMessageType(SUCCESS);
                resultBuffer.append(responseModel1);
                return new ResponseEntity<ResponseModel>(responseModel1, responseModel.getStatusCode());
            }
            //            else {
            //                ResponseEntity responseModel = (ResponseEntity) retVal;
            //                MultimediaResponseModel responseModelBody = ((MultimediaResponseModel)responseModel.getBody());
            //                responseModelBody.setSuccess(true);
            //                responseModelBody.setMessageType(SUCCESS);
            ////                resultBuffer.append(responseModelBody);
            //                return new ResponseEntity<MultimediaResponseModel>(responseModelBody, responseModel.getStatusCode());
            //            }
            return retVal;
        } catch (ExceptionBase e) {
            resultBuffer.append(e);
            Error error = new Error(e.getErrorType(), e);
            ResponseModel responseModel = new ResponseModel();
            responseModel.setSuccess(false);
            responseModel.setMessageType(ERROR);
            responseModel.setMessage(error.getErrorMessage());
            responseModel.setError(error);
            return new ResponseEntity<ResponseModel>(responseModel, e.getHttpStatus());
        } catch (Throwable e) {
            resultBuffer.append(e);
            ResponseModel responseModel = new ResponseModel();
            responseModel.setSuccess(false);
            responseModel.setMessageType(ERROR);
            responseModel.setMessage(e.getMessage());
            responseModel.setError(Error.builder().errorMessage(e.getMessage()).stackTrace(e.getStackTrace().toString()).build());
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.EXPECTATION_FAILED);
        } finally {
            LOGGER.log(Level.INFO, resultBuffer.append("\n==============================================================\n").toString());
            GympinContext.clear();
        }
        // stop stopwatch
    }


/*    @AfterReturning(value = "execution(* com.notrika.gympin.controller.impl..*.*(..))",returning = "retVal")
    public Object after(JoinPoint joinPoint,Object retVal){
//        ResponseModel responseModel1 = new ResponseModel<>();
//        responseModel1.setData(retVal);
//        responseModel1.setSuccess(true);
//        responseModel1.setMessageType(SUCCESS);
//        ResponseEntity<ResponseModel> responseEntity=new ResponseEntity<ResponseModel>(responseModel1,HttpStatus.OK);
        retVal="responseEntity";
        return retVal;
    }*/

}

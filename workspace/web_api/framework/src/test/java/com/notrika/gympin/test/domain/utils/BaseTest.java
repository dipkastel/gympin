package com.notrika.gympin.test.domain.utils;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notrika.gympin.common.user.user.enums.TokenType;
import com.notrika.gympin.common.user.user.enums.UsernameType;
import com.notrika.gympin.common.user.user.param.LoginParam;
import com.notrika.gympin.common.user.user.service.JwtTokenProvider;
import com.notrika.gympin.common.util.ApplicationEnum;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.helper.GeneralHelper;
import com.notrika.gympin.framework.spring.WebApiApplication;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringJUnitConfig
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = WebApiApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application.properties")
public class BaseTest {



    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public static String userToken = null;
    @Autowired
    public MockMvc mvc;


    public String getUserToken() throws Exception {
        if (userToken == null) {
            var user = userService.getById(1);
            LoginParam loginParam = LoginParam.builder().application(ApplicationEnum.WEBPANEL).usernameType(UsernameType.PHONENUMBER).password("1234").username(user.getPhoneNumber()).build();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(GeneralHelper.fixPhoneNumber(loginParam.getUsername()), loginParam.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            userToken = "Bearer " + tokenProvider.generateJwtToken(authentication, TokenType.USER);
        }
        return userToken;

    }

    public <E, T> ResponseModel<E> TestPost(String url, Object inputData, Boolean authorize, TypeReference<T> classType) throws Exception {
        try {
            String json = jsonUtil.asJsonString(inputData);
            MockHttpServletRequestBuilder Http = MockMvcRequestBuilders.post(url);
            Http.contentType(MediaType.APPLICATION_JSON);
            if (authorize) Http.header("Authorization", getUserToken());
            Http.content(json);
            MvcResult result = mvc.perform(Http)
                    .andExpect(status().isOk())
                    .andReturn();
            String content = result.getResponse().getContentAsString();
            return jsonUtil.asResponseModel(content,classType);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }


    public <E, T> ResponseModel<E> TestPut(String url, Object inputData, Boolean authorize, TypeReference<T> classType) throws Exception {
        try {
            String json = jsonUtil.asJsonString(inputData);
            MockHttpServletRequestBuilder Http = MockMvcRequestBuilders.put(url);
            Http.contentType(MediaType.APPLICATION_JSON);
            if (authorize) Http.header("Authorization", getUserToken());
            Http.content(json);
            MvcResult result = mvc.perform(Http)
                    .andExpect(status().isOk())
                    .andReturn();
            String content = result.getResponse().getContentAsString();
            return jsonUtil.asResponseModel(content,classType);
        } catch (Exception e) {
            throw new Exception("");
        }
    }

    public <E, T> ResponseModel<E> TestGet(String url, Map<String, Object> inputData, Boolean authorize, TypeReference<T> classType) throws Exception {
        try {
            MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
            if (inputData!=null){
                for (Map.Entry<String, Object> input : inputData.entrySet()) {
                    multiValueMap.put(input.getKey(), List.of(input.getValue().toString()));
                }
            }

            MockHttpServletRequestBuilder Http = MockMvcRequestBuilders.get(url);
            if (authorize) Http.header("Authorization", getUserToken());
            Http.queryParams(multiValueMap);
            MvcResult result = mvc.perform(Http)
                    .andExpect(status().isOk())
                    .andReturn();
            String content = result.getResponse().getContentAsString();
            return jsonUtil.asResponseModel(content,classType);
        } catch (Exception e) {
            throw new Exception("");
        }
    }


}

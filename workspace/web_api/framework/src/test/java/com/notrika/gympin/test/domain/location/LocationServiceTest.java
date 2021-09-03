package com.notrika.gympin.test.domain.location;

import com.notrika.gympin.common.location.dto.RegionDto;
import com.notrika.gympin.common.location.param.RegionParam;
import com.notrika.gympin.common.location.service.LocationService;
import com.notrika.gympin.framework.spring.WebApiApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.ws.rs.core.Application;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = WebApiApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
public class LocationServiceTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private LocationService locationService;

    @Test
    public void updateRegionTest(){
        RegionDto region = locationService.updateRegion(RegionParam.builder().id(1L).name("TTT").build());
        System.out.println(region);
    }


}

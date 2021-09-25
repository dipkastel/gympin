//package com.notrika.gympin.test.domain.location;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.notrika.gympin.common.ResponseModel;
//import com.notrika.gympin.common.location.dto.StateDto;
//import com.notrika.gympin.framework.spring.WebApiApplication;
//import com.notrika.gympin.persistence.repository.StateRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestMethodOrder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import javax.ws.rs.core.MediaType;
//import java.util.List;
//import java.util.Map;
//import java.util.Objects;
//import java.util.TreeMap;
//
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK,
//        classes = WebApiApplication.class)
//@AutoConfigureMockMvc
//@TestMethodOrder(OrderAnnotation.class)
//@TestPropertySource(
//        locations = "classpath:application-integrationtest.properties")
//public class LocationServiceTest {
//    @Autowired
//    private MockMvc mvc;
//
//    @Autowired
//    StateRepository stateRepository;
//
//    public static String asJsonString(final Object obj) {
//        try {
//            final ObjectMapper mapper = new ObjectMapper();
//            final String jsonContent = mapper.writeValueAsString(obj);
//            return jsonContent;
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//
//    //state
//    @Test
//    @Order(1)
//    public void StateTest() throws Exception{
//
//        //add
//        final Map<String, Object> state = new TreeMap<>();
//        state.put("Name","teststate");
//        String json = asJsonString(state);
//        MvcResult result =this.mvc.perform(MockMvcRequestBuilders.post("/api/v1/location/addState")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(json))
//                .andExpect(status().isCreated())
//                .andReturn();
//
//        String content = result.getResponse().getContentAsString();
//        ResponseModel<StateDto> convertedObject =new ObjectMapper().readValue(content, new TypeReference<ResponseModel<StateDto>>(){});
//        Assertions.assertEquals(convertedObject.getData().getName(),"teststate");
//       Long testStateId = convertedObject.getData().getId();
//
//       //get
//        MvcResult AllStatesRequest =this.mvc.perform(MockMvcRequestBuilders.get("/api/v1/location/getAllState")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String AllStatesJson = AllStatesRequest.getResponse().getContentAsString();
//        ResponseModel<List<StateDto>> convertedObject1 =new ObjectMapper().readValue(AllStatesJson, new TypeReference<ResponseModel<List<StateDto>>>(){});
//        Assertions.assertNotNull(convertedObject1.getData());
//        Assertions.assertTrue(convertedObject1.getData().stream().anyMatch(p -> Objects.equals(p.getId(), testStateId)));
//
//        //update
//        final Map<String, Object> state2 = new TreeMap<>();
//        state2.put("Id",testStateId);
//        state2.put("Name","teststate2");
//        String json2 = asJsonString(state2);
//        MvcResult AllStatesRequest2 =this.mvc.perform(MockMvcRequestBuilders.put("/api/v1/location/updateState")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(json2))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String AllStatesJson2 = AllStatesRequest2.getResponse().getContentAsString();
//        ResponseModel<StateDto> convertedObject2 =new ObjectMapper().readValue(AllStatesJson2, new TypeReference<ResponseModel<StateDto>>(){});
//        Assertions.assertNotNull(convertedObject2.getData());
//        Assertions.assertEquals(convertedObject2.getData().getName(),"teststate2");
//
//        //get by id
//        MvcResult AllStatesRequest3 =this.mvc.perform(MockMvcRequestBuilders.get("/api/v1/location/getStateById?id="+testStateId)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String AllStatesJson3 = AllStatesRequest3.getResponse().getContentAsString();
//        ResponseModel<StateDto> convertedObject3 =new ObjectMapper().readValue(AllStatesJson3, new TypeReference<ResponseModel<StateDto>>(){});
//        Assertions.assertNotNull(convertedObject3.getData());
//        Assertions.assertEquals(convertedObject3.getData().getName(),"teststate2");
//        //virtual delete
//
//        this.mvc.perform(MockMvcRequestBuilders.delete("/api/v1/location/deleteState?id="+testStateId)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andReturn();
//
//
//        MvcResult AllStatesRequest5 =this.mvc.perform(MockMvcRequestBuilders.get("/api/v1/location/getAllState")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String AllStatesJson5 = AllStatesRequest5.getResponse().getContentAsString();
//        ResponseModel<List<StateDto>> convertedObject5 =new ObjectMapper().readValue(AllStatesJson5, new TypeReference<ResponseModel<List<StateDto>>>(){});
//        Assertions.assertNotNull(convertedObject5.getData());
//        Assertions.assertFalse(convertedObject5.getData().stream().anyMatch(p -> Objects.equals(p.getId(), testStateId)));
//
//
//        this.mvc.perform(MockMvcRequestBuilders.get("/api/v1/location/getStateById?id="+testStateId)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isNotFound())
//                .andReturn();
//        //deleteTestValues
//        stateRepository.delete(stateRepository.getById(testStateId));
//
//    }
//}

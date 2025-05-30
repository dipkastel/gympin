package com.notrika.gympin.test.domain.place;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.ticket.common.enums.DayOfWeek;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.place.placeGym.dto.PlaceGymDto;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class placeHallActionTest extends BaseTest {

    public static Long placeId = null;
    public static Long hallId = null;
    public static Long actionId = null;
    public static List<ActiveTimesDto> actions = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceGymParam param = PlaceGymParam.builder()
                .name("مرکز برای سالن")
                .build();

        ResponseModel<PlaceGymDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceGymDto>>() {
                });

        placeId = result.getData().getId();
    }



    @BeforeAll
    @Order(2)
    public void addHall() throws Exception {
        final HallParam param = HallParam.builder()
                .name("سالن برای فعالیت")
                .place(PlaceGymParam.builder().id(placeId).build())
                .build();

        ResponseModel<HallDto> result = TestPost(
                "/api/v1/hall/add",
                param,
                true,
                new TypeReference<ResponseModel<HallDto>>() {
                });

        hallId = result.getData().getId();
    }

    @Test
    @Order(1)
    public void add() throws Exception {
        final ActiveTimesParam param =  ActiveTimesParam.builder()
                .hall(HallParam.builder().id(hallId).build())
                .dayOfWeek(DayOfWeek.SATURDAY)
                .openingTime(LocalTime.parse("09:00:00"))
                .closingTime(LocalTime.parse("19:00:00"))
                .build();


        ResponseModel<ActiveTimesDto> result = TestPost(
                "/api/v1/ticketSubscribeActiveTimes/add",
                param,
                true,
                new TypeReference<ResponseModel<ActiveTimesDto>>() {
                });

        Assertions.assertEquals(result.getData().getDayOfWeek(),DayOfWeek.SATURDAY);
        actionId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void addAll() throws Exception {
        final List<ActiveTimesParam> param =  new ArrayList<>();

        for(int i =0;i<7;i++){
            param.add( ActiveTimesParam.builder()
                    .hall(HallParam.builder().id(hallId).build())
                    .dayOfWeek(DayOfWeek.values()[i])
                    .openingTime(LocalTime.parse("08:00:00"))
                    .closingTime(LocalTime.parse("18:00:00"))
                    .build());
        }


        ResponseModel<List<ActiveTimesDto>> result = TestPost(
                "/api/v1/ticketSubscribeActiveTimes/addAll",
                param,
                true,
                new TypeReference<ResponseModel<List<ActiveTimesDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
        Assertions.assertTrue(result.isSuccess());
        actions = result.getData();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if(actionId==null) throw new Exception("is not exist");
        final ActiveTimesParam param = ActiveTimesParam.builder()
                .id(actionId)
                .dayOfWeek(DayOfWeek.TUESDAY)
                .openingTime(LocalTime.parse("06:00:00"))
                .closingTime(LocalTime.parse("16:00:00"))
                .build();

        ResponseModel<ActiveTimesDto> result = TestPut(
                "/api/v1/ticketSubscribeActiveTimes/update",
                param,
                true,
                new TypeReference<ResponseModel<ActiveTimesDto>>() {
                });

        Assertions.assertEquals(result.getData().getDayOfWeek(), DayOfWeek.TUESDAY);
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if(actionId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", actionId);

        ResponseModel<ActiveTimesDto> result = TestGet(
                "/api/v1/ticketSubscribeActiveTimes/getById",
                param,
                true,
                new TypeReference<ResponseModel<ActiveTimesDto>>() {
                });

        Assertions.assertEquals(result.getData().getDayOfWeek(), DayOfWeek.TUESDAY);
    }


    @Test
    @Order(5)
    public void getByPlace() throws Exception {
        if(placeId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", placeId);

        ResponseModel<List<ActiveTimesDto>> result = TestGet(
                "/api/v1/ticketSubscribeActiveTimes/getByPlace",
                param,
                true,
                new TypeReference<ResponseModel<List<ActiveTimesDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(6)
    public void getByHall() throws Exception {
        if(hallId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", hallId);

        ResponseModel<List<ActiveTimesDto>> result = TestGet(
                "/api/v1/ticketSubscribeActiveTimes/getByHall",
                param,
                true,
                new TypeReference<ResponseModel<List<ActiveTimesDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }


    @Test
    @Order(7)
    public void getAll() throws Exception {
        ResponseModel<List<ActiveTimesDto>> result = TestGet(
                "/api/v1/ticketSubscribeActiveTimes/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<ActiveTimesDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()> 1);
    }

    @Test
    @Order(8)
    public void delete() throws Exception {
        if(actionId==null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", actionId.toString());

        ResponseModel<ActiveTimesDto> result = TestPut(
                "/api/v1/ticketSubscribeActiveTimes/delete",
                param,
                true,
                new TypeReference<ResponseModel<ActiveTimesDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}

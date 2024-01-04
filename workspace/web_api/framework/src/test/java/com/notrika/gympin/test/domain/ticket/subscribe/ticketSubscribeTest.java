package com.notrika.gympin.test.domain.ticket.subscribe;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.place.hall.dto.HallDto;
import com.notrika.gympin.common.place.hall.param.HallParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.placeSport.dto.PlaceSportDto;
import com.notrika.gympin.common.place.placeSport.param.PlaceSportParam;
import com.notrika.gympin.common.sport.sport.param.SportParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDiscountHistoryDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto;
import com.notrika.gympin.common.ticket.ticketSubscribe.enums.DayOfWeek;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeActiveTimesParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ticketSubscribeTest extends BaseTest {

    public static PlaceDto place = null;
    public static TicketSubscribeDto ticket = null;
    public static TicketSubscribeDto ticket2 = null;
    public static PlaceSportDto placeSport = null;
    public static HallDto hall = null;
    public static ActiveTimesDto activeTime1 = null;


    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceParam param = PlaceParam.builder()
                .name("مرکز برای پرسنل")
                .build();

        ResponseModel<PlaceDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceDto>>() {
                });

        place = result.getData();
    }

    @BeforeAll
    @Order(2)
    public void addSportToPlace() throws Exception {
        final PlaceSportParam param = PlaceSportParam.builder()
                .sport(SportParam.builder().id(3l).build())
                .place(PlaceParam.builder().id(place.getId()).build())
                .build();

        ResponseModel<PlaceSportDto> result = TestPost(
                "/api/v1/placeSport/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceSportDto>>() {
                });

        Assertions.assertEquals(result.getData().getSport().getName(), "اسکواش");
        placeSport = result.getData();
    }

    @BeforeAll
    @Order(3)
    public void addHall() throws Exception {
        final HallParam param = HallParam.builder()
                .name("سالن برای تست عضویت")
                .place(PlaceParam.builder().id(place.getId()).build())
                .build();

        ResponseModel<HallDto> result = TestPost(
                "/api/v1/hall/add",
                param,
                true,
                new TypeReference<ResponseModel<HallDto>>() {
                });

        hall = result.getData();
    }

    @BeforeAll
    @Order(4)
    public void addActiveTime() throws Exception {
        final ActiveTimesParam param =  ActiveTimesParam.builder()
                .hall(HallParam.builder().id(hall.getId()).build())
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
        activeTime1 = result.getData();
    }

    @Test
    @Order(1)
    public void add() throws Exception {
        if (place == null) throw new Exception("is not exist");
        final TicketSubscribeParam param = TicketSubscribeParam.builder()
                .place(PlaceParam.builder().id(place.getId()).build())
                .name("تک جلسه بدنسازی آقایان")
                .placePrice(BigDecimal.valueOf(120000))
                .valuePrice(BigDecimal.valueOf(120000))
                .entryTotalCount((short) 1)
                .gender(Gender.MALE)
                .expireDuration((short) 3)
                .subscribeCapacity(10)
                .build();

        ResponseModel<TicketSubscribeDto> result = TestPost(
                "/api/v1/TicketSubscribe/add",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "تک جلسه بدنسازی آقایان");
        Assertions.assertEquals(result.getData().getPrice(),BigDecimal.valueOf(120000));
        ticket = result.getData();
    }

    @Test
    @Order(2)
    public void addForDelete() throws Exception {
        if (place == null) throw new Exception("is not exist");
        final TicketSubscribeParam param = TicketSubscribeParam.builder()
                .place(PlaceParam.builder().id(place.getId()).build())
                .name("8 جلسه بدنسازی آقایان برای حذف")
                .placePrice(BigDecimal.valueOf(100000))
                .valuePrice(BigDecimal.valueOf(100000))
                .entryTotalCount((short) 8)
                .gender(Gender.MALE)
                .expireDuration((short) 30)
                .subscribeCapacity(100)
                .build();

        ResponseModel<TicketSubscribeDto> result = TestPost(
                "/api/v1/TicketSubscribe/add",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "8 جلسه بدنسازی آقایان برای حذف");
        Assertions.assertEquals(result.getData().getPrice(),BigDecimal.valueOf(100000));
        ticket2 = result.getData();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if (ticket == null) throw new Exception("is not exist");
        final TicketSubscribeParam param = TicketSubscribeParam.builder()
                .id(ticket.getId())
                .place(PlaceParam.builder().id(place.getId()).build())
                .name("10 جلسه بدنسازی آقایان")
                .placePrice(BigDecimal.valueOf(130000))
                .valuePrice(BigDecimal.valueOf(130000))
                .entryTotalCount((short) 1)
                .gender(Gender.MALE)
                .expireDuration((short) 3)
                .subscribeCapacity(10)
                .build();

        ResponseModel<TicketSubscribeDto> result = TestPut(
                "/api/v1/TicketSubscribe/update",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "10 جلسه بدنسازی آقایان");
        Assertions.assertEquals(result.getData().getPrice(),BigDecimal.valueOf(130000));
    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if (ticket == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", ticket.getId());

        ResponseModel<TicketSubscribeDto> result = TestGet(
                "/api/v1/TicketSubscribe/getById",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.getData().getName(), "10 جلسه بدنسازی آقایان");
        Assertions.assertTrue(result.getData().getPrice().compareTo(BigDecimal.valueOf(130000.00))==0);
    }


    @Test
    @Order(5)
    public void getAll() throws Exception {
        ResponseModel<List<TicketSubscribeDto>> result = TestGet(
                "/api/v1/TicketSubscribe/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<TicketSubscribeDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 1);
    }

    @Test
    @Order(6)
    public void getByPlaceId() throws Exception {
        if (place == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", place.getId());

        ResponseModel<List<TicketSubscribeDto>> result = TestGet(
                "/api/v1/TicketSubscribe/getByPlace",
                param,
                true,
                new TypeReference<ResponseModel<List<TicketSubscribeDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 0);
    }


    @Test
    @Order(7)
    public void delete() throws Exception {
        if (ticket2 == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", ticket2.getId());

        ResponseModel<TicketSubscribeDto> result = TestPut(
                "/api/v1/TicketSubscribe/delete",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

    @Test
    @Order(8)
    public void addSport1() throws Exception{
        if (ticket == null) throw new Exception("is not exist");
        final TicketSubscribeSportParam param = TicketSubscribeSportParam.builder()
                .ticketSubscribe(TicketSubscribeParam.builder().id(ticket.getId()).build())
                .placeSports(List.of(PlaceSportParam.builder().id(placeSport.getId()).build()))
                .build();

        ResponseModel<TicketSubscribeDto> result2 = TestPost(
                "/api/v1/TicketSubscribe/addSport",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result2.isSuccess(), true);
        Assertions.assertEquals(result2.getError(), null);

    }

    @Test
    @Order(10)
    public void getSportsBySubscribeId() throws Exception {
        if (ticket == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("ticketSubscribeId", ticket.getId());

        ResponseModel<List<PlaceSportDto>> result = TestGet(
                "/api/v1/TicketSubscribe/getSports",
                param,
                true,
                new TypeReference<ResponseModel<List<PlaceSportDto>>>() {
                });

        Assertions.assertTrue(result.getData().size() > 0);
        placeSport = result.getData().get(0);
    }

    @Test
    @Order(11)
    public void deleteSport() throws Exception{
        if (placeSport == null) throw new Exception("is not exist");
        final TicketSubscribeSportParam param = new TicketSubscribeSportParam();
        param.setTicketSubscribe(TicketSubscribeParam.builder().id(ticket.getId()).build());
        param.setPlaceSports(List.of(PlaceSportParam.builder().id(placeSport.getId()).build()));

        ResponseModel<TicketSubscribeDto> result = TestPut(
                "/api/v1/TicketSubscribe/deleteSport",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

    @Test
    @Order(12)
    public void addSport2() throws Exception{
        if (ticket == null) throw new Exception("is not exist");
        final TicketSubscribeSportParam param = TicketSubscribeSportParam.builder()
                .ticketSubscribe(TicketSubscribeParam.builder().id(ticket.getId()).build())
                .placeSports(List.of(PlaceSportParam.builder().id(placeSport.getId()).build()))
                .build();

        ResponseModel<TicketSubscribeDto> result2 = TestPost(
                "/api/v1/TicketSubscribe/addSport",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result2.isSuccess(), true);
        Assertions.assertEquals(result2.getError(), null);

    }

    @Test
    @Order(13)
    public void addSubscribeActiveTime() throws Exception{
        if (activeTime1 == null) throw new Exception("is not exist");
        final TicketSubscribeActiveTimesParam param = TicketSubscribeActiveTimesParam.builder()
                .ticketSubscribe(TicketSubscribeParam.builder().id(ticket.getId()).build())
                .activeTime(List.of(ActiveTimesParam.builder().id(activeTime1.getId()).build()))
                .build();

        ResponseModel<TicketSubscribeDto> result2 = TestPost(
                "/api/v1/TicketSubscribe/addSubscribeActiveTimes",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result2.isSuccess(), true);
        Assertions.assertEquals(result2.getError(), null);

    }

    @Test
    @Order(14)
    public void getTicketSubscribeDiscountHistory() throws Exception {
        if (ticket == null) throw new Exception("is not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("ticketSubscribeId", ticket.getId());

        ResponseModel<List<TicketSubscribeDiscountHistoryDto>> result = TestGet(
                "/api/v1/TicketSubscribe/getTicketSubscribeDiscountHistory",
                param,
                true,
                new TypeReference<ResponseModel<List<TicketSubscribeDiscountHistoryDto>>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }


    @Test
    @Order(15)
    public void changeTicketSubscribeStatus() throws Exception {
        if (ticket == null) throw new Exception("is not exist");
        final TicketSubscribeParam param = TicketSubscribeParam.builder()
                .id(ticket.getId())
                .enable(true)
                .build();

        ResponseModel<TicketSubscribeDto> result = TestPost(
                "/api/v1/TicketSubscribe/changeTicketSubscribeStatus",
                param,
                true,
                new TypeReference<ResponseModel<TicketSubscribeDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}

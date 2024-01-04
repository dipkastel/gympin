package com.notrika.gympin.test.domain.settings;

import com.fasterxml.jackson.core.type.TypeReference;
import com.notrika.gympin.common.corporate.corporate.dto.CorporateDto;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.enums.NoteType;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import com.notrika.gympin.common.util._base.base.ResponseModel;
import com.notrika.gympin.test.domain.utils.BaseTest;
import org.junit.jupiter.api.*;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class noteTest  extends BaseTest {

    public static Long noteId = null;
    public static Long note2Id = null;
    public static Long placeId = null;
    public static Long corporateId = null;

    @BeforeAll
    @Order(1)
    public void addPlace() throws Exception{
        final PlaceParam param = PlaceParam.builder()
                .name("مرکز برای نوت")
                .build();

        ResponseModel<PlaceDto> result = TestPost(
                "/api/v1/place/add",
                param,
                true,
                new TypeReference<ResponseModel<PlaceDto>>() {
                });

        placeId = result.getData().getId();
    }

    @BeforeAll
    @Order(2)
    public void addCorporate() throws Exception {
        final CorporateParam param = CorporateParam.builder()
                .name("شرکت تست")
                .build();

        ResponseModel<CorporateDto> result = TestPost(
                "/api/v1/corporate/add",
                param,
                true,
                new TypeReference<ResponseModel<CorporateDto>>() {
                });
        corporateId = result.getData().getId();
    }


    @Test
    @Order(1)
    public void addNoteToPlace() throws Exception {
        final NoteParam param = NoteParam.builder()
                .place(PlaceParam.builder().id(placeId).build())
                .text("value 1")
                .type(NoteType.NOTE)
                .isToDo(false)
                .build();

        ResponseModel<NoteDto> result = TestPost(
                "/api/v1/note/add",
                param,
                true,
                new TypeReference<ResponseModel<NoteDto>>() {
                });

        Assertions.assertEquals(result.getData().getText(), "value 1");
        Assertions.assertEquals(result.getData().getType(), NoteType.NOTE);
        noteId = result.getData().getId();
    }

    @Test
    @Order(2)
    public void addContactToCorporate() throws Exception {
        final NoteParam param = NoteParam.builder()
                .corporate(CorporateParam.builder().id(corporateId).build())
                .text("value 46")
                .type(NoteType.CONTACT)
                .isToDo(false)
                .build();

        ResponseModel<NoteDto> result = TestPost(
                "/api/v1/note/add",
                param,
                true,
                new TypeReference<ResponseModel<NoteDto>>() {
                });

        Assertions.assertEquals(result.getData().getText(), "value 46");
        Assertions.assertEquals(result.getData().getType(), NoteType.CONTACT);
        note2Id = result.getData().getId();
    }

    @Test
    @Order(3)
    public void update() throws Exception {
        if (noteId == null) throw new Exception("not exist");
        final NoteParam param = NoteParam.builder()
                .id(noteId)
                .isToDo(true)
                .build();

        ResponseModel<NoteDto> result = TestPut(
                "/api/v1/note/update",
                param,
                true,
                new TypeReference<ResponseModel<NoteDto>>() {
                });

        Assertions.assertEquals(result.getData().getIsToDo(), true);

    }

    @Test
    @Order(4)
    public void getById() throws Exception {
        if (noteId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", noteId);

        ResponseModel<NoteDto> result = TestGet(
                "/api/v1/note/getById",
                param,
                true,
                new TypeReference<ResponseModel<NoteDto>>() {
                });

        Assertions.assertEquals(result.getData().getText(), "value 1");
        Assertions.assertEquals(result.getData().getType(), NoteType.NOTE);
    }

//    @Test
//    @Order(5)
//    public void getByParam() throws Exception {
//        final NoteParam param = NoteParam.builder()
//                .corporate(CorporateParam.builder().id(corporateId).build())
//                .build();
//
//        ResponseModel<Page<NoteDto>> result = TestPost(
//                "/api/v1/note/getByParam",
//                param,
//                true,
//                new TypeReference<ResponseModel<Page<NoteDto>>>() {
//                });
//
//        Assertions.assertTrue(result.getData().getContent().size()>0);
//    }

    @Test
    @Order(6)
    public void getAll() throws Exception {
        ResponseModel<List<NoteDto>> result = TestGet(
                "/api/v1/note/getAll",
                null,
                true,
                new TypeReference<ResponseModel<List<NoteDto>>>() {
                });

        Assertions.assertTrue(result.getData().size()>0);
    }

    @Test
    @Order(7)
    public void delete() throws Exception {
        if (noteId == null) throw new Exception("not exist");
        final Map<String, Object> param = new TreeMap<>();
        param.put("id", noteId.toString());

        ResponseModel<NoteDto> result = TestPut(
                "/api/v1/note/delete",
                param,
                true,
                new TypeReference<ResponseModel<NoteDto>>() {
                });

        Assertions.assertEquals(result.isSuccess(), true);
        Assertions.assertEquals(result.getError(), null);
        Assertions.assertNotEquals(result.getData(), null);
    }

}

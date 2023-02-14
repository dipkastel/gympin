package com.notrika.gympin.common.note.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.note.dto.NoteDto;
import com.notrika.gympin.common.note.param.NoteParam;
import com.notrika.gympin.common.place.place.dto.PlaceDto;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.place.query.PlaceQuery;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NoteController extends BaseController<NoteParam, NoteDto, BaseQuery<?>> {

    ResponseEntity<List<NoteDto>> getByParam(@RequestBody NoteParam noteParam);


}

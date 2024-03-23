package com.notrika.gympin.common.settings.note.api;

import com.notrika.gympin.common.settings.note.dto.SimpleNoteDto;
import com.notrika.gympin.common.settings.note.query.NoteQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NoteController extends BaseController<NoteParam, NoteDto, NoteQuery> {

    ResponseEntity<List<SimpleNoteDto>> getByParam(@RequestBody NoteParam noteParam);


}

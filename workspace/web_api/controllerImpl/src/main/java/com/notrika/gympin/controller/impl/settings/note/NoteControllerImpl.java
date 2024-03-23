package com.notrika.gympin.controller.impl.settings.note;

import com.notrika.gympin.common.settings.note.dto.SimpleNoteDto;
import com.notrika.gympin.common.settings.note.query.NoteQuery;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.settings.note.api.NoteController;
import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import com.notrika.gympin.common.settings.note.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/note")
public class NoteControllerImpl implements NoteController {

    @Autowired
    private NoteService noteService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<NoteDto> add(NoteParam param) {
        return ResponseEntity.ok(noteService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<NoteDto> update(NoteParam param) {
        return ResponseEntity.ok(noteService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<NoteDto> delete(NoteParam param) {
        return ResponseEntity.ok(noteService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<NoteDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(noteService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<NoteDto> getById(Long id) {
        return ResponseEntity.ok(noteService.getById(id));
    }

    @Override
    public ResponseEntity<Page<NoteDto>> query(NoteQuery filter) {
        return ResponseEntity.ok(noteService.query(filter));
    }

    @Override
    @PostMapping("getByParam")
    public ResponseEntity<List<SimpleNoteDto>> getByParam(NoteParam noteParam) {
        if (noteParam.getPlace() != null)
            return ResponseEntity.ok(noteService.getByPlace(noteParam.getPlace()));
        if (noteParam.getUser() != null)
            return ResponseEntity.ok(noteService.getByUser(noteParam.getUser()));
        if (noteParam.getPurchased() != null)
            return ResponseEntity.ok(noteService.getByPurchased(noteParam.getPurchased()));
        if (noteParam.getCorporate() != null)
            return ResponseEntity.ok(noteService.getByCorporate(noteParam.getCorporate()));
        if (noteParam.getInvoice() != null)
            return ResponseEntity.ok(noteService.getByInvoice(noteParam.getInvoice()));
        return ResponseEntity.ok(null);
    }
}

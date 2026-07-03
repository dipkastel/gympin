package com.notrika.gympin.domain.finance.serial;

import com.github.mfathi91.time.PersianDate;
import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.serial.dto.SerialVatDto;
import com.notrika.gympin.common.finance.serial.param.SerialParam;
import com.notrika.gympin.common.finance.serial.query.SerialQuery;
import com.notrika.gympin.common.finance.serial.query.VatSerialQueryExportParam;
import com.notrika.gympin.common.finance.serial.service.SerialService;
import com.notrika.gympin.common.finance.transaction.dto.CorporateTransactionDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreate;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.SerialConvertor;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import lombok.NonNull;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.xml.crypto.dsig.keyinfo.KeyValue;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.security.KeyPair;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SerialServiceImpl extends AbstractBaseService<SerialParam, SerialDto, SerialQuery, FinanceSerialEntity> implements SerialService {


    @Autowired
    FinanceSerialRepository financeSerialRepository;

    @Autowired
    SerialServiceHelper serialServiceHelper;


    @Override
    public SerialDto add(@NonNull SerialParam param) {
        return null;
    }

    @Override
    public SerialDto update(@NonNull SerialParam param) {
        return null;
    }

    @Override
    public SerialDto delete(@NonNull SerialParam param) {
        return null;
    }

    @Override
    public SerialDto getById(long id) {
        return SerialConvertor.ToCompleteDto(financeSerialRepository.getById(id));
    }

    @Override
    public FinanceSerialEntity add(FinanceSerialEntity entity) {
        return null;
    }

    @Override
    public FinanceSerialEntity update(FinanceSerialEntity entity) {
        return null;
    }

    @Override
    public FinanceSerialEntity delete(FinanceSerialEntity entity) {
        return null;
    }

    @Override
    public FinanceSerialEntity getEntityById(long id) {
        return financeSerialRepository.getById(id);
    }

    @Override
    public List<FinanceSerialEntity> getAll(Pageable pageable) {
        return financeSerialRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<FinanceSerialEntity> findAll(Specification<FinanceSerialEntity> specification, Pageable pageable) {
        return financeSerialRepository.findAll(specification, pageable);
    }

    @Override
    public List<SerialDto> convertToDtos(List<FinanceSerialEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(SerialConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<SerialDto> convertToDtos(Page<FinanceSerialEntity> entities) {
        return entities.map(SerialConvertor::ToDto);
    }

    @Override
    public SerialDto getBySerial(String serial) {
        return SerialConvertor.ToCompleteDto(financeSerialRepository.findBySerialAndDeletedIsFalse(serial));
    }

    @Override
    public Page<SerialVatDto> vatQuery(SerialQuery param) {
        var qResult = eQuery(param);
        return qResult.map(p->SerialConvertor.ToVDto(p,param.getIsRial()));
    }

    @Override
    public byte[] vatQueryExport(VatSerialQueryExportParam param) throws IOException {
        List<SerialVatDto> export = new ArrayList<>();
        int currentPage = 0;
        Page<SerialVatDto> data = vatQuery(param);
        do {
            export.addAll(data.getContent());
            currentPage++;
            BasePagedParam page = param.getPaging();
            page.setPage(currentPage);
            param.setPaging(page);
            data = vatQuery(param);
        }while (data.getTotalPages()>currentPage);
        return serialServiceHelper.generateExcelFile(export,param);
    }

}

package com.notrika.gympin.domain.qrCode;

import com.notrika.gympin.common.qrCodes.dto.QrCodeDto;
import com.notrika.gympin.common.qrCodes.param.QrCodeParam;
import com.notrika.gympin.common.qrCodes.service.QrCodeService;
import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.enums.settingsType;
import com.notrika.gympin.common.settings.base.param.*;
import com.notrika.gympin.common.settings.base.service.ApplicationConfigService;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.domain.util.convertor.QrCodeConvertor;
import com.notrika.gympin.persistence.dao.repository.qrCode.QrCodeRepository;
import com.notrika.gympin.persistence.entity.qrCode.QrCodeEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class QrCodeServiceImpl implements QrCodeService {

    @Autowired
    QrCodeRepository qrCodeRepository;

    @Override
    @Transactional
    public QrCodeDto getCode(QrCodeParam param) throws Exception {
        if(param.getCode()==null){
            if(param.getReferenceId()==null)
                throw new Exception("reference is null");
            if(param.getType()==null)
                throw new Exception("Type is null");

            //check is exist
            List<QrCodeEntity> CheckExistItem = qrCodeRepository.findAllByQrCodeTypeAndReferenceId(param.getType(),param.getReferenceId());
            if (!CheckExistItem.isEmpty()){
                var itemToUpdate = CheckExistItem.get(0);
                itemToUpdate.setCode(getNewCode());
                qrCodeRepository.update(itemToUpdate);
                return QrCodeConvertor.toDto(itemToUpdate);
            }

           return generateCode(param);
        }else{
            return retrieveCode(param.getCode());
        }
    }

    private QrCodeDto retrieveCode(String code) throws Exception{
        List<QrCodeEntity> codes = qrCodeRepository.findAllByCodeIs(code);
        if(codes==null)
            throw new Exception("qr code Not Exist");
        if(codes.size()<1)
            throw new Exception("qr code Not Exist");
        if(codes.size()>1)
            throw new Exception("qr code is duplicated please call administrator");
        return QrCodeConvertor.toDto(codes.get(0));
    }

    private QrCodeDto generateCode(QrCodeParam param){
        QrCodeEntity qrCodeEntity = QrCodeEntity.builder()
                .code(getNewCode())
                .qrCodeType(param.getType())
                .referenceId(param.getReferenceId())
                .description(param.getDescription())
                .build();
        return QrCodeConvertor.toDto(qrCodeRepository.add(qrCodeEntity));
    }

    private String getNewCode() {
        String newCode;
        List<QrCodeEntity> itemByNewCode;
        do{
            newCode = getSaltString(6);
            itemByNewCode = qrCodeRepository.findAllByCodeIs(newCode);
        }while (!itemByNewCode.isEmpty());
        return newCode;
    }


    protected String getSaltString(Integer charCount) {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < (charCount+1)) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        return salt.toString();
    }
}

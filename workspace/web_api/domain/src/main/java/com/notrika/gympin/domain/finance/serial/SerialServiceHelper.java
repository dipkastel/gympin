package com.notrika.gympin.domain.finance.serial;


import com.github.mfathi91.time.PersianDate;
import com.notrika.gympin.common.finance.serial.dto.SerialVatDto;
import com.notrika.gympin.common.finance.serial.query.VatSerialQueryExportParam;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreate;
import com.notrika.gympin.common.util._base.dto.BaseDtoWithCreateUpdate;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.*;

@Service
public class SerialServiceHelper {


    public byte[] generateExcelFile(List<SerialVatDto> inputList, VatSerialQueryExportParam param) throws IOException {

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("ارزش افزوده");

            Row headerRow = sheet.createRow(0);
            HashMap<String, String> items = getAllItems();

            int counter = 0;
            for (Map.Entry<String, String> item : items.entrySet()) {
                if (!param.getFilters().contains(item.getKey())) {
                    Cell cell = headerRow.createCell(counter);
                    cell.setCellValue(item.getValue());
                    CellStyle headerStyle = workbook.createCellStyle();
                    Font font = workbook.createFont();
                    font.setBold(true);
                    headerStyle.setFont(font);
                    cell.setCellStyle(headerStyle);
                    counter++;
                }
            }

            int rowNum = 1;
            for (SerialVatDto svd : inputList) {
                Row row = sheet.createRow(rowNum++);
                int cell = 0;
                for (Map.Entry<String, String> item : items.entrySet()) {
                    if (!param.getFilters().contains(item.getKey())) {
                        String fieldName = item.getKey().substring(0, 1).toLowerCase(Locale.ROOT) + item.getKey().substring(1);
                        String cellData = getCellData(svd, fieldName);
                        row.createCell(cell).setCellValue(cellData);
                        cell++;
                    }
                }
            }

            for (int i = 0; i < counter; i++) {
                sheet.autoSizeColumn(i);
            }

            try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
                workbook.write(bos);
                return bos.toByteArray();
            } catch (Exception e) {
            }
        }
        return null;
    }

    private HashMap<String, String> getAllItems() {

        HashMap<String, String> items = new HashMap<>();
        items.put("Id", "آی دی");
        items.put("CreatedDate", "تاریخ");
        items.put("TicketName", "بلیط ها");
        items.put("PlaceName", "مجموعه ها");
        items.put("Customer", "خریدار");
        items.put("PlacePrice", "قیمت مرکز");
        items.put("SellPrice", "قیمت فروش");
        items.put("BeneficiaryPayment", "پرداختی به ذینفع");
        items.put("Discount", "تخفیف");
        items.put("CorporatePay", "پرداختی سازمان");
        items.put("UserPay", "پرداختی کاربر");
        items.put("CommissionFee", "درصد کمیسیون");
        items.put("Beneficiary", "ذینفع");
        items.put("CommissionAll", "کمیسیون (کل)");
        items.put("CommissionByCorporate", "کمیسیون (پرداختی شرکت)");
        items.put("CommissionByUser", "کمیسیون (پرداختی کاربر)");
        items.put("NetIncomeByCorporate", "درآمد ناخالص از شرکت");
        items.put("NetIncomeByUser", "درآمد ناخالص از کاربر");
        items.put("VatByCorporate", "ارزش افزوده سازمان");
        items.put("VatByUser", "ارزش افزوده کاربر");
        items.put("Error", "سریال و خطا ها");
        return items;
    }

    private String getCellData(SerialVatDto svd, String fieldName) {
        try {
            return getCellDataValue(svd, SerialVatDto.class, fieldName);
        } catch (Exception e) {
            try {
                return getCellDataValue(svd, BaseDtoWithCreateUpdate.class, fieldName);
            } catch (Exception f) {
                try {
                    return getCellDataValue(svd, BaseDtoWithCreate.class, fieldName);
                } catch (Exception g) {
                    try {
                        return getCellDataValue(svd, BaseDto.class, fieldName);
                    } catch (Exception ex) {
                        return "خطا در بازیابی اطلاعات";
                    }
                }
            }
        }
    }

    private String getCellDataValue(SerialVatDto svd, Class<?> ob, String fieldName) throws Exception {
        String cellData = "";
        Field field = ob.getDeclaredField(fieldName);
        field.setAccessible(true);
        Object fieldOb = field.get(svd);
        if (fieldOb instanceof UserDto) {
            cellData = ((UserDto) fieldOb).getFullName();
        } else if (fieldOb instanceof Date) {
            try {
                PersianDate persianDate = PersianDate.fromGregorian(((Date)fieldOb).toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate());
                cellData = persianDate.toString();
            } catch (Exception e) {
            }
        } else if (fieldOb instanceof BigDecimal) {
            cellData = ((BigDecimal) fieldOb).setScale(0, RoundingMode.CEILING).toString();
        } else {
            cellData = fieldOb.toString();
        }
        return cellData;
    }

}

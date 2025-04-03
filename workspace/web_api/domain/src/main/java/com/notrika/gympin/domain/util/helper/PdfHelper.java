package com.notrika.gympin.domain.util.helper;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.*;
import com.notrika.gympin.common.finance.transaction.enums.GatewayType;
import com.notrika.gympin.persistence.entity.finance.corporate.FinanceIncreaseCorporateDepositRequestEntity;
import com.notrika.gympin.persistence.entity.finance.gateway.FinanceGatewayEntity;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;

public final class PdfHelper {

    public static byte[] getProFormaInvoice(FinanceIncreaseCorporateDepositRequestEntity entity, FinanceGatewayEntity gatewayEntity) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Document document = new Document();
            BaseFont baseFont = BaseFont.createFont("framework/src/main/resources/static/IRANSans.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            PdfWriter.getInstance(document, outputStream);
            document.open();
            document.add(getPdfHeader(new Font(baseFont, 25, Font.NORMAL)));
            document.add(addPersianText("پیش فاکتور",new Font(baseFont, 18, Font.NORMAL),true));
            document.add(addPersianText("  ",new Font(baseFont, 12, Font.NORMAL),false));
            document.add(getPreFormaTable(entity,gatewayEntity,baseFont));

            document.close();
            return  outputStream.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static PdfPTable getPreFormaTable(FinanceIncreaseCorporateDepositRequestEntity entity, FinanceGatewayEntity gatewayEntity, BaseFont bfont) throws Exception {
        PdfPTable table = new PdfPTable(1);
        table.setWidthPercentage(100);
        PdfPCell cell = new PdfPCell();
        cell.addElement(getInvoiceHeader(entity,bfont));
        cell.setPaddingBottom(10);
        table.addCell(cell);
        cell = new PdfPCell();
        cell.addElement(getInvoiceBody(entity,bfont));
        cell.setPaddingBottom(10);
        table.addCell(cell);
        cell = new PdfPCell();
        cell.addElement(getInvoiceHowToPay(entity,gatewayEntity,bfont));
        cell.setPaddingBottom(10);
        table.addCell(cell);
        cell = new PdfPCell();
        cell.addElement(getInvoiceFooter(entity,bfont));
        cell.setPaddingBottom(10);
        table.addCell(cell);
        return table;
    }

    private static PdfPTable getInvoiceHeader(FinanceIncreaseCorporateDepositRequestEntity entity, BaseFont bfont) {
        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);

        PdfPCell space = new PdfPCell();
        space.setBorder(Rectangle.NO_BORDER);



        PdfPCell owner = new PdfPCell();
        owner.setBorder(Rectangle.NO_BORDER);
        Paragraph powner = new Paragraph("صورت حساب سازمان : "+entity.getCorporate().getName(),new Font(bfont, 8, Font.NORMAL));
        powner.setAlignment(PdfPCell.ALIGN_LEFT);
        owner.addElement(powner);
        table.addCell(owner);


        table.addCell(space);


        PdfPCell date = new PdfPCell();
        date.setBorder(Rectangle.NO_BORDER);
        Paragraph pdate = new Paragraph("تاریخ : "+entity.getCreatedDate().toString().split(" ")[0],new Font(bfont, 8, Font.NORMAL));
        pdate.setAlignment(PdfPCell.ALIGN_RIGHT);
        date.addElement(pdate);
        table.addCell(date);


        PdfPCell creator = new PdfPCell();
        creator.setBorder(Rectangle.NO_BORDER);
        Paragraph pcreator = new Paragraph("ایجاد کننده : "+entity.getCreatorUser().getFullName(),new Font(bfont, 8, Font.NORMAL));
        pcreator.setAlignment(PdfPCell.ALIGN_LEFT);
        creator.addElement(pcreator);
        table.addCell(creator);

        table.addCell(space);

        PdfPCell inumber = new PdfPCell();
        inumber.setBorder(Rectangle.NO_BORDER);
        Paragraph pinumber = new Paragraph("شماره فاکتور : "+entity.getId(),new Font(bfont, 8, Font.NORMAL));
        pinumber.setAlignment(PdfPCell.ALIGN_RIGHT);
        inumber.addElement(pinumber);
        table.addCell(inumber);

        PdfPCell ii = new PdfPCell();
        ii.setBorder(Rectangle.NO_BORDER);
        Paragraph pii = new Paragraph("فاکتور رسمی : "+(entity.getRequestInvoice()?"دارد":"ندارد"),new Font(bfont, 8, Font.NORMAL));
        pii.setAlignment(PdfPCell.ALIGN_LEFT);
        ii.addElement(pii);
        table.addCell(ii);

        table.addCell(space);

        PdfPCell serial = new PdfPCell();
        serial.setBorder(Rectangle.NO_BORDER);
        String serialtext = entity.getSerial().getSerial().split("-")[0];
        Paragraph pserial = new Paragraph("serial : "+serialtext,new Font(bfont, 8, Font.NORMAL));
        pserial.setAlignment(PdfPCell.ALIGN_RIGHT);
        serial.addElement(pserial);
        table.addCell(serial);


        PdfPCell address = new PdfPCell();
        address.setBorder(Rectangle.NO_BORDER);
        Paragraph paddress = new Paragraph("آدرس : "+entity.getCorporate().getAddress(),new Font(bfont, 8, Font.NORMAL));
        paddress.setAlignment(PdfPCell.ALIGN_LEFT);
        address.addElement(paddress);
        address.setColspan(3);
        table.addCell(address);


        return table;
    }

    private static PdfPTable getInvoiceBody(FinanceIncreaseCorporateDepositRequestEntity entity, BaseFont bfont) {
        PdfPTable table = new PdfPTable(1);
        table.setWidthPercentage(100);
        table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);

        PdfPCell rows = new PdfPCell();
        rows.setBorder(Rectangle.NO_BORDER);
        rows.addElement(getInvoiceRows(entity,bfont));
        table.addCell(rows);

        PdfPCell sum = new PdfPCell();
        sum.setBorder(Rectangle.NO_BORDER);
        sum.addElement(getInvoiceSum(entity,bfont));
        table.addCell(sum);

        return table;
    }


    private static PdfPTable getInvoiceHowToPay(FinanceIncreaseCorporateDepositRequestEntity entity, FinanceGatewayEntity gatewayEntity, BaseFont bfont) {

        return addPersianText(gatewayEntity.getDescription(),new Font(bfont, 12, Font.NORMAL),true);
    }

    private static PdfPTable getInvoiceFooter(FinanceIncreaseCorporateDepositRequestEntity entity, BaseFont bfont) {
        PdfPTable table = new PdfPTable(1);
        table.setWidthPercentage(100);
        table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);

        PdfPCell space = new PdfPCell();
        space.setBorder(Rectangle.NO_BORDER);

        PdfPCell desc = new PdfPCell();
        desc.setBorder(Rectangle.NO_BORDER);
        Paragraph pdesc = new Paragraph("توضیحات : "+(entity.getDescription()==null?"":entity.getDescription()),new Font(bfont, 8, Font.NORMAL));
        pdesc.setAlignment(PdfPCell.ALIGN_LEFT);
        desc.addElement(pdesc);
        table.addCell(desc);

        PdfPCell rule = new PdfPCell();
        rule.setBorder(Rectangle.NO_BORDER);
        Paragraph prule = new Paragraph("این فاکتور جهت اطلاع صادر شده و ارزش قانونی ندارد.",new Font(bfont, 8, Font.NORMAL));
        prule.setAlignment(PdfPCell.ALIGN_LEFT);
        rule.addElement(prule);
        table.addCell(rule);

        return table;
    }
    private static PdfPTable getInvoiceRows(FinanceIncreaseCorporateDepositRequestEntity entity, BaseFont bfont) {
        PdfPTable table = new PdfPTable(12);
        table.setWidthPercentage(80);
        table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
        Integer fontSize = 10;

        PdfPCell space = new PdfPCell();
        space.setBorder(Rectangle.NO_BORDER);

        PdfPCell id = new PdfPCell();
        id.addElement(addPersianText("1",new Font(bfont, fontSize, Font.NORMAL),true));
        id.setColspan(1);
        table.addCell(id);

        PdfPCell name = new PdfPCell();
        name.addElement(addPersianText("افزایش شارژ جیم پین",new Font(bfont, fontSize, Font.NORMAL),true));
        name.setColspan(6);
        table.addCell(name);

        PdfPCell amount1 = new PdfPCell();
        BigDecimal amountPrice = entity.getAmount().divide(BigDecimal.valueOf(1.1));
        amount1.addElement(addPersianText(amountPrice.setScale(0).toString(),new Font(bfont, fontSize, Font.NORMAL),true));
        amount1.setColspan(5);
        table.addCell(amount1);

        PdfPCell id2 = new PdfPCell();
        id2.addElement(addPersianText("2",new Font(bfont, fontSize, Font.NORMAL),true));
        id2.setColspan(1);
        table.addCell(id2);

        PdfPCell name2 = new PdfPCell();
        name2.addElement(addPersianText("مالیات بر ارزش افزوده",new Font(bfont, fontSize, Font.NORMAL),true));
        name2.setColspan(6);
        table.addCell(name2);

        PdfPCell amount2 = new PdfPCell();
        amount2.addElement(addPersianText(amountPrice.multiply(BigDecimal.valueOf(0.1)).setScale(0,BigDecimal.ROUND_UP).toString(),new Font(bfont, fontSize, Font.NORMAL),true));
        amount2.setColspan(5);
        table.addCell(amount2);

        return table;
    }

    private static PdfPTable getInvoiceSum(FinanceIncreaseCorporateDepositRequestEntity entity, BaseFont bfont) {
        return addPersianText("جمع فاکتور : "+entity.getAmount().setScale(0)+" تومان",new Font(bfont, 12, Font.NORMAL),true);
    }

    private static PdfPTable getPdfHeader(Font font) throws Exception{
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
        PdfPCell cell = new PdfPCell();
        cell.setVerticalAlignment(PdfPCell.ALIGN_CENTER);
        cell.setBorder(Rectangle.NO_BORDER);
        Paragraph p =new Paragraph(" ",font);
        p.setAlignment(PdfPCell.ALIGN_LEFT);
        cell.addElement(p);
        cell.setColspan(1);
        table.addCell(cell);
        PdfPCell icell = new PdfPCell();
        Image image = Image.getInstance("framework/src/main/resources/static/logoTypo300.png");
        float newWidth = 130f;
        float newHeight = (image.getHeight() / image.getWidth()) * newWidth;
        image.scaleAbsolute(newWidth, newHeight);
        icell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        icell.addElement(image);
        icell.setVerticalAlignment(Element.ALIGN_CENTER);
        icell.setBorder(Rectangle.NO_BORDER);
        table.addCell(icell);


        return table;
    }

    private static PdfPTable addPersianText(String text, Font font, Boolean center) {
        PdfPTable table = new PdfPTable(1);
        table.setWidthPercentage(100);
        table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.NO_BORDER);
        Paragraph p =new Paragraph(text,font);
        p.setAlignment(center?PdfPCell.ALIGN_CENTER:PdfPCell.ALIGN_LEFT);
        cell.addElement(p);
        table.addCell(cell);
        return table;
    }

}

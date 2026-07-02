package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.finance.serial.dto.SerialDto;
import com.notrika.gympin.common.finance.serial.dto.SerialVatDto;
import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.user.user.enums.UserFinanceType;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceBuyableEntity;
import com.notrika.gympin.persistence.entity.finance.invoice.InvoiceEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceCorporateTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.FinanceUserTransactionEntity;
import com.notrika.gympin.persistence.entity.finance.transactions.gympin.FinanceIncomeTransactionEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

public final class SerialConvertor {

    public static SerialDto ToCompleteDto(FinanceSerialEntity entity) {
        if (entity == null) return null;
        SerialDto dto = new SerialDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setSerial(entity.getSerial());
        dto.setProcessType(entity.getProcessTypeEnum());
        dto.setUserTransactions(entity.getUserTransactions().stream().filter(o -> !o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setCorporateTransactions(entity.getCorporateTransactions().stream().filter(o -> !o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setPersonnelCreditTransactions(entity.getPersonnelCreditTransactions().stream().filter(o -> !o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setIncomeTransactions(entity.getIncomeTransactions().stream().filter(o -> !o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setUserIncreaseRequest(entity.getUserIncreases().stream().filter(o -> !o.isDeleted()).map(IncreaseConvertor::ToDto).collect(Collectors.toList()));
        dto.setCorporateIncreaseRequest(entity.getCorporateIncreases().stream().filter(o -> !o.isDeleted()).map(IncreaseConvertor::ToDto).collect(Collectors.toList()));
        dto.setSettlementRequests(entity.getSettlementRequests().stream().filter(o -> !o.isDeleted()).map(SettlementConvertor::ToDto).collect(Collectors.toList()));
        dto.setDiscountTransactions(entity.getDiscount().stream().filter(o -> !o.isDeleted()).map(TransactionConvertor::toDto).collect(Collectors.toList()));
        dto.setInvoices(entity.getInvoices().stream().filter(o -> !o.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()));
        dto.setPurchasedBases(entity.getPurchasedBases().stream().filter(o -> !o.isDeleted()).map(PurchasedConvertor::ToDto).collect(Collectors.toList()));
        return dto;
    }

    public static SerialDto ToDto(FinanceSerialEntity entity) {
        if (entity == null) return null;
        SerialDto dto = new SerialDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setSerial(entity.getSerial());
        dto.setProcessType(entity.getProcessTypeEnum());
        return dto;
    }

    public static SerialDto ToDtoMid(FinanceSerialEntity entity) {
        if (entity == null) return null;
        SerialDto dto = new SerialDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCreatorUser(UserConvertor.toDtoSimple(entity.getCreatorUser()));
        dto.setSerial(entity.getSerial());
        dto.setProcessType(entity.getProcessTypeEnum());
        dto.setInvoices(entity.getInvoices().stream().filter(o -> !o.isDeleted()).map(InvoiceConvertor::toDto).collect(Collectors.toList()));
        return dto;
    }


    public static SerialVatDto ToVDto(FinanceSerialEntity serial) {
        String error = "serial : " + serial.getSerial();
        try {
            InvoiceEntity invoice = serial.getInvoices().get(0);
            if (serial.getInvoices().size() != 1)
                error += "\n- invoiceCount Error : has " + serial.getInvoices().size();
            List<InvoiceBuyableEntity> buyables = invoice.getInvoiceBuyables().stream().filter(ib -> !ib.isDeleted()).collect(Collectors.toList());
            if (buyables.size() != 1)
                error += "\n- BuyableCount Error : has " + buyables.size();
            BigDecimal placePrices = BigDecimal.ZERO;
            BigDecimal sellPrice = BigDecimal.ZERO;
            BigDecimal beneficiaryPayment = BigDecimal.ZERO;
            BigDecimal discount = BigDecimal.ZERO;
            BigDecimal corporatePay = BigDecimal.ZERO;
            BigDecimal userPay = BigDecimal.ZERO;
            BigDecimal commissionAll = BigDecimal.ZERO;
            BigDecimal incomeCheck = BigDecimal.ZERO;
            String placeName = "";
            String ticketName = "";
            for (InvoiceBuyableEntity buyable : invoice.getInvoiceBuyables()) {
                placePrices = placePrices.add(buyable.getPlacePrice());
                sellPrice = sellPrice.add(buyable.getUnitPrice());
                BigDecimal placePercent = BigDecimal.valueOf(1 - (buyable.getBeneficiary().getCommissionFee() / 100));
                beneficiaryPayment = beneficiaryPayment.add(buyable.getPlacePrice().multiply(placePercent));
                discount = discount.add(buyable.getPlacePrice().subtract(buyable.getUnitPrice()));
                commissionAll = commissionAll.add(sellPrice.subtract(beneficiaryPayment)).round(new MathContext(1, RoundingMode.UP));
                ticketName += buyable.getName()+" ";
                placeName += buyable.getPlace().getName()+" ";
            }
            for (FinanceCorporateTransactionEntity coTransaction : serial.getCorporateTransactions().stream().filter(ct -> ct.getTransactionCorporateType() == TransactionCorporateType.DEPOSIT).collect(Collectors.toList())) {
                corporatePay = corporatePay.add(coTransaction.getAmount());
            }
            for (FinanceUserTransactionEntity userTransaction : serial.getUserTransactions().stream().filter(ct -> ct.getFinanceUser().getUserFinanceType() == UserFinanceType.PERSONAL_WALLET||ct.getFinanceUser().getUserFinanceType() == UserFinanceType.NON_WITHDRAWABLE_WALLET).collect(Collectors.toList())) {
                userPay = userPay.add(userTransaction.getAmount());
            }


            BigDecimal payByCorporatePercent = corporatePay.multiply(BigDecimal.valueOf(-1)).divide(sellPrice,3,BigDecimal.ROUND_CEILING);
            BigDecimal commissionByCo = commissionAll.multiply(payByCorporatePercent).divide(BigDecimal.valueOf(110),3,BigDecimal.ROUND_CEILING).multiply(BigDecimal.valueOf(100));
            BigDecimal commissionByUser = commissionAll.multiply(BigDecimal.ONE.subtract(payByCorporatePercent)).divide(BigDecimal.valueOf(110),3,BigDecimal.ROUND_CEILING).multiply(BigDecimal.valueOf(100));
            BigDecimal vatByCo = commissionByCo.multiply(BigDecimal.valueOf(0.1));
            BigDecimal vatByUser = commissionByUser.multiply(BigDecimal.valueOf(0.1));
            try{
                for (PurchasedBaseEntity purchase : serial.getPurchasedBases()){
                    for (FinanceSerialEntity pSerial :((List<FinanceSerialEntity>)purchase.getSerials()).stream().filter(p->p.getProcessTypeEnum()== ProcessTypeEnum.TRA_USE_TICKET).collect(Collectors.toList())) {
                        for(FinanceIncomeTransactionEntity income: pSerial.getIncomeTransactions()){
                            incomeCheck = incomeCheck.add(income.getAmount());
                        }
                    }
                }

            }catch (Exception e){}

            if (incomeCheck.compareTo(commissionAll) != 0)
                error += "\n- income Error : check => " + incomeCheck + " vs " + commissionAll;


            return SerialVatDto.builder()
                    .id(serial.getId())
                    .createdDate(serial.getCreatedDate())
                    .customer(UserConvertor.toDtoSimple(serial.getInvoices().get(0).getUser()))
                    .serial(serial.getSerial())
                    .placePrice(placePrices)
                    .sellPrice(sellPrice)
                    .discount(discount)
                    .beneficiaryPayment(beneficiaryPayment)
                    .corporatePay(corporatePay)
                    .userPay(userPay)
                    .commissionFee(buyables.get(0).getBeneficiary().getCommissionFee())
                    .beneficiary(UserConvertor.toDtoSimple(buyables.get(0).getBeneficiary().getUser()))
                    .commissionAll(commissionAll)
                    .commissionByCorporate(commissionByCo)
                    .commissionByUser(commissionByUser)
                    .vatByCorporate(vatByCo)
                    .vatByUser(vatByUser)
                    .ticketName(ticketName)
                    .placeName(placeName)
                    .error(error)
                    .build();
        }catch (Exception e){
            return SerialVatDto.builder()
                    .id(serial.getId())
                    .customer(UserConvertor.toDtoSimple(serial.getInvoices().get(0).getUser()))
                    .serial(serial.getSerial())
                    .error(error+" - "+e)
                    .build();
        }

    }
}

package com.notrika.gympin.domain.finance.gateways.parsian;


import java.util.HashMap;
import java.util.Map;

public class FailureMessageProvider {

    private static final Map<Short, String> messages = new HashMap<>();

    static {
        messages.put((short)59,  "عملیات خرید انجام نشد. در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب باز می‌گردد");
        messages.put((short)0,   "تراکنش با موفقیت انجام شد");
        messages.put((short)-112,"شناسه سفارش تکراری است. در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب باز می‌گردد");
        messages.put((short)-126,"درگاه از سمت بانک تایید نشد");
        messages.put((short)-127,"IP درگاه از سمت بانک تایید نشد");
        messages.put((short)-138,"انصراف از پرداخت در درگاه");
        messages.put((short)-300,"تایید تراکنش با خطا مواجه شد. در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب باز می‌گردد");
        messages.put((short)-310,"خطا در عملیات با پشتیبانی جیم‌پین تماس بگیرید. کد پیگیری خطا : ");
        messages.put((short)-311,"تراکنش یافت نشد، کد پیگیری تراکنش : ");
        messages.put((short)-312,"پرداخت‌کننده شناسایی نشد. کد پیگیری تراکنش : ");
        messages.put((short)-313,"تراکنش قبلاً محاسبه و مبلغ آن به حساب شما واریز شده. کد پیگیری تراکنش : ");
    }

    public static String getMessage(Short code) {
        return messages.getOrDefault(code,
                "خطا در تکمیل خرید. در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب باز می‌گردد");
    }
}

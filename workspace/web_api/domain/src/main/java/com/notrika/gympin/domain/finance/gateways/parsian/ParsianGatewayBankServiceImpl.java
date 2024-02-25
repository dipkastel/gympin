package com.notrika.gympin.domain.finance.gateways.parsian;


import com.notrika.gympin.common.finance.gateway.AutoGenerated.*;
import com.notrika.gympin.common.finance.gateway.param.PersianGatewayCallbackParam;
import com.notrika.gympin.common.finance.gateway.service.GatewayBankService;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.transactions.TransactionAlreadyChecked;
import com.notrika.gympin.common.util.exception.transactions.TransactionNotFound;
import com.notrika.gympin.common.util.exception.transactions.unknownPaymentBuyer;
import com.notrika.gympin.domain.finance.peyments.CalculatePaymentsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.ws.client.WebServiceClientException;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;
import org.springframework.ws.context.MessageContext;
import org.springframework.ws.soap.saaj.SaajSoapMessage;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Service
public class ParsianGatewayBankServiceImpl implements GatewayBankService {


    @Autowired
    Jaxb2Marshaller marshaller;

    @Value("${gateway.parsian.password}")
    private String loginAccount;

    @Autowired
    CalculatePaymentsServiceImpl calculatePeymentsService;


    public ClientSaleResponseData salePaymentRequest(ClientSaleRequestData requestData) {
        WebServiceTemplate template = getTemplate("https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx");
        String requestUrl = "https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService/SalePaymentRequest";
        ObjectFactory factory = new ObjectFactory();
        SalePaymentRequest request = factory.createSalePaymentRequest();
        request.setRequestData(requestData);
        template.setInterceptors(new ClientInterceptor[]{GetInterceptor(requestUrl)});
        SalePaymentRequestResponse response = (SalePaymentRequestResponse) template.marshalSendAndReceive(request);
        return response.getSalePaymentRequestResult();
    }

    public ClientConfirmResponseData confirmPaymentRequest(ClientConfirmRequestData requestData) {
        WebServiceTemplate template = getTemplate("https://pec.shaparak.ir/NewIPGServices/Confirm/ConfirmService.asmx");
        String requestUrl = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService/ConfirmPayment";
        ObjectFactory factory = new ObjectFactory();
        ConfirmPayment request = factory.createConfirmPayment();
        request.setRequestData(requestData);
        template.setInterceptors(new ClientInterceptor[]{GetInterceptor(requestUrl)});
        ConfirmPaymentResponse response = (ConfirmPaymentResponse) template.marshalSendAndReceive(request);
        return response.getConfirmPaymentResult();
    }

    @Override
    public String callback(HttpServletRequest request, Model model, PersianGatewayCallbackParam param, String ref) {
        log.info("CallbackMethod exe for param", param);
        String message = getFailierResult(param.getStatus());
        String additionalMessage = "";
        model.addAttribute("Ref", getRefrence(ref));
        var result = false;
        if (param.getStatus() == 0 && param.getRRN() > 0) {
            ClientConfirmRequestData requestData = new ClientConfirmRequestData();
            requestData.setLoginAccount(loginAccount);
            requestData.setToken(param.getToken());
            try {
                log.info("CallbackMethod Bank Request ", requestData);
                ClientConfirmResponseData clientConfirmResponseData = confirmPaymentRequest(requestData);
                if (clientConfirmResponseData.getStatus() == 0 && clientConfirmResponseData.getRRN() > 0) {
                    model.addAttribute("RRN", clientConfirmResponseData.getRRN());
                    additionalMessage =
                            " RNN : " + clientConfirmResponseData.getRRN() + "\n" +
                                    " Gateway Token : " + clientConfirmResponseData.getToken() + "\n" +
                                    " Card Hash : " + clientConfirmResponseData.getCardNumberMasked();
                    result = true;
                } else {
                    message = getFailierResult(clientConfirmResponseData.getStatus());
                }
            } catch (Exception e) {
                log.error("CallbackMethod Bank Request Faild", e);
                message = getFailierResult((short) -300);
            }
        }
        try {
            log.info("CallbackMethod CalculatePayment ", result);
            calculatePeymentsService.CalculatePayment(GeneralUtil.PureOrderId(param.getOrderId()), result, message, additionalMessage);
        } catch (TransactionNotFound e) {
            log.error("CallbackMethod CalculatePayment Faild - transactionNotFound", e);
            message = getFailierResult((short) -311) + param.getOrderId();
        } catch (unknownPaymentBuyer e) {
            log.error("CallbackMethod CalculatePayment Faild - unknownPaymentBuyer", e);
            message = getFailierResult((short) -312) + param.getOrderId();
        } catch (TransactionAlreadyChecked e) {
            log.error("CallbackMethod CalculatePayment Faild - already calculated", e);
            result = false;
            message = getFailierResult((short) -313) + param.getOrderId();
        } catch (Exception e) {
            log.error("CallbackMethod CalculatePayment Faild - ex : ", e);
            result = false;
            message = getFailierResult((short) -310) + param.getOrderId();
        }
        model.addAttribute("Message", message);
        model.addAttribute("Result", result);
        return "transactionResult";
    }

    private WebServiceTemplate getTemplate(String uri) {
        WebServiceTemplate template = new WebServiceTemplate();
        template.setMarshaller(marshaller);
        template.setUnmarshaller(marshaller);
        template.setDefaultUri(uri);
        return template;
    }

    private ClientInterceptor GetInterceptor(final String action) {
        return new ClientInterceptor() {
            @Override
            public boolean handleRequest(MessageContext messageContext) throws WebServiceClientException {
                SaajSoapMessage soapMessage = (SaajSoapMessage) messageContext.getRequest();
                soapMessage.setSoapAction(action);
                return true;
            }

            @Override
            public boolean handleResponse(MessageContext messageContext) throws WebServiceClientException {
                return false;
            }

            @Override
            public boolean handleFault(MessageContext messageContext) throws WebServiceClientException {
                return false;
            }

            @Override
            public void afterCompletion(MessageContext messageContext, Exception ex) throws WebServiceClientException {

            }
        };
    }

    private String getRefrence(String ref) {
        switch (ref) {
            case "WEBAPP":
                return "https://web.gympin.ir/wallet";
            case "WEBCORPORATE":
                return "https://corporate.gympin.ir/finance";
            case "WEBPLACE":
                return "https://place.gympin.ir";
            default:
                return "https://gympin.ir";
        }
    }

    private String getFailierResult(Short status) {
        switch (status) {
            case 59:
                return "عملیات خرید انجام نشد.در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب  باز می گردد";
            case 0:
                return "تراکنش با موفقیت انجام شد";
            case -112:
                return "شناسه سفارش تکراری است. در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب  باز می گردد";
            case -126:
                return "درگاه از سمت بانک تایید نشد";
            case -127:
                return "ip درگاه از سمت بانک تایید نشد";
            case -138:
                return "انصراف از پرداخت در درگاه";
            case -300:
                return "تایید تراکنش با خطا مواجه شد.در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب  باز می گردد";
            case -310:
                return "خطا در عملیات با پشتیبانی جیم پین تماس بگیرید. کد پیگیری خطا : ";
            case -311:
                return "تراکنش یافت نشد،کد پیگیری تراکنش : ";
            case -312:
                return "پرداخت کننده شناسایی نشد. کد پیگیری تراکنش : ";
            case -313:
                return "تراکنش قبلا محاسبه و مبلغ آن به حساب شما واریز شده. کد پیگیری تراکنش : ";
            default:
                return "خطا در تکمیل خرید.در صورتی که مبلغ از حساب شما کسر شده، مبلغ کسر شده، حداکثر تا 72 ساعت به حساب  باز می گردد";
        }
    }

}
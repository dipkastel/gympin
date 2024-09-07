package com.notrika.gympin.domain.settings.schedules;
import com.notrika.gympin.persistence.dao.repository.settings.ManageReportSettingRepository;
import com.notrika.gympin.persistence.entity.management.settings.ManageReportSettingsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.Date;

@Service
public class scheduleReports {
    //keys
    public static final String ID_OF_MAX_SELL_PLACE = "ID_OF_MAX_SELL_PLACE";
    public static final String NAME_OF_MAX_SELL_PLACE = "NAME_OF_MAX_SELL_PLACE";
    public static final String COUNT_OF_MAX_SELL_PLACE = "COUNT_OF_MAX_SELL_PLACE";

    public static final String ID_OF_MAX_SELL_TICKET = "ID_OF_MAX_SELL_TICKET_SUBSCRIBE";
    public static final String NAME_OF_MAX_SELL_TICKET = "NAME_OF_MAX_SELL_TICKET_SUBSCRIBE";
    public static final String PLACE_NAME_OF_MAX_SELL_TICKET = "PLACE_NAME_OF_MAX_SELL_TICKET_SUBSCRIBE";
    public static final String COUNT_OF_MAX_SELL_TICKET = "COUNT_OF_MAX_SELL_TICKET_SUBSCRIBE";

    public static final String ID_OF_MIN_TICKET_PRICE = "ID_OF_MIN_TICKET_SUBSCRIBE_PRICE";
    public static final String NAME_OF_MIN_TICKET_PRICE = "NAME_OF_MIN_TICKET_SUBSCRIBE_PRICE";
    public static final String PLACE_NAME_OF_MIN_TICKET_PRICE = "PLACE_NAME_OF_MIN_TICKET_SUBSCRIBE_PRICE";
    public static final String PRICE_OF_MIN_TICKET_PRICE = "PRICE_OF_MIN_TICKET_SUBSCRIBE_PRICE";

    public static final String ID_OF_MAX_TICKET_PRICE = "ID_OF_MAX_TICKET_SUBSCRIBE_PRICE";
    public static final String NAME_OF_MAX_TICKET_PRICE = "NAME_OF_MAX_TICKET_SUBSCRIBE_PRICE";
    public static final String PLACE_NAME_OF_MAX_TICKET_PRICE = "PLACE_NAME_OF_MAX_TICKET_SUBSCRIBE_PRICE";
    public static final String PRICE_OF_MAX_TICKET_PRICE = "PRICE_OF_MAX_TICKET_SUBSCRIBE_PRICE";


    public static final String LAST_TIME_SMS_CHECK = "LAST_TIME_SMS_CHECK";
    public static final String LAST_TIME_CREDITS_CHECK = "LAST_TIME_CREDITS_CHECK";
    public static final String LAST_TIME_PAYMENT_CHECK = "LAST_TIME_PAYMENT_CHECK";
    public static final String LAST_TIME_CORPORATE_CHARGE_CHECK = "LAST_TIME_CORPORATE_CHARGE_CHECK";
    public static final String LAST_TIME_DISCOUNT_CHECK = "LAST_TIME_DISCOUNT_CHECK";


    @Autowired
    public scheduleReports(ManageReportSettingRepository manageReportSettingRepository, DataSource dataSource) {
        this.manageReportSettingRepository = manageReportSettingRepository;
        this.dataSource = dataSource;
        createKeyIfNotExist(ID_OF_MAX_SELL_PLACE,"Id مجموعه ای که بیشترین فروش را داشته");
        createKeyIfNotExist(NAME_OF_MAX_SELL_PLACE,"نام مجموعه ای که بیشترین فروش را داشته");
        createKeyIfNotExist(COUNT_OF_MAX_SELL_PLACE,"تعداد فروش مجموعه ای که بیشترین فروش را داشته");
        createKeyIfNotExist(ID_OF_MAX_SELL_TICKET,"Id بلیطی که بیشترین فروش را داشته");
        createKeyIfNotExist(NAME_OF_MAX_SELL_TICKET,"نام بلیطی که بیشترین فروش را داشته");
        createKeyIfNotExist(PLACE_NAME_OF_MAX_SELL_TICKET,"نام مجموعه بلیطی که بیشترین فروش را داشته");
        createKeyIfNotExist(COUNT_OF_MAX_SELL_TICKET,"تعداد فروش بلیطی که بیشترین فروش را داشته");
        createKeyIfNotExist(ID_OF_MIN_TICKET_PRICE,"Id بلیطی که کمترین قیمت را دارد");
        createKeyIfNotExist(NAME_OF_MIN_TICKET_PRICE,"نام بلیطی که کمترین قیمت را دارد");
        createKeyIfNotExist(PLACE_NAME_OF_MIN_TICKET_PRICE,"نام مجموعه بلیطی که کمترین قیمت را دارد");
        createKeyIfNotExist(PRICE_OF_MIN_TICKET_PRICE,"قیمت بلیطی که کمترین قیمت را دارد");
        createKeyIfNotExist(ID_OF_MAX_TICKET_PRICE,"Id بلیطی که بیشترین قیمت را دارد");
        createKeyIfNotExist(NAME_OF_MAX_TICKET_PRICE,"نام بلیطی که بیشترین قیمت را دارد");
        createKeyIfNotExist(PLACE_NAME_OF_MAX_TICKET_PRICE,"نام مجموعه بلیطی که بیشترین قیمت را دارد");
        createKeyIfNotExist(PRICE_OF_MAX_TICKET_PRICE,"قیمت بلیطی که بیشترین قیمت را دارد");

        createKeyIfNotExist(LAST_TIME_SMS_CHECK,"آخرین زمانی که پیامک چک شد");
        createKeyIfNotExist(LAST_TIME_CREDITS_CHECK,"آخرین زمانی که اعتبار ها چک شد");
        createKeyIfNotExist(LAST_TIME_PAYMENT_CHECK,"آخرین زمانی که پرداخت های بانکی چک شد");
        createKeyIfNotExist(LAST_TIME_CORPORATE_CHARGE_CHECK,"آخرین زمانی که شارژ شرکت ها چک شد");
        createKeyIfNotExist(LAST_TIME_DISCOUNT_CHECK,"آخرین زمانی که شارژ شرکت ها چک شد");
    }


    private ManageReportSettingRepository manageReportSettingRepository;

    private DataSource dataSource;

    public void updateLastTimeSmsCheck(){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(LAST_TIME_SMS_CHECK);
        if(!entity.getUpdateAuto())return;
        entity.setValue((new Date()).toString());
        manageReportSettingRepository.save(entity);
    }

    public void updateLastTimeCreditCheck(){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(LAST_TIME_CREDITS_CHECK);
        if(!entity.getUpdateAuto())return;
        entity.setValue((new Date()).toString());
        manageReportSettingRepository.save(entity);
    }
    public void updateLastTimePaymentCheck(){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(LAST_TIME_PAYMENT_CHECK);
        if(!entity.getUpdateAuto())return;
        entity.setValue((new Date()).toString());
        manageReportSettingRepository.save(entity);
    }

    public void updateLastTimeCorporateChargeCheck(){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(LAST_TIME_CORPORATE_CHARGE_CHECK);
        if(!entity.getUpdateAuto())return;
        entity.setValue((new Date()).toString());
        manageReportSettingRepository.save(entity);
    }
    public void updateLastTimeDiscountCheck(){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(LAST_TIME_DISCOUNT_CHECK);
        if(!entity.getUpdateAuto())return;
        entity.setValue((new Date()).toString());
        manageReportSettingRepository.save(entity);
    }

    public void updateMaxSellByPlace() {
        queryLong("SELECT P.place_id FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" GROUP BY P.place_id order by Count(*) DESC limit 1",ID_OF_MAX_SELL_PLACE);
        queryString("SELECT C.name FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left Join place C On P.place_id = C.id where C.Status = \"ACTIVE\" GROUP BY C.id order by Count(*) DESC limit 1",NAME_OF_MAX_SELL_PLACE);
        queryInt("SELECT count(*) FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left Join place C On P.place_id = C.id where C.Status = \"ACTIVE\" GROUP BY C.id order by Count(*) DESC limit 1",COUNT_OF_MAX_SELL_PLACE);
    }


    public void updateMaxSellByTicketSubscribe() {
        queryLong("SELECT P.id FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" GROUP BY P.id order by Count(*) DESC limit 1", ID_OF_MAX_SELL_TICKET);
        queryString("SELECT P.name FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" GROUP BY P.id order by Count(*) DESC limit 1", NAME_OF_MAX_SELL_TICKET);
        queryString("SELECT C.Name FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left Join place C On P.place_id = C.id where C.Status = \"ACTIVE\" GROUP BY P.id order by Count(*) DESC limit 1", PLACE_NAME_OF_MAX_SELL_TICKET);
        queryInt("SELECT count(*) FROM subscribe T LEFT JOIN ticket_subscribe P ON T.ticket_subscribe_id = P.id Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" GROUP BY P.id order by Count(*) DESC limit 1", COUNT_OF_MAX_SELL_TICKET);
    }

    public void updateMinTicketSubscribePrice() {

        queryLong("SELECT P.id FROM ticket_subscribe P Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" order by P.price limit 1", ID_OF_MIN_TICKET_PRICE);
        queryString("SELECT P.name FROM ticket_subscribe P Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" order by P.price limit 1", NAME_OF_MIN_TICKET_PRICE);
        queryString("SELECT C.Name FROM ticket_subscribe P JOIN place C ON P.place_id = C.id where C.Status = \"ACTIVE\" order by P.price limit 1", PLACE_NAME_OF_MIN_TICKET_PRICE);
        queryBigDecimal("SELECT P.price FROM ticket_subscribe P Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" order by P.price limit 1", PRICE_OF_MIN_TICKET_PRICE);
    }

    public void updateMaxTicketSubscribePrice() {

        queryLong("SELECT P.id FROM ticket_subscribe P Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" order by P.price Desc limit 1", ID_OF_MAX_TICKET_PRICE);
        queryString("SELECT P.name FROM ticket_subscribe P Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" order by P.price Desc limit 1", NAME_OF_MAX_TICKET_PRICE);
        queryString("SELECT C.Name FROM ticket_subscribe P JOIN place C ON P.place_id = C.id where C.Status = \"ACTIVE\" order by P.price Desc limit 1", PLACE_NAME_OF_MAX_TICKET_PRICE);
        queryBigDecimal("SELECT P.price FROM ticket_subscribe P Left JOIN place C on P.place_id = C.Id where C.Status = \"ACTIVE\" order by P.price Desc limit 1", PRICE_OF_MAX_TICKET_PRICE);
    }


    private void createKeyIfNotExist(String key,String description) {
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(key);
        if(entity==null){
            manageReportSettingRepository.add(ManageReportSettingsEntity.builder().key(key).value("just created").description(description).build());
        }
    }

    private void queryInt(String query,String key){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, Integer.class).toString());
        manageReportSettingRepository.save(entity);
    }
    private void queryString(String query,String key){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, String.class));
        manageReportSettingRepository.save(entity);
    }
    private void queryLong(String query,String key){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, Long.class).toString());
        manageReportSettingRepository.save(entity);
    }
    private void queryBigDecimal(String query,String key){
        ManageReportSettingsEntity entity = manageReportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, BigDecimal.class).toString());
        manageReportSettingRepository.save(entity);
    }


}

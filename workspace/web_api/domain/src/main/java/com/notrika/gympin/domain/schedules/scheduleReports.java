package com.notrika.gympin.domain.schedules;
import com.notrika.gympin.persistence.dao.repository.ReportSettingRepository;
import com.notrika.gympin.persistence.entity.settings.ReportSettingsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.math.BigDecimal;

@Service
public class scheduleReports {
    //keys
    public static final String ID_OF_MAX_SELL_PLACE = "ID_OF_MAX_SELL_PLACE";
    public static final String NAME_OF_MAX_SELL_PLACE = "NAME_OF_MAX_SELL_PLACE";
    public static final String COUNT_OF_MAX_SELL_PLACE = "COUNT_OF_MAX_SELL_PLACE";

    public static final String ID_OF_MAX_SELL_PLAN = "ID_OF_MAX_SELL_PLAN";
    public static final String NAME_OF_MAX_SELL_PLAN = "NAME_OF_MAX_SELL_PLAN";
    public static final String PLACE_NAME_OF_MAX_SELL_PLAN = "PLACE_NAME_OF_MAX_SELL_PLAN";
    public static final String COUNT_OF_MAX_SELL_PLAN = "COUNT_OF_MAX_SELL_PLAN";

    public static final String ID_OF_MIN_PLAN_PRICE = "ID_OF_MIN_PLAN_PRICE";
    public static final String NAME_OF_MIN_PLAN_PRICE = "NAME_OF_MIN_PLAN_PRICE";
    public static final String PLACE_NAME_OF_MIN_PLAN_PRICE = "PLACE_NAME_OF_MIN_PLAN_PRICE";
    public static final String PRICE_OF_MIN_PLAN_PRICE = "PRICE_OF_MIN_PLAN_PRICE";

    public static final String ID_OF_MAX_PLAN_PRICE = "ID_OF_MAX_PLAN_PRICE";
    public static final String NAME_OF_MAX_PLAN_PRICE = "NAME_OF_MAX_PLAN_PRICE";
    public static final String PLACE_NAME_OF_MAX_PLAN_PRICE = "PLACE_NAME_OF_MAX_PLAN_PRICE";
    public static final String PRICE_OF_MAX_PLAN_PRICE = "PRICE_OF_MAX_PLAN_PRICE";


    @Autowired
    public scheduleReports(ReportSettingRepository reportSettingRepository, DataSource dataSource) {
        this.reportSettingRepository = reportSettingRepository;
        this.dataSource = dataSource;
        createKeyIfNotExist(ID_OF_MAX_SELL_PLACE,"Id مجموعه ای که بیشترین فروش را داشته");
        createKeyIfNotExist(NAME_OF_MAX_SELL_PLACE,"نام مجموعه ای که بیشترین فروش را داشته");
        createKeyIfNotExist(COUNT_OF_MAX_SELL_PLACE,"تعداد فروش مجموعه ای که بیشترین فروش را داشته");
        createKeyIfNotExist(ID_OF_MAX_SELL_PLAN,"Id پلنی که بیشترین فروش را داشته");
        createKeyIfNotExist(NAME_OF_MAX_SELL_PLAN,"نام پلنی که بیشترین فروش را داشته");
        createKeyIfNotExist(PLACE_NAME_OF_MAX_SELL_PLAN,"نام مجموعه پلنی که بیشترین فروش را داشته");
        createKeyIfNotExist(COUNT_OF_MAX_SELL_PLAN,"تعداد فروش پلنی که بیشترین فروش را داشته");
        createKeyIfNotExist(ID_OF_MIN_PLAN_PRICE,"Id پلنی که کمترین قیمت را دارد");
        createKeyIfNotExist(NAME_OF_MIN_PLAN_PRICE,"نام پلنی که کمترین قیمت را دارد");
        createKeyIfNotExist(PLACE_NAME_OF_MIN_PLAN_PRICE,"نام مجموعه پلنی که کمترین قیمت را دارد");
        createKeyIfNotExist(PRICE_OF_MIN_PLAN_PRICE,"قیمت پلنی که کمترین قیمت را دارد");
        createKeyIfNotExist(ID_OF_MAX_PLAN_PRICE,"Id پلنی که بیشترین قیمت را دارد");
        createKeyIfNotExist(NAME_OF_MAX_PLAN_PRICE,"نام پلنی که بیشترین قیمت را دارد");
        createKeyIfNotExist(PLACE_NAME_OF_MAX_PLAN_PRICE,"نام مجموعه پلنی که بیشترین قیمت را دارد");
        createKeyIfNotExist(PRICE_OF_MAX_PLAN_PRICE,"قیمت پلنی که بیشترین قیمت را دارد");
    }


    private ReportSettingRepository reportSettingRepository;

    private DataSource dataSource;


    public void updateMaxSellByPlace() {
        queryLong("SELECT P.place_id FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id GROUP BY P.place_id order by Count(*) DESC limit 1",ID_OF_MAX_SELL_PLACE);
        queryString("SELECT C.name FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id Left Join place C On P.place_id = C.id GROUP BY C.id order by Count(*) DESC limit 1",NAME_OF_MAX_SELL_PLACE);
        queryInt("SELECT count(*) FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id Left Join place C On P.place_id = C.id GROUP BY C.id order by Count(*) DESC limit 1",COUNT_OF_MAX_SELL_PLACE);
    }


    public void updateMaxSellByPlan() {
        queryLong("SELECT P.id FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id GROUP BY P.id order by Count(*) DESC limit 1",ID_OF_MAX_SELL_PLAN);
        queryString("SELECT P.name FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id GROUP BY P.id order by Count(*) DESC limit 1",NAME_OF_MAX_SELL_PLAN);
        queryString("SELECT C.Name FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id Left Join place C On P.place_id = C.id GROUP BY P.id order by Count(*) DESC limit 1",PLACE_NAME_OF_MAX_SELL_PLAN);
        queryInt("SELECT count(*) FROM ticket T LEFT JOIN plan P ON T.plan_id = P.id GROUP BY P.id order by Count(*) DESC limit 1",COUNT_OF_MAX_SELL_PLAN);
    }

    public void updateMinPlanPrice() {

        queryLong("SELECT P.id FROM plan P order by P.price limit 1",ID_OF_MIN_PLAN_PRICE);
        queryString("SELECT P.name FROM plan P order by P.price limit 1",NAME_OF_MIN_PLAN_PRICE);
        queryString("SELECT C.Name FROM plan P JOIN place C ON P.place_id = C.id order by P.price limit 1",PLACE_NAME_OF_MIN_PLAN_PRICE);
        queryBigDecimal("SELECT P.price FROM plan P order by P.price limit 1",PRICE_OF_MIN_PLAN_PRICE);
    }

    public void updateMaxPlanPrice() {

        queryLong("SELECT P.id FROM plan P order by P.price Desc limit 1",ID_OF_MAX_PLAN_PRICE);
        queryString("SELECT P.name FROM plan P order by P.price Desc limit 1",NAME_OF_MAX_PLAN_PRICE);
        queryString("SELECT C.Name FROM plan P JOIN place C ON P.place_id = C.id order by P.price Desc limit 1",PLACE_NAME_OF_MAX_PLAN_PRICE);
        queryBigDecimal("SELECT P.price FROM plan P order by P.price Desc limit 1",PRICE_OF_MAX_PLAN_PRICE);
    }


    private void createKeyIfNotExist(String key,String description) {
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(key);
        if(entity==null){
            reportSettingRepository.add(ReportSettingsEntity.builder().key(key).value("just created").description(description).build());
        }
    }

    private void queryInt(String query,String key){
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, Integer.class).toString());
        reportSettingRepository.save(entity);
    }
    private void queryString(String query,String key){
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, String.class));
        reportSettingRepository.save(entity);
    }
    private void queryLong(String query,String key){
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, Long.class).toString());
        reportSettingRepository.save(entity);
    }
    private void queryBigDecimal(String query,String key){
        ReportSettingsEntity entity = reportSettingRepository.getFirstByKey(key);
        if(!entity.getUpdateAuto())return;
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        entity.setValue(jdbcTemplate.queryForObject(query, BigDecimal.class).toString());
        reportSettingRepository.save(entity);
    }
}

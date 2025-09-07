package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionEntity;
import com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionSimpleDto;
import com.notrika.gympin.persistence.entity.management.service.PopularSportRequestDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import javax.persistence.SqlResultSetMapping;
import java.util.Date;
import java.util.List;

@Repository
public interface ManageServiceExecutionRepository extends BaseRepository<ManageServiceExecutionEntity, Long> {
//
//    @Modifying
//    @Query("UPDATE ManageServiceExecutionEntity SET is_deleted=1 where id=:#{#id}")
//    void forceDelete(long i);



   @Query("SELECT m FROM ManageServiceExecutionEntity m WHERE m.id IN (SELECT MAX(n.id) FROM ManageServiceExecutionEntity n WHERE n.executorUser IS NOT NULL  AND n.executionDate > :#{#fromDate} AND n.executionDate < :#{#toDate} GROUP BY n.executorUser)  AND m.executionDate > :#{#fromDate} AND m.executionDate < :#{#toDate} ORDER BY m.executionDate DESC")
    List<ManageServiceExecutionEntity> getUsersActive(Date fromDate,Date toDate);

   @Query("SELECT new com.notrika.gympin.persistence.entity.management.service.ManageServiceExecutionSimpleDto(Max(m.id), m.executorUser ,max(m.createdDate) ,max(m.executionDate)) FROM ManageServiceExecutionEntity m WHERE m.executionDate BETWEEN :#{#fromDate} AND :#{#toDate} AND m.executorUser.id IS NOT NULL GROUP BY m.executorUser.id ORDER BY MAX(m.id) Desc")
   List<ManageServiceExecutionSimpleDto> getFastUsersActive(Date fromDate,Date toDate);

   @Query("SELECT  n.executorUser.id FROM ManageServiceExecutionEntity n JOIN CorporatePersonnelEntity cp on cp.user.id = n.executorUser.id  WHERE cp.corporate.id = :#{#corporateId} AND n.executorUser.id IS NOT NULL  AND n.executionDate > :#{#fromDate} GROUP BY n.executorUser.id")
    List<Long> getActiveUsersByCorporate(Date fromDate,Long corporateId);

    @Query(value = "SELECT Pmonth(ft.create_date)+(pyear(ft.create_date)*100) as ym , CONCAT(pyear(MIN(ft.create_date)),\" \",pmonthname(MIN(ft.create_date))) as monthName,SUM(ft.amount) as amount FROM finance_corporate_transaction fct LEFT JOIN finance_transaction ft ON ft.id = fct.id join invoice inv on fct.serial_id = inv.serial_id WHERE inv.status like 'COMPLETED' AND fct.type = 'DEPOSIT' AND ft.amount < 0 AND fct.finance_corporate_id = :financeCorporateId GROUP BY ym", nativeQuery = true)
    List<Object[]> getReportUseCorporateCharge(Long financeCorporateId);

    @Query(value = "SELECT COUNT(*) AS total FROM purchased_base pb JOIN purchased_subscribe ps ON pb.id = ps.id JOIN corporate_personel cp ON pb.customer_user_id = cp.personnel_user_id WHERE cp.corporate_id = :corporateId AND ps.status IN ('ACTIVE', 'COMPLETE') AND pb.create_date >= NOW() - INTERVAL 7 DAY", nativeQuery = true)
    Long getTicketBuyThisWeekByCorporateId(Long corporateId);


    @Query(value = "SELECT COUNT(DISTINCT u.id) as Count  FROM invoice i  JOIN finance_serial fs ON i.serial_id = fs.id  JOIN finance_corporate_transaction fct ON fct.serial_id = fs.id  JOIN finance_corporate fc ON fc.id = fct.finance_corporate_id  JOIN `user` u ON u.id = i.user_id  WHERE fc.corporate_id = :corporateId   AND i.status = 'COMPLETED'   AND fct.type = 'DEPOSIT'   AND fs.create_date >= DATE_SUB(CURDATE(), INTERVAL :intervalMonthCount MONTH)   AND u.gender = :gender ", nativeQuery = true)
    Long getTicketBuyByDateThisWeekByGenderAndCorporateId(Integer intervalMonthCount, String gender, Long corporateId);


//    @Query(value = "SELECT Max(s.name) as sportName , Count(s.Id) as count FROM purchasedbase pb  JOIN purchased_subscribe ps on pb.id = ps.id  JOIN finance_purchased_serial fps on fps.purchased_id = pb.id  JOIN invoice i ON i.serial_id = fps.serial_id  JOIN ticket_subscribe tsu ON tsu.id = ps.ticket_subscribe_id  JOIN ticket_buyable tb ON tb.id = tsu.id  JOIN ticket_subsctibe_sport tss ON tb.id = tss.ticket_subscribe_id  JOIN place_sport pls ON pls.id = tss.place_sport_id  JOIN sport s on s.id = pls.sport_id   JOIN finance_corporate_personel_credit_transaction fcpct ON fcpct.serial_id = fps.serial_id  JOIN finance_corporate_personel_credit fcpc ON fcpct.personel_credit_id = fcpc.id  JOIN corporate_personel cp on fcpc.corporate_personnel_id = cp.id  where i.status = 'COMPLETED'  and cp.corporate_id = :corporateId  and ps.status != 'REFUNDED'  and i.is_deleted = 0  and tb.is_deleted = 0  and pls.is_deleted = 0  and s.is_deleted = 0  and fcpc.is_deleted = 0  and cp.is_deleted = 0  GROUP by s.id", nativeQuery = true)
//    @Query("SELECT new com.notrika.gympin.persistence.dto.PopularSportRequestDto(s.name, COUNT(s.id)) FROM InvoiceEntity i "+
//            " JOIN i.serial pb  -- FinanceSerialEntity "+
//            " JOIN pb.purchasedBases ps  -- PurchasedBaseEntity / PurchasedSubscribeEntity "+
//            " JOIN ps.ticketSubscribe tsu  -- TicketSubscribeEntity "+
//            " JOIN tsu.ticketSubscribeSport tss  -- PlaceSportEntity "+
//            " JOIN tss.sport s  -- SportEntity "+
//            " JOIN i.corporate cp "+
//            " WHERE i.status = com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus.COMPLETED "+
//            " AND cp.id = :corporateId "+
//            " AND ps.status != com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus.REFUNDED "+
//            " AND i.isDeleted = false "+
//            " AND tsu.isDeleted = false "+
//            " AND tss.isDeleted = false "+
//            " AND s.isDeleted = false "+
//            " AND cp.isDeleted = false "+
//            " GROUP BY s.id "+
//            " ORDER BY COUNT(s.id) DESC ")


    @Query(value = "SELECT new com.notrika.gympin.persistence.entity.management.service.PopularSportRequestDto( Max(s.name) as sportName , Count(s.id) as count ) FROM PurchasedBaseEntity pb  " +
            "JOIN PurchasedSubscribeEntity ps on pb.id = ps.id  " +
            "JOIN pb.Serials se " +
            "JOIN InvoiceEntity i ON i.serial.id = se.id  " +
            "JOIN TicketSubscribeEntity tsu ON tsu.id = ps.ticketSubscribe.id  " +
            "JOIN BuyableEntity tb ON tb.id = tsu.id  " +
            "JOIN tsu.ticketSubscribeSport plss " +
            "JOIN SportEntity s on s.id = plss.sport.id   " +
            "JOIN FinanceCorporatePersonnelCreditTransactionEntity fcpct ON fcpct.serial.id = se.id  " +
            "JOIN FinanceCorporatePersonnelCreditEntity fcpc ON fcpct.personnelCredit.id = fcpc.id  " +
            "JOIN CorporatePersonnelEntity cp on fcpc.corporatePersonnel.id = cp.id  " +
            "where i.status = 'COMPLETED'  " +
            "and cp.corporate.id = :corporateId  " +
            "and ps.status <> 'REFUNDED' " +
            "and i.deleted = 0  " +
            "and tb.deleted = 0  " +
            "and plss.deleted = 0  " +
            "and s.deleted = 0  " +
            "and fcpc.deleted = 0  " +
            "and cp.deleted = 0  " +
            "GROUP by s.id")
    List<PopularSportRequestDto> getPopularReport(Long corporateId);



}



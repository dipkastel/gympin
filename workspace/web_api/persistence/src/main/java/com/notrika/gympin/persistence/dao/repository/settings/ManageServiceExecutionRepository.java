package com.notrika.gympin.persistence.dao.repository.settings;

import com.notrika.gympin.persistence.dao.repository.BaseRepository;
import com.notrika.gympin.persistence.entity.management.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.awt.print.Pageable;
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

    @Query(value = "SELECT new com.notrika.gympin.persistence.entity.management.service.ActiveUsersQueryDto( max(u.fullName),u ,max(cp.id), count(u.id)) \n" +
            " FROM ManageServiceExecutionEntity mse \n" +
            "JOIN  CorporatePersonnelEntity cp ON mse.executorUser.id = cp.user.id \n" +
            "JOIN UserEntity u ON u.id = cp.user.id \n" +
            "where cp.corporate.id = :corporateId \n" +
            "AND mse.createdDate >= :startDate \n" +
            "GROUP BY u.id \n" +
            "order by count(u.id) DESC \n")
    List<ActiveUsersQueryDto> getActiveUsers(Long corporateId, Date startDate);

    @Query(value = "SELECT new com.notrika.gympin.persistence.entity.management.service.UserEnterRequestDto( u, COUNT(pse.id),cp.id)\n" +
            "    FROM PurchasedSubscribeEntryEntity pse \n" +
            "    JOIN pse.purchasedSubscribe ps \n" +
            "    JOIN ps.Serials fps \n" +
            "    JOIN FinanceCorporatePersonnelCreditTransactionEntity fcpct ON fcpct.serial.id = fps.id \n" +
            "    JOIN FinanceCorporatePersonnelCreditEntity fcpc ON fcpc.id = fcpct.personnelCredit.id \n" +
            "    JOIN CorporatePersonnelEntity cp ON cp.id = fcpc.corporatePersonnel.id \n" +
            "    JOIN UserEntity u ON u.id = cp.user.id \n" +
            "    WHERE cp.corporate.id = :corporateId \n" +
            "    AND pse.createdDate >= :startDate \n" +
            "    GROUP BY u.id \n" +
            "    ORDER BY COUNT(pse.id) DESC")
    List<UserEnterRequestDto> getActiveInEnterPlacePersonnel(Long corporateId, Date startDate);



}



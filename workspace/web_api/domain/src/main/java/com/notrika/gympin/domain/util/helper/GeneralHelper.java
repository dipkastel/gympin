package com.notrika.gympin.domain.util.helper;

import com.notrika.gympin.common.settings.gifts.enums.GiftCreditStatusEnum;
import com.notrika.gympin.common.util.exception.activation.code.CannotRegisterByThisCode;
import com.notrika.gympin.common.util.exception.activation.code.InviteCodeExpired;
import com.notrika.gympin.common.util.exception.activation.code.InviteCodeNotValid;
import com.notrika.gympin.common.util.exception.activation.code.YourRegisterationIsAlreadyDone;
import com.notrika.gympin.persistence.dao.repository.settings.ManageGiftCreditRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.management.gifts.ManageGiftCreditEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public final class GeneralHelper {


    public static <T> T requireNonNull(T obj, String parameterName) {
        if (obj == null) {
            throw new NullPointerException(parameterName + "IS NULL!O_o!");
        }
        return obj;
    }

    public static <T> T requireNonNull(T obj) {
        return Objects.requireNonNull(obj);
    }


    public static Date calcDateByDiff(Date baseDate, int diff, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(field, diff);
        return calendar.getTime();
    }

    public static String fixPhoneNumber(String phonenumber) {
        if (phonenumber.startsWith("9"))
            phonenumber = "0" + phonenumber;
        if (phonenumber.startsWith("+98"))
            phonenumber = phonenumber.replace("+98", "0");
        return phonenumber;
    }

    public static String[] secret = new String[]{"M", "L", "O", "K", "N", "B", "J", "I", "U", "H", "V", "G", "Y", "T", "F", "X", "Z", "D", "R", "E", "S", "A", "W", "Q"};


    /*invite codes
    P : invited by place
    C : invited by corporate
    U : invited by user
    G : invited by gift Cards*/
    public static boolean checkInviteCode(String inviteCode, UserRepository userRepository, ManageGiftCreditRepository giftRepository) {

        String pureInviteCode = "";
        pureInviteCode = (inviteCode.startsWith("P") || inviteCode.startsWith("C") || inviteCode.startsWith("U")) ?
                inviteCode.substring(1) : inviteCode;
        if (inviteCode.startsWith("G")) {
            return checkInviteByGifts(pureInviteCode, giftRepository);
        }
        String code = pureInviteCode.substring(3, pureInviteCode.length() - 2);
        Long inviterId = Long.parseLong(code, 16);
        String num = pureInviteCode.substring(2, 3);
        String generatedInviteCode = getInviteCode(inviterId, Integer.parseInt(num));
        switch (inviteCode.substring(0, 1)) {
            case "C":
                if (generatedInviteCode.equals(pureInviteCode))
                    return true;
            case "P":
                if (generatedInviteCode.equals(pureInviteCode))
                    return true;
            default:
                List<UserEntity> alreadyUseByUser = userRepository.findByInvitedBy(generatedInviteCode);
                if (alreadyUseByUser.size() < 1 && generatedInviteCode.equals(pureInviteCode))
                    return true;
        }
        return false;
    }

    private static boolean checkInviteByGifts(String inviteCode, ManageGiftCreditRepository giftCreditRepository) {
        ManageGiftCreditEntity giftCreditEntity = giftCreditRepository.getByRegisterCodeAndDeletedIsFalse(inviteCode);
        if (giftCreditEntity == null)
            throw new InviteCodeNotValid();
        if (giftCreditEntity.getExpireDate().before(new Date()))
            throw new InviteCodeExpired();
        if (!giftCreditEntity.getCanRegister())
            throw new CannotRegisterByThisCode();
        if (giftCreditEntity.getStatus() != GiftCreditStatusEnum.ACTIVE)
            throw new YourRegisterationIsAlreadyDone();
        return true;
    }

    public static String getInviteCode(Long userId, Integer num) {
        var Token = secret[(int) (userId % secret.length)] +
                secret[(int) (userId % (secret.length - 1))] +
                num +
                Long.toHexString(userId) +
                secret[(int) (userId % (secret.length - 2))] +
                secret[(int) (userId % (secret.length - 3))];
        return Token.toUpperCase();
    }

    public static String GenerateGiftCode(ManageGiftCreditRepository repository) {
        ManageGiftCreditEntity entity;
        String code = "";
        do {
            code = "G" + GenerateString(6);
            entity = repository.getByCodeAndDeletedIsFalse(code);
        } while (entity != null);
        return code;
    }

    public static String GenerateGiftRegisterCode(ManageGiftCreditRepository repository) {
        ManageGiftCreditEntity entity;
        String code = "";
        do {
            code = "GR" + GenerateString(6);
            entity = repository.getByRegisterCodeAndDeletedIsFalse(code);
        } while (entity != null);
        return code;
    }

    private static String GenerateString(int range) {
        String list = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
        var res = "";
        for (var i = 0; i < range; i++) {
            int rnd = Math.round((float) Math.random() * (list.length() - 1));
            res = res + list.charAt(rnd);
        }
        return res;
    }
}

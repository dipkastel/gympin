package com.notrika.gympin.domain.util.helper;

import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
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


    public static boolean checkInviteCode(String inviteCode, UserRepository userRepository) {
        try {
            String pureInviteCode = "";
            pureInviteCode = (inviteCode.startsWith("P") || inviteCode.startsWith("C")|| inviteCode.startsWith("G"))?
                 inviteCode.substring(1): inviteCode;
            String code = pureInviteCode.substring(3, pureInviteCode.length() - 2);
            Long inviterId = Long.parseLong(code,16);
            String num = pureInviteCode.substring(2, 3);
            String generatedInviteCode = getInviteCode(inviterId, Integer.parseInt(num));
            switch (inviteCode.substring(0, 1)) {
                case "C":
                    if (generatedInviteCode.equals(pureInviteCode))
                        return true;
                case "P":
                    if (generatedInviteCode.equals(pureInviteCode))
                        return true;
                case "G":
                    if (generatedInviteCode.equals(pureInviteCode))
                        return true;
                default:
                    List<UserEntity> alreadyUseByUser = userRepository.findByInvitedBy(generatedInviteCode);
                    if (alreadyUseByUser.size() < 1 && generatedInviteCode.equals(pureInviteCode))
                        return true;
            }
        } catch (Exception e) {
        }
        return false;
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

}

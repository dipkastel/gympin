package com.notrika.gympin.domain.android.gympin;

import com.notrika.gympin.common.android.gympin.dto.MainPageItemDto;
import com.notrika.gympin.common.android.gympin.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.param.SplashParam;
import com.notrika.gympin.common.android.gympin.service.GympinApplicationService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GympinApplicationServiceImpl implements GympinApplicationService {
    @Override
    public SplashDto splash(SplashParam splashParam) {
        return new SplashDto();
    }

    @Override
    public List<MainPageItemDto> mainPage() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String json  =  "[{\"type\":\"slider\",\"priority\":0,\"items\":[{\"imageUrl\":\"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sports-and-tech-banner-design-template-b60eb30e679bdd78cde37d835c83f5c1_screen.jpg\",\"title\":\"title1\",\"description\":\"\",\"destination\":\"sports\",\"data\":\"All\",\"priority\":2},{\"imageUrl\":\"https://i.pinimg.com/originals/4b/78/37/4b783786a354609d0c8b1d2a6e7b4b78.jpg\",\"title\":\"title2\",\"description\":\"\",\"destination\":\"innerBrowser\",\"data\":\"http://...\",\"priority\":1},{\"imageUrl\":\"https://secureprintportal.s3.us-west-1.amazonaws.com/production/assets/5966561450122033bd4456f8/imageLocker/blog-description/5f11c366a53d4d3a831471de/blog/sports_banners.png\",\"title\":\"title3\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@me\",\"priority\":3}]},{\"type\":\"title\",\"priority\":1,\"items\":[{\"imageUrl\":\"\",\"title\":\"برترینورزشکاران\",\"description\":\"\",\"destination\":\"userList\",\"data\":\"TopAll\",\"priority\":0}]},{\"type\":\"user_list\",\"priority\":2,\"items\":[{\"imageUrl\":\"https://pod.inside-agile.de/common/images/numbers/12830_1.jpg\",\"title\":\"ربیعهسلمکقرچلو\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@mohamadAlipour\",\"priority\":0},{\"imageUrl\":\"https://www.uxmatters.com/authors/Kuldeep-Kulshreshtha.jpg\",\"title\":\"مسلمگرکانی\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@karim21\",\"priority\":1},{\"imageUrl\":\"https://www.micromata.de/wp-content/uploads/2021/03/avatar_user_7_1491310778-150x150.jpg\",\"title\":\"حبیبنسیمآبادی\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@alif84\",\"priority\":2},{\"imageUrl\":\"https://images-na.ssl-images-amazon.com/images/I/41NnhFZA8aL._SY600_.jpg\",\"title\":\"احسانابراهیمی\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@alif84\",\"priority\":3},{\"imageUrl\":\"https://blog-gestion-de-projet.com/wp-content/uploads/2020/03/Capture-d%E2%80%99e%CC%81cran-2019-12-20-a%CC%80-00.43.05-300x300.png\",\"title\":\"سحراسدی\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@alif84\",\"priority\":4},{\"imageUrl\":\"https://certification.scrumalliance.org/system/members/photos/000/006/637/200x200/hohmann-small.jpg?1543438680\",\"title\":\"علیرضاخانی\",\"description\":\"\",\"destination\":\"profile\",\"data\":\"@alif84\",\"priority\":5}]},{\"type\":\"banner\",\"priority\":3,\"items\":[{\"imageUrl\":\"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a93f1056368213.59ac0e6672bf2.jpg\",\"title\":\"\",\"description\":\"\",\"destination\":\"innerBrowser\",\"data\":\"http://...\",\"priority\":0}]},{\"type\":\"title\",\"priority\":4,\"items\":[{\"imageUrl\":\"\",\"title\":\"ورزشهایتخفیفدار\",\"description\":\"\",\"destination\":\"discounts\",\"data\":\"TopAll\",\"priority\":0}]},{\"type\":\"discount_list\",\"priority\":5,\"items\":[{\"imageUrl\":\"https://static01.nyt.com/images/2020/05/19/well/physed-gym/physed-gym-superJumbo-v2.jpg\",\"title\":\"باشگاهگیو\",\"description\":\"تخفیف40%\",\"destination\":\"places\",\"data\":\"@giv\",\"priority\":0},{\"imageUrl\":\"https://www.gannett-cdn.com/presto/2020/04/16/USAT/5b7ef814-a04d-44c8-86ef-1d47c798a1f1-Golds_gym_CharlesTown.jpg\",\"title\":\"باشگاهشهرداری\",\"description\":\"تخفیف10%\",\"destination\":\"places\",\"data\":\"@shahrdary\",\"priority\":1}]},{\"type\":\"banner\",\"priority\":6,\"items\":[{\"imageUrl\":\"https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-color-tennis-sport-advertising-background-backgroundmotionwork-outtennistreeshand-paintedfreshhouses-image_75815.jpg\",\"title\":\"\",\"description\":\"\",\"destination\":\"innerBrowser\",\"data\":\"http://...\",\"priority\":0}]},{\"type\":\"title\",\"priority\":7,\"items\":[{\"imageUrl\":\"\",\"title\":\"مقالاتوآموزشها\",\"description\":\"\",\"destination\":\"contents\",\"data\":\"TopAll\",\"priority\":0}]},{\"type\":\"content_list\",\"priority\":8,\"items\":[{\"imageUrl\":\"https://www.fashionbeans.com/wp-content/uploads/2016/06/sixpack3.jpg\",\"title\":\"چگونهسیکسپکبسازیم\",\"description\":\"4.4\",\"destination\":\"singleContent\",\"data\":\"4485\",\"priority\":0},{\"imageUrl\":\"https://evofitness.at/wp-content/uploads/2019/08/EVO-201-1200x675.jpg\",\"title\":\"مقدماتtrx\",\"description\":\"5\",\"destination\":\"singleContent\",\"data\":\"5422\",\"priority\":1},{\"imageUrl\":\"https://www.trifectanutrition.com/hubfs/how-to-gain-weight-fast-secrets-for-skinny-guys.jpg\",\"title\":\"چاقشویدوچاقبمانید\",\"description\":\"4.8\",\"destination\":\"singleContent\",\"data\":\"7355\",\"priority\":2},{\"imageUrl\":\"https://spy.com/wp-content/uploads/2021/03/online-self-defense-featured.jpg\",\"title\":\"آموزشچندحرکتسریعدردفاعشخصی\",\"description\":\"4.9\",\"destination\":\"singleContent\",\"data\":\"8844\",\"priority\":3},{\"imageUrl\":\"https://s.abcnews.com/images/Health/gty_cellulite_jtm_130926_16x9_1600.jpg\",\"title\":\"رفعچروکبعدلاغریبایکروشساده\",\"description\":\"8\",\"destination\":\"singleContent\",\"data\":\"8852\",\"priority\":4}]}]";
            List<MainPageItemDto> mainList = objectMapper.readValue(json, List.class);
            return mainList;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}

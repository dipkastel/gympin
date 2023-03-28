package com.notrika.gympin.persistence.entity.multimedia;

import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import com.notrika.gympin.persistence.entity.article.ArticleEntity;
import com.notrika.gympin.persistence.entity.homePage.HomePageItemEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.sport.SportMultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import com.notrika.gympin.persistence.entity.user.UserMultimediaEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "multimedia")
public class MultimediaEntity extends BaseEntityWithCreateUpdate<MultimediaEntity> {

    @ManyToOne(cascade = CascadeType.MERGE, optional = false, fetch = FetchType.LAZY)
    @ToString.Exclude
    private UserEntity user;

    @Column(name = "fileName", nullable = false)
    private String fileName;

    @Column(name = "mediaType", nullable = false)
    private MediaType mediaType;

    @Column(name = "documentFormat")
    private String documentFormat;

    @Column(name = "uploadDir")
    private String uploadDir;

    @Column(name = "title")
    private String title;

    @Column(name = "size")
    private String size;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "multimedia")
    @ToString.Exclude
    private List<SportMultimediaEntity> sportMultimedias;

    @OneToMany(mappedBy = "multimedia")
    @ToString.Exclude
    private List<UserMultimediaEntity> userMultimedias;

    @ManyToMany(mappedBy = "multimedias")
    @ToString.Exclude
    private List<PlaceEntity> places;

    @OneToMany(mappedBy = "multimedia")
    @ToString.Exclude
    private List<HomePageItemEntity> homeMultimedia;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private MultimediaCategoryEntity category;

    @OneToOne(mappedBy = "userAvatar")
    //set forUserAvatar
    private UserEntity AvatarForUser;

    @OneToOne(mappedBy = "articleImage")
    private ArticleEntity article;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MultimediaEntity that = (MultimediaEntity) o;

        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

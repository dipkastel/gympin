package com.notrika.gympin.domain.util.helper;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.general.NotFoundException;
import com.notrika.gympin.common.exception.multimedia.*;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.domain.multimedia.MultimediaCategoryServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.Objects;

@Service
public final class MultimediaServiceHelper {


    @Value("${multimedia.dir}")
    private String dir;

    private String[] supportImageTypes = new String[]{"image/jpeg","image/webp","image/gif","image/png"};
    private String[] supportVideoTypes = new String[]{"audio/mpeg"};
    private String[] supportAudioTypes = new String[]{"video/mpeg"};

    private Integer demensionSeperator = 400;

    private Path fileStorageLocation;
    private Path imageStorageLocation;
    private Path imageStorageLocationS;
    private Path imageStorageLocationM;
    private Path imageStorageLocationL;
    private Path imageStorageLocationX;
    private Path videoStorageLocation;
    private Path audioStorageLocation;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private MultimediaCategoryServiceImpl categoryService;

    @Autowired
    private MultimediaRepository multimediaRepository;


    public MultimediaServiceHelper() {
    }

    @PostConstruct
    private void init() {
        this.fileStorageLocation = Paths.get(dir).toAbsolutePath().normalize();
        this.imageStorageLocation = Paths.get(dir + "/image").toAbsolutePath().normalize();
        this.imageStorageLocationS = Paths.get(dir + "/image" + "/s").toAbsolutePath().normalize();
        this.imageStorageLocationM = Paths.get(dir + "/image" + "/m").toAbsolutePath().normalize();
        this.imageStorageLocationL = Paths.get(dir + "/image" + "/l").toAbsolutePath().normalize();
        this.imageStorageLocationX = Paths.get(dir + "/image" + "/x").toAbsolutePath().normalize();
        this.videoStorageLocation = Paths.get(dir + "/video").toAbsolutePath().normalize();
        this.audioStorageLocation = Paths.get(dir + "/audio").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
            Files.createDirectories(this.imageStorageLocation);
            Files.createDirectories(this.imageStorageLocationS);
            Files.createDirectories(this.imageStorageLocationM);
            Files.createDirectories(this.imageStorageLocationL);
            Files.createDirectories(this.imageStorageLocationX);
            Files.createDirectories(this.videoStorageLocation);
            Files.createDirectories(this.audioStorageLocation);
        } catch (Exception e) {
            throw new CreateDirectoryException();
        }
    }

    public MultimediaEntity saveFile(MultimediaStoreParam multimediaStoreParam)  {
        switch (multimediaStoreParam.getMediaType()){
            case IMAGE: return saveImage(multimediaStoreParam);
            case VIDEO: return saveVideo(multimediaStoreParam);
            case AUDIO: return saveAudio(multimediaStoreParam);
            default: throw new MediaTypeNotFound();
        }
    }

    private MultimediaEntity saveVideo(MultimediaStoreParam multimediaStoreParam) {
        return null;
    }

    private MultimediaEntity saveAudio(MultimediaStoreParam multimediaStoreParam) {
        return null;
    }

    private MultimediaEntity saveImage(MultimediaStoreParam multimediaStoreParam) {
        //create entity
        MultimediaEntity multimedia = new MultimediaEntity();
        //multipartfile
        MultipartFile multipartFile = multimediaStoreParam.getFile();
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        if (fileName.contains("..")) {
            throw new InvalidFileNameException();
        }
        if (Arrays.stream(supportImageTypes).noneMatch(c->c.equals(multipartFile.getContentType()))) {
            throw new UnsupportedImageType();
        }
        multimedia.setFileName(fileName);
        //image dimension

        BufferedImage bufferedImage = null;
        try {
            bufferedImage = ImageIO.read(multipartFile.getInputStream());
        } catch (IOException e) {
            throw new ImageReadError();
        }
        multimedia.setSize(bufferedImage.getWidth() + "X" + bufferedImage.getHeight());
        //set values
        multimedia.setDocumentFormat(multipartFile.getContentType());
        multimedia.setUser((UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
        multimedia.setMediaType(multimediaStoreParam.getMediaType());
        multimedia.setTitle(multimediaStoreParam.getTitle());
        multimedia.setDescription(multimediaStoreParam.getDescription());
        //save and get address
        Path targetLocation = null;
        try {
            targetLocation = saveInStorage(getPathToStoreOrginal(multimediaStoreParam), multipartFile.getInputStream(), fileName);
        } catch (IOException e) {
            throw new ImageSaveError();
        }
        multimedia.setUploadDir(targetLocation.toString());
        multimedia.setCategory(categoryService.getEntityById(multimediaStoreParam.getCategoryId()));
        return multimediaRepository.add(multimedia);
    }


    public InputStream loadFileAsResource(MultimediaRetrieveParam multimediaParam) throws Exception {
        switch (FillRetrieveItemFromEntity(multimediaParam).getMediaType()) {
            case IMAGE:
                return loadImageAsResource(multimediaParam);
            case AUDIO:
                return loadAudioAsResource(multimediaParam);
            case VIDEO:
                return loadVideoAsResource(multimediaParam);
            default:
                throw new javassist.NotFoundException("MediaType not found For : " + multimediaParam.getFileName());

        }
    }

    //helper
    private InputStream loadImageAsResource(MultimediaRetrieveParam multimediaParam) {

        Resource resource = null;
        try {
            resource = new UrlResource(Paths.get(multimediaParam.getFileUrl()).toAbsolutePath().normalize().toUri());
        } catch (MalformedURLException e) {
            throw new NotFoundException();
        }
        //checks
        if (!resource.exists()) {
            throw new NotFoundException();
        }
        //orginal file
        if (multimediaParam.getWidth() == null && multimediaParam.getHeight() == null) {
            try {
                return new FileInputStream(resource.getFile());
            } catch (IOException e) {
                throw new ImageReadError();
            }
        } else {
            if (multimediaParam.getWidth() == 0 || multimediaParam.getHeight() == 0) {
                throw new FileDimensionsCannotBeZiro();
            }
            return resizeFile(multimediaParam, resource);
        }
    }

    private InputStream resizeFile(MultimediaRetrieveParam multimediaParam, Resource resource) {
        try {
            BufferedImage inputBI = ImageIO.read(resource.getFile());
            Path resourcePath = Paths.get(multimediaParam.getFileUrl()).toAbsolutePath().normalize();
            String fileName = resourcePath.getFileName().toString();
            Path sizedPath = GetPathForSizes(multimediaParam);
            Path imagePath = Paths.get(sizedPath.toString() + "/" + multimediaParam.getWidth() + "X" + multimediaParam.getHeight() + "_" + fileName).toAbsolutePath().normalize();
            UrlResource fileResource = new UrlResource(imagePath.toUri());
            if (fileResource.exists()) {
                //return image
                return new FileInputStream(fileResource.getFile());
            } else {
                //save and return image
                BufferedImage outputBI = new BufferedImage(multimediaParam.getWidth(), multimediaParam.getHeight(), inputBI.getType());
                Graphics2D g2d = outputBI.createGraphics();
                g2d.drawImage(inputBI, 0, 0, multimediaParam.getWidth(), multimediaParam.getHeight(), null);
                g2d.dispose();
                String formatName = resource.getFile().getName().substring(resource.getFile().getName().lastIndexOf(".") + 1);
                ImageIO.write(outputBI, formatName, new File(imagePath.toUri()));
                resource = new UrlResource(imagePath.toUri());
                return new FileInputStream(resource.getFile());
            }
        }catch (Exception e){
            throw new ImageSaveError();
        }
    }

    private Path GetPathForSizes(MultimediaRetrieveParam multimediaParam) throws Exception {
        int bigestDim = Math.max(multimediaParam.getWidth(), multimediaParam.getHeight());
        switch ((int) (bigestDim / demensionSeperator)) {
            case 0:
                return imageStorageLocationS;
            case 1:
                return imageStorageLocationM;
            case 2:
                return imageStorageLocationL;
            case 3:
                return imageStorageLocationX;
            default:
                throw new Exception("demention must be under : " + (demensionSeperator * 4));
        }
    }

    private InputStream loadVideoAsResource(MultimediaRetrieveParam multimediaParam) throws Exception {
        Path filePath = this.videoStorageLocation.resolve(multimediaParam.getFileName()).normalize();
        return new FileInputStream(new UrlResource(filePath.toUri()).getFile());
    }

    private InputStream loadAudioAsResource(MultimediaRetrieveParam multimediaParam) throws Exception {
        Path filePath = this.audioStorageLocation.resolve(multimediaParam.getFileName()).normalize();
        return new FileInputStream(new UrlResource(filePath.toUri()).getFile());
    }

    private MultimediaRetrieveParam FillRetrieveItemFromEntity(MultimediaRetrieveParam multimediaParam) throws FileNotFoundException {
        try {
            MultimediaEntity entity = multimediaRepository.getById(multimediaParam.getId());
            multimediaParam.setFileName(entity.getFileName());
            multimediaParam.setId(entity.getId());
            multimediaParam.setFileUrl(entity.getUploadDir());

            Integer baseW = Integer.parseInt(entity.getSize().split("X")[0]);
            Integer baseH = Integer.parseInt(entity.getSize().split("X")[1]);
            if (multimediaParam.getWidth() == null&&multimediaParam.getHeight() != null) {
                multimediaParam.setWidth((multimediaParam.getHeight() * baseW) / baseH);
            }
            if (multimediaParam.getHeight() == null&&multimediaParam.getWidth() != null) {
                multimediaParam.setHeight((multimediaParam.getWidth() * baseH) / baseW);
            }
        } catch (Exception e) {
            throw new FileNotFoundException("File not found " + multimediaParam.getFileName());
        }
        return multimediaParam;
    }

    private Path getPathToStoreOrginal(MultimediaStoreParam multimediaStoreParam) {

        switch (multimediaStoreParam.getMediaType()) {
            case IMAGE:
                return this.imageStorageLocation;
            case VIDEO:
                return this.videoStorageLocation;
            case AUDIO:
                return this.audioStorageLocation;
            default:
                return this.fileStorageLocation;
        }

    }

    public Path saveInStorage(Path path, InputStream fileStream, String fileName) throws IOException {
        Path targetLocation = path.resolve(System.currentTimeMillis() + "." + fileName.split("\\.")[fileName.split("\\.").length - 1]);
        Files.copy(fileStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return targetLocation;
    }


}

package com.notrika.gympin.domain.util.helper;

import com.luciad.imageio.webp.WebPWriteParam;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.multimedia.*;
import com.notrika.gympin.domain.multimedia.MultimediaCategoryServiceImpl;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.persistence.dao.repository.multimedia.MultimediaRepository;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.Normalizer;
import java.util.*;
import java.util.List;

@Service
public final class MultimediaServiceHelper {


    @Value("${multimedia.dir}")
    private String dir;
    private static final float WEBP_QUALITY = 0.75f;
    private String[] supportImageTypes = new String[]{"image/jpeg", "image/webp", "image/gif", "image/png"};
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

    @Autowired
    private ResourceLoader resourceLoader;


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

    public MultimediaEntity saveFile(MultimediaStoreParam multimediaStoreParam) {
        switch (multimediaStoreParam.getMediaType()) {
            case IMAGE:
                return saveImage(multimediaStoreParam);
            case VIDEO:
                return saveVideo(multimediaStoreParam);
            case AUDIO:
                return saveAudio(multimediaStoreParam);
            default:
                throw new MediaTypeNotFound();
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
        if (Arrays.stream(supportImageTypes).noneMatch(c -> c.equals(multipartFile.getContentType()))) {
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
        multimedia.setExtension(getFileNameExtension(fileName));
        multimedia.setTitle(multimediaStoreParam.getTitle());
        if(multimediaStoreParam.getSlug().isEmpty())
            multimediaStoreParam.setSlug(generateSlugOfText(multimediaStoreParam.getTitle()));
        multimedia.setSlug(multimediaStoreParam.getSlug());
        multimedia.setDescription(multimediaStoreParam.getDescription());
        multimedia.setIsDef(multimediaStoreParam.getIsDefault());
        //save and get address
        Path targetLocation = null;
        try {
            targetLocation = saveInStorage(getPathToStoreOrginal(multimediaStoreParam), multipartFile.getInputStream(), fileName, multimedia.getDocumentFormat());
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
        if (!resource.exists()) {
            throw new NotFoundException();
        }


        Integer width = multimediaParam.getWidth();
        Integer height = multimediaParam.getHeight();

        if ((width != null && width == 0) || (height != null && height == 0)) {
            throw new FileDimensionsCannotBeZiro();
        }
        if(multimediaParam.getExtension().equals("webp"))
            return convertAndCacheAsWebp(multimediaParam, resource);
        else
            return convertAndCacheAsJpg(multimediaParam, resource);
    }

    private InputStream convertAndCacheAsWebp(MultimediaRetrieveParam multimediaParam, Resource resource) {
        try {
            Path resourcePath = Paths.get(multimediaParam.getFileUrl()).toAbsolutePath().normalize();
            String baseName = getFileNameWithoutExtension(resourcePath.getFileName().toString());

            Integer width = multimediaParam.getWidth();
            Integer height = multimediaParam.getHeight();
            boolean isResize = (width != null && height != null);

            Path targetDir = isResize ? GetPathForSizes(multimediaParam) : resourcePath.getParent();
            String sizeTag = isResize ? width + "X" + height + "_" : "orig_";

            Path webpPath = Paths.get(targetDir.toString() + "/" + sizeTag + baseName + ".webp")
                    .toAbsolutePath().normalize();

            UrlResource cached = new UrlResource(webpPath.toUri());
            if (cached.exists()) {
                return new FileInputStream(cached.getFile());
            }

            BufferedImage inputBI = ImageIO.read(resource.getFile());
            BufferedImage outputBI = inputBI;

            if (isResize) {
                int type = inputBI.getType() != 0 ? inputBI.getType() : BufferedImage.TYPE_INT_ARGB;
                outputBI = new BufferedImage(width, height, type);
                Graphics2D g2d = outputBI.createGraphics();
                g2d.drawImage(inputBI, 0, 0, width, height, null);
                g2d.dispose();
            }

            Files.createDirectories(webpPath.getParent());
            writeAsWebp(outputBI, webpPath.toFile());

            return new FileInputStream(webpPath.toFile());
        } catch (Exception e) {
            throw new ImageSaveError();
        }
    }

    private InputStream convertAndCacheAsJpg(MultimediaRetrieveParam multimediaParam, Resource resource) {
        try {
            Path resourcePath = Paths.get(multimediaParam.getFileUrl()).toAbsolutePath().normalize();
            String baseName = getFileNameWithoutExtension(resourcePath.getFileName().toString());
            Integer width = multimediaParam.getWidth();
            Integer height = multimediaParam.getHeight();

            boolean isResize = (width != null && height != null);

            Path targetDir = isResize ? GetPathForSizes(multimediaParam) : resourcePath.getParent();
            String sizeTag = isResize ? width + "X" + height + "_" : "";

            Path jpgPath = Paths.get(targetDir.toString() + "/" + sizeTag + baseName + ".jpg")
                    .toAbsolutePath().normalize();


            UrlResource cached = new UrlResource(jpgPath.toUri());
            if (cached.exists()) {
                return new FileInputStream(cached.getFile());
            }

            BufferedImage inputBI = ImageIO.read(resource.getFile());
            BufferedImage outputBI = inputBI;

            if (isResize) {
                int type = inputBI.getType() != 0 ? inputBI.getType() : BufferedImage.TYPE_INT_ARGB;
                outputBI = new BufferedImage(width, height, type);
                Graphics2D g2d = outputBI.createGraphics();
                g2d.drawImage(inputBI, 0, 0, width, height, null);
                g2d.dispose();
            }

            Files.createDirectories(jpgPath.getParent());
            writeAsWebp(outputBI, jpgPath.toFile());
            return new FileInputStream(jpgPath.toFile());
        } catch (Exception e) {
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
            MultimediaEntity entity = null;
            if(multimediaParam.getSlug()!=null)
             entity = multimediaRepository.getBySlug(multimediaParam.getSlug());
            else
             entity = multimediaRepository.getById(multimediaParam.getId());
            if(entity==null)
                entity = multimediaRepository.getById(11L);

            multimediaParam.setFileName(entity.getFileName());
            multimediaParam.setId(entity.getId());
            multimediaParam.setFileUrl(entity.getUploadDir());
            multimediaParam.setExtension(entity.getExtension());

            Integer baseW = Integer.parseInt(entity.getSize().split("X")[0]);
            Integer baseH = Integer.parseInt(entity.getSize().split("X")[1]);
            if (multimediaParam.getWidth() == null && multimediaParam.getHeight() != null) {
                multimediaParam.setWidth((multimediaParam.getHeight() * baseW) / baseH);
            }
            if (multimediaParam.getHeight() == null && multimediaParam.getWidth() != null) {
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

    public Path saveInStorage(Path path, InputStream fileStream, String fileName, String fileType) throws IOException {
        String extension = fileName.split("\\.")[fileName.split("\\.").length - 1];
        if (extension.isEmpty() || extension.equals("blob")) {
            extension = fileType.split("/")[1];
        }
        Path targetLocation = path.resolve(System.currentTimeMillis() + "." + extension);
        Files.copy(fileStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return targetLocation;
    }


    public List<MultimediaDto> getAllFiles() {
        File folder = new File(dir);
        return getFiles(folder);
    }

    private List<MultimediaDto> getFiles(File folder) {
        List<MultimediaDto> result = new ArrayList<>();
        File[] files = folder.listFiles();
        if(files!=null){
            for (File file : files) {
                if (file.isDirectory()) {
                    result.addAll(getFiles(file));
                }
                if (file.isFile()) {
                    result.add(MultimediaDto.builder().url(file.getAbsolutePath()).build());
                }
            }
        }
        return result;
    }

    public static String generateSlugOfText(String text) {
        if (text == null || text.isBlank()) {
            return String.valueOf(System.currentTimeMillis());
        }

        return Normalizer.normalize(text, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^\\p{L}\\p{N}\\s-]", "")
                .replaceAll("[\\s_]+", "-")
                .replaceAll("-{2,}", "-")
                .replaceAll("^-|-$", "");
    }


    private void writeAsWebp(BufferedImage image, File outputFile) throws IOException {
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("webp");
        if (!writers.hasNext()) {
            throw new IllegalStateException("ImageWriter برای webp پیدا نشد؛ کتابخانه webp-imageio اضافه نشده.");
        }
        ImageWriter writer = writers.next();

        try (ImageOutputStream ios = ImageIO.createImageOutputStream(outputFile)) {
            writer.setOutput(ios);

            WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
            writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]);
            writeParam.setCompressionQuality(WEBP_QUALITY);

            writer.write(null, new IIOImage(image, null, null), writeParam);
        } finally {
            writer.dispose();
        }
    }

    private String getFileNameWithoutExtension(String fileName) {
        int idx = fileName.lastIndexOf(".");
        return idx == -1 ? fileName : fileName.substring(0, idx);
    }
    private String getFileNameExtension(String fileName) {
        int idx = fileName.lastIndexOf(".");
        return idx == -1 ? "jpg" : fileName.substring(idx+1);
    }
}

package com.notrika.gympin.domain.multimedia;

import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.Error;
import com.notrika.gympin.common.exception.multimedia.CreateDirectoryException;
import com.notrika.gympin.common.exception.multimedia.InvalidFileNameException;
import com.notrika.gympin.common.exception.multimedia.MultimediaNotFoundException;
import com.notrika.gympin.common.multimedia.dto.MultimediaDto;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaCategoryParam;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import com.notrika.gympin.domain.user.UserServiceImpl;
import com.notrika.gympin.domain.util.convertor.MultimediaConvertor;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.dao.repository.SportMultimediaRepository;
import com.notrika.gympin.persistence.entity.multimedia.Multimedia;
import com.notrika.gympin.persistence.entity.multimedia.MultimediaCategory;
import com.notrika.gympin.persistence.entity.multimedia.SportMultimedia;
import com.notrika.gympin.persistence.entity.sport.Sport;
import com.notrika.gympin.persistence.entity.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MultimediaServiceImpl implements MultimediaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MultimediaServiceImpl.class);

    private Path fileStorageLocation;
    private Path imageStorageLocation;
    private Path videoStorageLocation;
    private Path audioStorageLocation;
    private Map<String, Path> imageSizedLocation;

    @Value("${multimedia.dir}")
    private String dir;

    @Autowired
    private MultimediaRepository multimediaRepository;

    @Autowired
    private SportMultimediaRepository sportMultimediaRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private MultimediaCategoryServiceImpl categoryService;

    public MultimediaServiceImpl() {
        imageSizedLocation = new HashMap<>();
    }

    @PostConstruct
    private void init() {
        this.fileStorageLocation = Paths.get(dir).toAbsolutePath().normalize();
        this.imageStorageLocation = Paths.get(dir + "/image").toAbsolutePath().normalize();
        this.videoStorageLocation = Paths.get(dir + "/video").toAbsolutePath().normalize();
        this.audioStorageLocation = Paths.get(dir + "/audio").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
            Files.createDirectories(this.imageStorageLocation);
            Files.createDirectories(this.videoStorageLocation);
            Files.createDirectories(this.audioStorageLocation);
            File[] listDirectory = new File(this.imageStorageLocation.toUri()).listFiles(File::isDirectory);
            for (File dir : listDirectory) {
                String[] splitPath = dir.getPath().split("\\\\");
                this.imageSizedLocation.put(splitPath[splitPath.length - 1], dir.toPath());
            }
        } catch (Exception e) {
            throw new CreateDirectoryException(e, HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.EXCEPTION);
        }
    }

    @Override
    public Long storeFile(MultimediaStoreParam multimediaStoreParam) throws IOException {
        Path targetPath = null;
        switch (multimediaStoreParam.getMediaType()) {
            case IMAGE:
                return saveFile(multimediaStoreParam, this.imageStorageLocation);
            case VIDEO:
                return saveFile(multimediaStoreParam, this.videoStorageLocation);
            case AUDIO:
                return saveFile(multimediaStoreParam, this.audioStorageLocation);
        }

        return 0L;
    }

    @Override
    public Long addImage(MultimediaStoreParam multimediaStoreParam) throws IOException {
        multimediaStoreParam.setMediaType(MediaType.IMAGE);
        return storeFile(multimediaStoreParam);
    }

    @Override
    public Long addVideo(MultimediaStoreParam multimediaStoreParam) throws IOException {
        multimediaStoreParam.setMediaType(MediaType.VIDEO);
        return storeFile(multimediaStoreParam);
    }

    @Override
    public Long addAudio(MultimediaStoreParam multimediaStoreParam) throws IOException {
        multimediaStoreParam.setMediaType(MediaType.AUDIO);
        return storeFile(multimediaStoreParam);
    }

    private Long saveFile(MultimediaStoreParam multimediaStoreParam, Path path) throws IOException {
        //        User user = userService.getUserById(multimediaStoreParam.getUserParam().getId());
        MultipartFile multipartFile = multimediaStoreParam.getMultipartFile();//multimediaStoreParam.getMultipartFile().get(i);
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        if (fileName.contains("..")) {
            throw new InvalidFileNameException("Error in file name.", HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);
        }
        Path targetLocation = saveFile(path, multipartFile.getInputStream(), fileName);
        List<MultimediaCategory> categories = new ArrayList<>();
        if (multimediaStoreParam.getCategoryParam() != null && multimediaStoreParam.getCategoryParam().size() > 0) {
            for (MultimediaCategoryParam categoryParam : multimediaStoreParam.getCategoryParam()) {
                categories.add(categoryService.getEntityById(categoryParam.getId()));
            }
        }
        //        MultimediaCategory multimediaCategoryById = categoryService.getMultimediaCategoryById(multimediaStoreParam.getCategoryParam().getId());
        Multimedia multimediaEntity = multimediaRepository.findByFileName(fileName);
        if (multimediaEntity != null) {
            multimediaEntity.setDocumentFormat(multipartFile.getContentType());
            multimediaEntity.setMediaType(multimediaStoreParam.getMediaType());
            multimediaEntity.setTitle(multimediaStoreParam.getTitle());
            multimediaEntity.setDescription(multimediaStoreParam.getDescription());
            multimediaEntity.setCategories(categories);
            multimediaEntity = multimediaRepository.update(multimediaEntity);
        } else {
            Multimedia multimedia=new Multimedia();
            multimedia.setUser((User) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
            multimedia.setFileName(fileName);
            multimedia.setMediaType(multimediaStoreParam.getMediaType());
            multimedia.setDocumentFormat(multipartFile.getContentType());
            multimedia.setUploadDir(targetLocation.toString());
            multimedia.setTitle(multimediaStoreParam.getTitle());
            multimedia.setDescription(multimediaStoreParam.getDescription());
            multimedia.setCategories(categories);
            multimediaEntity = multimediaRepository.add(multimedia);
        }
        return multimediaEntity.getId();
    }

    private Path saveFile(Path path, InputStream fileStream, String fileName) throws IOException {
        Path targetLocation = path.resolve(fileName);
        Files.copy(fileStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return targetLocation;
    }

    @Override
    public InputStream loadFileAsResource(MultimediaRetrieveParam multimediaParam) throws Exception {
        Multimedia multiMediaFile = null;
        if (multimediaParam.getId() != null && multimediaParam.getId() > 0) multiMediaFile = multimediaRepository.getById(multimediaParam.getId());
        else if (multimediaParam.getFileName() != null) multiMediaFile = multimediaRepository.findByFileName(multimediaParam.getFileName());
        if (multiMediaFile == null) throw new FileNotFoundException("File not found " + multimediaParam.getFileName());
        multimediaParam.setFileName(multiMediaFile.getFileName());
        multimediaParam.setId(multiMediaFile.getId());
        if (multiMediaFile.getMediaType().equals(MediaType.IMAGE)) {
            return loadImageFile(multimediaParam);
        }
        Resource resource = null;
        if (multiMediaFile.getMediaType().equals(MediaType.AUDIO)) {
            Path filePath = this.audioStorageLocation.resolve(multimediaParam.getFileName()).normalize();
            resource = new UrlResource(filePath.toUri());
        }
        if (multiMediaFile.getMediaType().equals(MediaType.VIDEO)) {
            Path filePath = this.videoStorageLocation.resolve(multimediaParam.getFileName()).normalize();
            resource = new UrlResource(filePath.toUri());
        }

        //        this.fileStorageLocation.

        if (resource != null && resource.exists()) {
            return new FileInputStream(resource.getFile());
        } else {
            throw new FileNotFoundException("File not found " + multimediaParam.getFileName());
        }
    }

    private InputStream loadImageFile(MultimediaRetrieveParam multimediaParam) throws IOException {
        Path filePath = this.imageStorageLocation.resolve(multimediaParam.getFileName()).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists()) {
            throw new FileNotFoundException("File not found " + multimediaParam.getFileName());
        }
        if (multimediaParam.getWidth() == null || multimediaParam.getHeight() == null || multimediaParam.getWidth() == 0 || multimediaParam.getHeight() == 0) {
            return new FileInputStream(resource.getFile());
        }
        String subPathSized = multimediaParam.getWidth().toString() + "-" + multimediaParam.getHeight().toString();
        Path subPath = this.imageSizedLocation.get(subPathSized);
        if (subPath == null) {
            Path path = Paths.get(this.imageStorageLocation + "/" + subPathSized).toAbsolutePath().normalize();
            Files.createDirectories(path);
            this.imageSizedLocation.put(subPathSized, path);
            BufferedImage inputBI = ImageIO.read(resource.getFile());
            BufferedImage outputBI = new BufferedImage(multimediaParam.getWidth(), multimediaParam.getHeight(), inputBI.getType());
            Graphics2D g2d = outputBI.createGraphics();
            g2d.drawImage(inputBI, 0, 0, multimediaParam.getWidth(), multimediaParam.getHeight(), null);
            g2d.dispose();
            String formatName = resource.getFile().getName().substring(resource.getFile().getName().lastIndexOf(".") + 1);
            ImageIO.write(outputBI, formatName, new File(path.toString() + "/" + resource.getFile().getName()));
        }
        Path path = this.imageSizedLocation.get(subPathSized);
        Path normalize = path.resolve(multimediaParam.getFileName()).normalize();
        UrlResource sizedResource = new UrlResource(normalize.toUri());
        if (!sizedResource.exists()) {
            BufferedImage inputBI = ImageIO.read(resource.getFile());
            BufferedImage outputBI = new BufferedImage(multimediaParam.getWidth(), multimediaParam.getHeight(), inputBI.getType());
            Graphics2D g2d = outputBI.createGraphics();
            g2d.drawImage(inputBI, 0, 0, multimediaParam.getWidth(), multimediaParam.getHeight(), null);
            g2d.dispose();
            String formatName = resource.getFile().getName().substring(resource.getFile().getName().lastIndexOf(".") + 1);
            ImageIO.write(outputBI, formatName, new File(path.toString() + "/" + resource.getFile().getName()));
        }
        resource = new UrlResource(normalize.toUri());
        return new FileInputStream(resource.getFile());
    }

    public Multimedia getMultimediaById(Long id) {
        return multimediaRepository.getById(id);
    }

    public Long getMultimediaIdByFileName(String fileName) {
        return multimediaRepository.findByFileName(fileName).getId();
    }

    @Override
    public InputStream getById(MultimediaRetrieveParam param) throws Exception {
        //        MultimediaRetrieveParam multimediaRetrieveParam = MultimediaRetrieveParam.builder().id(id).build();
        return loadFileAsResource(param);

    }

    @Override
    public InputStream getByName(MultimediaRetrieveParam param) throws Exception {
        //MultimediaRetrieveParam multimediaRetrieveParam = MultimediaRetrieveParam.builder().fileName(name).build();
        return loadFileAsResource(param);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public SportMultimedia addMultimediaForSport(Sport sport, Multimedia multimedia) {
        SportMultimedia sportMultimedia = SportMultimedia.builder().sport(sport).multimedia(multimedia).build();
        return sportMultimediaRepository.add(sportMultimedia);
    }

    public List<SportMultimedia> getSportMultimedias(Sport sport) {
        return sportMultimediaRepository.findBySport(sport);
    }

    @Override
    public List<InputStream> getAllByType(MultimediaRetrieveParam multimediaRetrieveParam) throws IOException {
        PageRequest pageRequest = PageRequest.of(multimediaRetrieveParam.getPage(), multimediaRetrieveParam.getSize());
        List<Multimedia> all = this.multimediaRepository.findAllByMediaType(multimediaRetrieveParam.getMediaType(), pageRequest);
        List<InputStream> inputStreams = new ArrayList<>();
        for (Multimedia multimedia : all) {
            if (multimedia.getMediaType().equals(MediaType.IMAGE)) {
                inputStreams.add(loadImageFile(MultimediaRetrieveParam.builder().fileName(multimedia.getFileName()).height(multimediaRetrieveParam.getHeight()).width(multimediaRetrieveParam.getWidth()).build()));
            }
            if (multimedia.getMediaType().equals(MediaType.AUDIO)) {
                Path filePath = this.audioStorageLocation.resolve(multimedia.getFileName()).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                inputStreams.add(new FileInputStream(resource.getFile()));
            }
            if (multimedia.getMediaType().equals(MediaType.VIDEO)) {
                Path filePath = this.videoStorageLocation.resolve(multimedia.getFileName()).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                inputStreams.add(new FileInputStream(resource.getFile()));
            }
        }
        return inputStreams;
    }

    @Override
    public List<Long> getAllId() {
        return multimediaRepository.findAll().stream().map(m -> m.getId()).collect(Collectors.toList());
    }

    @Override
    public List<String> getAllName() {
        return multimediaRepository.findAll().stream().map(m -> m.getFileName()).collect(Collectors.toList());
    }

    @Override
    public List<MultimediaDto> getAll() {
        return multimediaRepository.findAll().stream().map(m -> MultimediaConvertor.multimediaToMultimediaDto(m)).collect(Collectors.toList());
    }

    @Override
    public Long update(MultimediaStoreParam multimediaStoreParam) {
        if (multimediaStoreParam.getId() == null || multimediaStoreParam.getId() < 1) throw new MultimediaNotFoundException();
        Multimedia multimedia = multimediaRepository.getById(multimediaStoreParam.getId());
        if (multimedia == null) throw new MultimediaNotFoundException();
        if (multimediaStoreParam.getCategoryParam() != null && multimediaStoreParam.getCategoryParam().size() > 0) {
            List<MultimediaCategory> multimediaCategories = new ArrayList<>();
            for (MultimediaCategoryParam categoryParam : multimediaStoreParam.getCategoryParam()) {
                multimediaCategories.add(categoryService.getEntityById(categoryParam.getId()));
            }
        }
        multimedia.setTitle(multimediaStoreParam.getTitle());
        multimedia.setDescription(multimediaStoreParam.getDescription());
        Multimedia update = multimediaRepository.update(multimedia);
        return update.getId();
    }

    @Override
    public boolean delete(Long id) {
        Multimedia multimedia = multimediaRepository.getById(id);
        multimediaRepository.deleteById2(multimedia);
        return true;
    }
}

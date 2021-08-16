package com.notrika.gympin.domain.multimedia;

import com.notrika.gympin.common.Error;
import com.notrika.gympin.common.exception.multimedia.CreateDirectoryException;
import com.notrika.gympin.common.exception.multimedia.InvalidFileNameException;
import com.notrika.gympin.common.multimedia.param.MultimediaStoreParam;
import com.notrika.gympin.common.multimedia.service.MultimediaService;
import com.notrika.gympin.dao.multimedia.Multimedia;
import com.notrika.gympin.dao.user.User;
import com.notrika.gympin.persistence.repository.MultimediaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class MultimediaServiceImpl implements MultimediaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MultimediaServiceImpl.class);

    private final Path fileStorageLocation;

    //@Value("${multimedia.dir}")
    private String dir = "multimedia/image";

    @Autowired
    private MultimediaRepository multimediaRepository;

    public MultimediaServiceImpl() {
        this.fileStorageLocation = Paths.get(dir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            throw new CreateDirectoryException(e, HttpStatus.INTERNAL_SERVER_ERROR, Error.ErrorType.EXCEPTION);
        }
    }

    @Override
    public boolean storeFile(MultimediaStoreParam multimediaStoreParam) throws IOException {
        for (int i = 0; i < multimediaStoreParam.getMultipartFile().size(); i++) {
            MultipartFile multipartFile = multimediaStoreParam.getMultipartFile().get(i);
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            if (fileName.contains(".."))
                throw new InvalidFileNameException("Error in file name.", HttpStatus.BAD_REQUEST, Error.ErrorType.EXCEPTION);

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(multipartFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            Multimedia fileByUserByName = multimediaRepository.findByUserAndFileName(User.builder().id(multimediaStoreParam.getUser().getId()).build(), fileName);
            if (fileByUserByName != null) {
                fileByUserByName.setDocumentFormat(multipartFile.getContentType());
                fileByUserByName.setMediaType(multimediaStoreParam.getMediaType());
                multimediaRepository.save(fileByUserByName);
            } else {
                multimediaRepository.save(Multimedia.builder().fileName(fileName).mediaType(multimediaStoreParam.getMediaType()).documentFormat(multipartFile.getContentType()).uploadDir(targetLocation.toString()).build());
            }
        }
        return true;
    }

    @Override
    public Resource loadFileAsResource(String fileName) throws Exception {
        Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return resource;
        } else {
            throw new FileNotFoundException("File not found " + fileName);
        }
    }
}

CREATE TABLE `crumb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `altitude` DOUBLE NULL,
    `horizontalAccuracy` DOUBLE NULL,
    `verticalAccuracy` DOUBLE NULL,
    `utcTime` DATETIME(3) NULL,
    `speedOverGround` DOUBLE NULL,
    `courseOverGround` DOUBLE NULL,
    `signalStrength` DOUBLE NULL,
    `satellitesInView` INT NULL,
    `satellitesUsed` INT NULL,
    `hdop` DOUBLE NULL,
    `vdop` DOUBLE NULL,
    `pdop` DOUBLE NULL,
    `pseudorange` TEXT NULL,
    `carrierPhase` TEXT NULL,
    `dopplerShift` TEXT NULL,
    `ephemerisData` TEXT NULL,
    `almanacData` TEXT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
);

CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apiKey` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
);
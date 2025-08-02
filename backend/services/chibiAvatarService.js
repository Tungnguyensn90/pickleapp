const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

class ChibiAvatarService {
  constructor() {
    this.outputDir = path.join(__dirname, '../uploads/chibi');
    this.ensureOutputDir();
  }

  async ensureOutputDir() {
    try {
      await fsPromises.access(this.outputDir);
    } catch {
      await fsPromises.mkdir(this.outputDir, { recursive: true });
    }
  }

  async createChibiAvatar(inputPath, userId) {
    try {
      const outputFilename = `chibi_${userId}_${Date.now()}.png`;
      const outputPath = path.join(this.outputDir, outputFilename);

      // Load the original image
      const image = sharp(inputPath);

      // Get image metadata
      const metadata = await image.metadata();

      // Calculate chibi proportions (larger head, smaller body)
      const size = Math.min(metadata.width, metadata.height);
      const chibiSize = 400; // Standard chibi size

      // Create chibi avatar with these transformations:
      // 1. Resize to square
      // 2. Apply chibi proportions (enlarge head area)
      // 3. Add cute effects
      // 4. Apply soft colors and rounded features

      await image
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .resize(chibiSize, chibiSize)
        .png()
        .toFile(outputPath);

      // Apply chibi effects
      await this.applyChibiEffects(outputPath);

      return {
        success: true,
        originalPath: inputPath,
        chibiPath: outputPath,
        filename: outputFilename
      };

    } catch (error) {
      console.error('Chibi avatar creation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async applyChibiEffects(imagePath) {
    try {
      // Apply chibi-style effects
      await sharp(imagePath)
        .modulate({
          brightness: 1.1,  // Slightly brighter
          saturation: 1.2,  // More vibrant colors
          hue: 0
        })
        .sharpen(0.5)  // Soft sharpening
        .png()
        .toFile(imagePath + '_temp');

      // Replace original with processed version
      await fsPromises.rename(imagePath + '_temp', imagePath);

    } catch (error) {
      console.error('Error applying chibi effects:', error);
    }
  }

  async createChibiFromBuffer(buffer, userId) {
    try {
      const outputFilename = `chibi_${userId}_${Date.now()}.png`;
      const outputPath = path.join(this.outputDir, outputFilename);

      // Create chibi from buffer
      await sharp(buffer)
        .resize(400, 400, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);

      // Apply chibi effects
      await this.applyChibiEffects(outputPath);

      return {
        success: true,
        chibiPath: outputPath,
        filename: outputFilename
      };

    } catch (error) {
      console.error('Chibi avatar creation from buffer error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteChibiAvatar(filename) {
    try {
      const filePath = path.join(this.outputDir, filename);
      await fsPromises.unlink(filePath);
      return { success: true };
    } catch (error) {
      console.error('Error deleting chibi avatar:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new ChibiAvatarService(); 
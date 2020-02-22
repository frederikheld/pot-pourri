Workflow to generate bitmap that can be displayed on the display:

# Create bitmap in sourcecode

```const unsigned char bitmap [] = {
    0x00, 0x00 // For each pixel, so 128x64 times!
}

// 0x00 = pixel on
// 0x80 = pixel off
```

If you don't want to do it by hand:

# Convert monochrome bmp into sourcecode

If you don't have a monochrome bmp:

# Convert image into monochrome bmp

You can use The Gimp to convert various image types into monochrome bmp:

1. Open image in The Gimp
1. Go to "Image > Scale image...". Click the little icon on the right between width and height to make sure they change proportional. Select a size that fits into 128 by 64 pixels. Click "Scale".
1. Go to "Colors > Brightness-Contrast...". Set Contrast to 100 %. Now move brightness until the image fits your needs.
1. Go to "Image > Mode > Indexed..." and select "Use black and white (1-bit) pallette". check "Remove unused colors from colormap". Click "Convert".
1. Make sure it has no transparency: Easiest way is to add a background layer that is filled white.
1. Go to "Image > Flatten Image" to reduce all layers to one.
1. Go to "Layer > Transparency > Remove Alpha Channel" to remove transparency information from this layer.
1. Export image as bmp

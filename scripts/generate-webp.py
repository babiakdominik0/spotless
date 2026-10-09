#!/usr/bin/env python3
"""Generate .webp next to each .jpg in ../images (quality 82). Requires: pip install Pillow"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "images"
QUALITY = 82


def main() -> None:
    for jpg in sorted(ROOT.glob("*.jpg")):
        webp = jpg.with_suffix(".webp")
        with Image.open(jpg) as im:
            if im.mode in ("RGBA", "P"):
                im = im.convert("RGB")
            im.save(webp, "WEBP", quality=QUALITY, method=6)
        print(f"{jpg.name} -> {webp.name}")


if __name__ == "__main__":
    main()

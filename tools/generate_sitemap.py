#!/usr/bin/env python3
"""Generate a standards-based sitemap.xml after the final public origin is known."""
from __future__ import annotations

import argparse
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

PAGES = ["/", "/about.html", "/services.html", "/gallery.html", "/enquiry.html"]
NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base_url", help="Actual public origin, e.g. https://your-site.netlify.app")
    parser.add_argument("--output", default="sitemap.xml", help="Output file (default: sitemap.xml)")
    args = parser.parse_args()

    base = args.base_url.strip().rstrip("/")
    parsed = urlparse(base)
    if parsed.scheme != "https" or not parsed.netloc or parsed.path not in ("", "/") or parsed.query or parsed.fragment:
        parser.error("base_url must be the actual HTTPS origin only, e.g. https://example.net")

    ET.register_namespace("", NAMESPACE)
    urlset = ET.Element(f"{{{NAMESPACE}}}urlset")
    for path in PAGES:
        entry = ET.SubElement(urlset, f"{{{NAMESPACE}}}url")
        ET.SubElement(entry, f"{{{NAMESPACE}}}loc").text = base + path

    xml = ET.tostring(urlset, encoding="utf-8", xml_declaration=True)
    output = Path(args.output)
    output.write_bytes(xml + b"\n")
    print(f"Wrote {len(PAGES)} page URLs to {output.resolve()}")


if __name__ == "__main__":
    main()

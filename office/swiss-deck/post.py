"""Finish a pptxgenjs file into the Swiss deck master. Spec: docs/swiss-deck-design-system.md.

usage: python3 post.py RAW.pptx OUT.(pptx|potx)      (reads RAW.json beside RAW.pptx)

pptxgenjs cannot write any of the following, so this does it on the zipped XML:
  - the theme's twelve colour slots, copied from office/theme-colors/kwp-design.xml
  - the band (deck name, session, live slide number, rule) on the real Slide Master
  - the 12-column grid as locked Slide Master guides
  - Cover as the title layout, Blank last, so a new deck opens on Cover
  - video variant: no slide-number field, bottom guide at the safe line
  - placeholder names, zero text inset, anchors, uppercase labels
  - a tint on picture placeholders; diagram slots as content placeholders
  - a colour-map override on dark layouts and their slides (tx1 -> lt1)
  - content types: exactly one slide master; the template content type for .potx
Standard library only.
"""
import json, os, re, sys, zipfile

RAW, OUT = sys.argv[1:3]
meta = json.load(open(os.path.splitext(RAW)[0] + ".json"))
layouts = meta["layouts"]
HERE = os.path.dirname(os.path.abspath(__file__))
zin = zipfile.ZipFile(RAW)
files = {n: zin.read(n) for n in zin.namelist()}

PX = 6350  # EMU per 1080p pixel (144 px per inch)
MONO = "IBM Plex Mono"
DARK_MAP = ('<p:clrMapOvr><a:overrideClrMapping bg1="dk2" tx1="lt1" bg2="dk1" tx2="lt2" '
            'accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" '
            'accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/></p:clrMapOvr>')
MASTER_MAP = '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>'


def xml_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def fill(color):
    if re.fullmatch(r"[0-9A-Fa-f]{6}", color):
        return f'<a:solidFill><a:srgbClr val="{color.upper()}"/></a:solidFill>'
    return f'<a:solidFill><a:schemeClr val="{color}"/></a:solidFill>'


def textbox(sid, name, x, y, w, h, run, algn="l"):
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{sid}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr userDrawn="1"/></p:nvSpPr>'
            f'<p:spPr><a:xfrm><a:off x="{x*PX}" y="{y*PX}"/><a:ext cx="{w*PX}" cy="{h*PX}"/></a:xfrm>'
            f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
            f'<p:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0" anchor="b"><a:noAutofit/></a:bodyPr><a:lstStyle/>'
            f'<a:p><a:pPr algn="{algn}"/>{run}</a:p></p:txBody></p:sp>')


def rpr(color, mono=False, bold=False):
    face = MONO if mono else "+mn-lt"
    extra = ' cap="all" spc="50"' if mono else ' spc="-13"'
    b = ' b="1"' if bold else ' b="0"'
    return f'<a:rPr lang="en-US" sz="1200"{b}{extra} dirty="0">{fill(color)}<a:latin typeface="{face}"/></a:rPr>'


def number_box(sid, color):
    run = (f'<a:fld id="{{6B1F3A3C-5D2E-4C1A-9E7B-1A2B3C4D5E6F}}" type="slidenum">{rpr(color, mono=True)}'
           f'<a:t>‹#›</a:t></a:fld>')
    return textbox(sid, "Band: slide number", 1264, 72, 560, 34, run, algn="r")


def strip_sldnum(xml):
    return re.sub(r'<p:sp>(?:(?!<p:sp>).)*?type="sldNum".*?</p:sp>', "", xml, flags=re.S)


# ---------- theme colours: the system's one Office mapping ----------
scheme = open(os.path.join(HERE, "..", "theme-colors", "kwp-design.xml"), encoding="utf-8").read()
scheme = re.sub(r"<!--.*?-->", "", scheme, flags=re.S)
scheme = re.search(r"<a:clrScheme\b.*?</a:clrScheme>", scheme, flags=re.S).group(0)
scheme = re.sub(r'\s+xmlns:a="[^"]*"', "", scheme, count=1)  # the theme part already declares a:
scheme = re.sub(r">\s+<", "><", scheme)
theme = files["ppt/theme/theme1.xml"].decode()
theme, n = re.subn(r"<a:clrScheme\b.*?</a:clrScheme>", lambda _: scheme, theme, count=1, flags=re.S)
assert n == 1, "no clrScheme in theme1.xml"
theme = re.sub(r'(<a:theme\b[^>]*\bname=")[^"]*(")', r"\1Swiss deck\2", theme, count=1)
files["ppt/theme/theme1.xml"] = theme.encode()

# ---------- master: band, body style, guides ----------
m = strip_sldnum(files["ppt/slideMasters/slideMaster1.xml"].decode())
band = (
    textbox(9001, "Band: deck name", 96, 72, 560, 34, f'<a:r>{rpr("tx1", bold=True)}<a:t>{xml_escape(meta["deck"])}</a:t></a:r>')
    + textbox(9002, "Band: session", 656, 72, 608, 34, f'<a:r>{rpr("tx1", mono=True)}<a:t>{xml_escape(meta["session"])}</a:t></a:r>')
    + ("" if meta.get("video") else number_box(9003, "tx1"))  # video: no slide numbers
    + (f'<p:cxnSp><p:nvCxnSpPr><p:cNvPr id="9004" name="Band: rule"/><p:cNvCxnSpPr/><p:nvPr userDrawn="1"/></p:nvCxnSpPr>'
       f'<p:spPr><a:xfrm><a:off x="{96*PX}" y="{121*PX}"/><a:ext cx="{1728*PX}" cy="0"/></a:xfrm>'
       f'<a:prstGeom prst="line"><a:avLst/></a:prstGeom><a:ln w="12700">{fill("tx1")}</a:ln></p:spPr></p:cxnSp>')
)
m = m.replace("</p:spTree>", band + "</p:spTree>", 1)


def fix_lvl1(match):  # body text: no bullets or hanging indent at level 1 — Swiss lists number in the text
    s = match.group(0)
    s = re.sub(r'marL="\d+" indent="-?\d+"', 'marL="0" indent="0"', s, count=1)
    s = re.sub(r"<a:spcBef>.*?</a:spcBef>", '<a:spcBef><a:spcPts val="0"/></a:spcBef>', s, count=1, flags=re.S)
    return re.sub(r"<a:buFont[^>]*/>\s*<a:buChar[^>]*/>", "<a:buNone/>", s, count=1)


m = re.sub(r"(?<=<p:bodyStyle>).*?</a:lvl1pPr>", fix_lvl1, m, count=1, flags=re.S)
guides, gid = [], 1  # guide pos is in 1/8 pt = 4 per 1080p pixel
for c in range(12):
    for x in (96 + c * 146, 96 + c * 146 + 122):
        guides.append(f'<p15:guide id="{gid}" pos="{x*4}" userDrawn="1"><p15:clr><a:srgbClr val="F26B43"/></p15:clr></p15:guide>')
        gid += 1
for y in (72, 121, 171, meta.get("bottom", 984)):
    guides.append(f'<p15:guide id="{gid}" orient="horz" pos="{y*4}" userDrawn="1"><p15:clr><a:srgbClr val="F26B43"/></p15:clr></p15:guide>')
    gid += 1
m = m.replace("</p:sldMaster>",
              '<p:extLst><p:ext uri="{27BBF7A9-308A-43DC-89C8-2F4F27A1C1F1}">'
              '<p15:sldGuideLst xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main">'
              + "".join(guides) + "</p15:sldGuideLst></p:ext></p:extLst></p:sldMaster>")
rels = files["ppt/slideMasters/_rels/slideMaster1.xml.rels"].decode()
blank_rid = re.search(r'Id="(rId\d+)"[^>]*Target="../slideLayouts/slideLayout1.xml"', rels).group(1)
blank_entry = re.search(rf'<p:sldLayoutId [^>]*r:id="{blank_rid}"/>', m).group(0)
m = m.replace(blank_entry, "", 1).replace("</p:sldLayoutIdLst>", blank_entry + "</p:sldLayoutIdLst>", 1)
files["ppt/slideMasters/slideMaster1.xml"] = m.encode()

# ---------- layouts ----------
dark_layout_files = set()
for i, lay in enumerate(layouts):
    path = f"ppt/slideLayouts/slideLayout{i + 2}.xml"  # slideLayout1 is pptxgenjs's own blank
    x = strip_sldnum(files[path].decode())
    assert f'name="{lay["title"]}"' in x, (path, lay["title"])
    phs = iter(lay["phs"])

    def fix_sp(match):
        sp = match.group(0)
        if not re.search(r'<p:ph\s[^>]*idx="1\d\d"', sp, flags=re.S):
            return sp
        info = next(phs)
        sp = re.sub(r'(<p:cNvPr id="\d+" name=")[^"]*(")', lambda g: g.group(1) + info["name"] + g.group(2), sp, count=1)
        sp = re.sub(r"<a:bodyPr[^>]*?(/?)>",
                    lambda g: f'<a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="{info["anchor"]}"{g.group(1)}>',
                    sp, count=1)
        if info["mono"]:
            sp = sp.replace("<a:defRPr ", '<a:defRPr cap="all" ').replace("<a:rPr ", '<a:rPr cap="all" ')
        if info["type"] == "pic":
            if info["diagram"]:
                sp = re.sub(r'\s*type="pic"', "", sp, count=1)  # content placeholder: picture, chart, SmartArt, table
            elif lay["img"]:
                sp = sp.replace("<a:noFill/>", fill(lay["img"]), 1)
        return sp

    x = re.sub(r"<p:sp>.*?</p:sp>", fix_sp, x, flags=re.S)
    assert next(phs, None) is None, lay["title"]
    if lay["register"] == "dark":
        x = x.replace(MASTER_MAP, DARK_MAP)
        dark_layout_files.add(f"slideLayout{i + 2}.xml")
    if lay["hideMasterBand"]:
        x = x.replace("<p:sldLayout ", '<p:sldLayout showMasterSp="0" ', 1)
    if lay.get("isTitle"):  # the layout PowerPoint gives a new deck's first slide
        x = x.replace("<p:sldLayout ", '<p:sldLayout type="title" ', 1)
    if lay["bandColor"] and not meta.get("video"):
        x = x.replace("</p:spTree>", number_box(9003, lay["bandColor"]) + "</p:spTree>", 1)
    files[path] = x.encode()
files["ppt/slideLayouts/slideLayout1.xml"] = files["ppt/slideLayouts/slideLayout1.xml"].replace(b'name="DEFAULT"', b'name="Blank"')

# ---------- slides ----------
for name in list(files):
    mm = re.fullmatch(r"ppt/slides/(slide\d+)\.xml", name)
    if not mm:
        continue
    rels = files[f"ppt/slides/_rels/{mm.group(1)}.xml.rels"].decode()
    used = re.search(r"slideLayouts/(slideLayout\d+\.xml)", rels).group(1)
    s = strip_sldnum(files[name].decode())
    if used in dark_layout_files:
        s = s.replace(MASTER_MAP, DARK_MAP)
    files[name] = s.encode()

# ---------- content types ----------
ct = files["[Content_Types].xml"].decode()
ct = re.sub(r'<Override PartName="/ppt/slideMasters/slideMaster\d+\.xml"[^>]*/>', "", ct)  # pptxgenjs writes one per slide
ct = ct.replace("</Types>", '<Override PartName="/ppt/slideMasters/slideMaster1.xml" '
                'ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/></Types>')
if OUT.endswith(".potx"):
    ct = ct.replace("presentationml.presentation.main+xml", "presentationml.template.main+xml")
files["[Content_Types].xml"] = ct.encode()

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for n in zin.namelist():
        if not n.endswith("/"):  # folder entries break opening through OneDrive/SharePoint
            z.writestr(n, files[n])
print("wrote", OUT)

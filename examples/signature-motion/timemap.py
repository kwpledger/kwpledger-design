"""Build timemap.png: for every pixel of ink in the short mark, when the pen first reached it.

The page never shows this image. It only decides the order in which the real glyph file
is uncovered, so no stroke can appear before the pen gets there. Nothing here redraws the
mark (logos/PROVENANCE.md): the centerline is derived from the file, never displayed.

Input:  glyph.png, logos/logo_short.svg rendered at 496x598 on white, in Chromium.
Output: timemap.png, 496x598 RGB. B=255 marks ink (dilated 6px to cover the inverted
        file's outline); R<<8|G is first-arrival time, 0..65000 along the pen path.

Needs numpy, scipy, scikit-image, pillow. Deliberately not in tools/: this is one example's
build step, not repo tooling.
"""
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from scipy.spatial import cKDTree
from skimage.morphology import skeletonize

# Pen order, from Kevin's nine marked-up frames (stroke-order/, 2026-09-27).
# Coordinates are skeleton nodes in the 496x598 space; each hop follows the centerline.
TOP, J1, STEM = (84, 116), (166, 345), (170, 256)      # first downstroke; short stem and its fork
JW, PEAK = (254, 331), (254, 307)                       # the second peak and its fork
J2, J3, BOWL_END = (320, 416), (332, 448), (355, 384)  # stem/loop junctions; end of the bowl
ROUTE = [TOP, J1, STEM, J1, JW, PEAK, JW, J2, J3, "LOOP", J3, J2, BOWL_END]

ink = np.array(Image.open("glyph.png").convert("L")) < 128
sk = skeletonize(ink)
H, W = sk.shape
OFF = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
nb = lambda p: [(p[0] + a, p[1] + b) for a, b in OFF
                if 0 <= p[0] + a < H and 0 <= p[1] + b < W and sk[p[0] + a, p[1] + b]]
pix = set(zip(*np.nonzero(sk)))
nodes = {p for p in pix if len(nb(p)) != 2}

edges, seen = [], set()
for n in nodes:
    for q in nb(n):
        if (n, q) in seen:
            continue
        path, prev, cur = [n, q], n, q
        while cur not in nodes:
            nxt = [r for r in nb(cur) if r != prev and r not in path[-3:]]
            if not nxt:
                break
            prev, cur = cur, nxt[0]
            path.append(cur)
        seen.update({(n, q), (path[-1], path[-2])})
        if len(path) > 4:
            edges.append([(x, y) for y, x in path])        # to (x, y)

near = lambda p, q: abs(p[0] - q[0]) <= 3 and abs(p[1] - q[1]) <= 3
def hop(a, b):
    for e in edges:
        if near(e[0], a) and near(e[-1], b) and not near(a, b):
            return e
        if near(e[-1], a) and near(e[0], b) and not near(a, b):
            return e[::-1]
    raise SystemExit(f"no centerline between {a} and {b}")
loop = next(e for e in edges if near(e[0], J3) and near(e[-1], J3))
if loop[10][0] < loop[-10][0]:
    loop = loop[::-1]          # down the right side first, back up the left (frames 6-7)

pts = []
for i, step in enumerate(ROUTE[:-1]):
    seg = loop if step == "LOOP" else (None if ROUTE[i + 1] == "LOOP" else hop(step, ROUTE[i + 1]))
    for p in seg or []:
        if not pts or pts[-1] != p:
            pts.append(p)
P = np.array(pts, float)
arc = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(P, axis=0).T))])

reg = ndi.binary_dilation(ink, iterations=6)
ys, xs = np.nonzero(reg)
d, idx = cKDTree(P).query(np.c_[xs, ys].astype(float), k=40)
# Nearest centerline point; where the pen passes twice (a retrace), the earlier pass wins.
T = np.array([arc[idx[i][d[i] <= d[i, 0] + 2.0]].min() for i in range(len(xs))])
tv = np.round(T / arc[-1] * 65000).astype(np.uint32)
out = np.zeros((H, W, 3), np.uint8)
out[ys, xs, 0], out[ys, xs, 1], out[ys, xs, 2] = tv >> 8, tv & 255, 255
Image.fromarray(out, "RGB").save("timemap.png", optimize=True)
print(f"pen path {arc[-1]:.0f}px, {len(xs)} pixels -> timemap.png")

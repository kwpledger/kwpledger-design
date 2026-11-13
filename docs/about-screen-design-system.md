# Read this before building an app's About screen.

The About screen every kwp app carries: the Base44 apps (`smartalarm-pro`, `plankvoice`,
`tapdodge`, `labyrinth-tilt`) and their native iPhone apps (`*-ios`). What it holds, in what order,
and why the signature mark lives here and nowhere else in an app.

Authored 2026-11-13 on Kevin's instruction, from a session building SmartAlarm Pro's About screen
with `kwpledger-site` attached. Kevin authorized the matching edits to SPEC §10.1 and to the
header rule's §5 in the same change.

This is a **layer-3 consumer** of [the kwp design system](SPEC.md), like
[header-footer-design-system.md](header-footer-design-system.md). It defines nothing new about
color, type or spacing. Where it and SPEC.md disagree, SPEC.md wins; where it and
[PROVENANCE.md](../logos/PROVENANCE.md) disagree about the marks, PROVENANCE wins.

---

## 0. What this settles

| Question | Answer | § |
| :-- | :-- | :-- |
| Does an app's first screen carry the lockup? | **No.** Not the sign-in screen, not the home screen. | §1 |
| Where does the mark go in an app? | **The About screen, and only there.** | §1 |
| Where is About? | Settings → About. An app with no Settings reaches it from its main screen. | §2 |
| What is on it, in what order? | Seven parts, fixed order. | §3 |
| Whose privacy note? | **The app's own.** Never the site's, never another app's. | §4 |
| Which contact address? | `hello@kwpledger.com`, for every app. | §3 |
| Web and native? | Same content, same order. Each platform builds it its own way. | §5 |

---

## 1. Why an app's screens carry no lockup

**Kevin's decision, 2026-11-13:** an app's own screens carry neither the mark nor the wordmark. The
sign-in screen does not; the home screen does not. The mark appears once in each app, on About.

On the web, the header answers two questions a visitor has on arrival: *whose is this*, and *how do I
get back to the rest of it*. A visitor needs both, because they arrive from anywhere: a search, a
shared link, a post. An app answers both before it opens. Its icon is Kevin's artwork, its store
listing names him, and there is no parent site to return to from inside an alarm clock or a game.
A lockup on every screen would be the mark asking for attention it has already been given, which is
the same reasoning as the header rule's "at most one mark per page of chrome" (§6.3 there).

**The About screen is where someone goes to find out who made the app**, so that is where the mark
belongs, alongside everything the web footer carries.

**What this does not loosen.** SPEC §10.1 still requires an app's first screen to *read as belonging
to the family*. An app meets that through the system's tokens: its colors, type and spacing.
It does not need the lockup to do it. A web page a Base44 app serves as a page, such as a storefront
or a landing page, is still a web page, and the header rule binds it at its §5 tier.

---

## 2. Where it lives

**Settings → About**, as the last item in Settings. An app that has no Settings screen reaches About
from its main screen in one step: a menu item, or an "About" link at the foot of the screen. Where
exactly is the app's call, made when it is built and recorded in its backlog.

**It must be reachable without signing in.** Apple requires the privacy policy to be reachable
inside the app (App Review Guideline 5.1.1(i)). A person deciding whether to create an account is
exactly who needs to read it, so it cannot sit behind the sign-in it describes. An app whose
Settings is behind sign-in links About from its sign-in screen as well. A plain text link is
enough; the sign-in screen still carries no lockup.

---

## 3. The parts, in order

Top to bottom. Anything marked optional may be omitted; nothing may be reordered.

1. **The mark.** Short, ringed, teal, register-correct:
   `logos/logo_short_ring_teal.svg` on light, `logos/logo_short_ring_inv_teal.svg` on dark.
   Decorative, because the app name beside it carries the name: an empty `alt` on the web, hidden
   from VoiceOver natively. No smaller than the header's minimum (`2.4rem` canvas height,
   header rule §3.2); larger is fine, because this is the one place it appears. Never redrawn,
   recolored only in the ring (PROVENANCE).
2. **The app's name and version.** The name as the app shows it under its icon, and the version the
   person is actually running: the web app's `package.json` version, or the native app's
   marketing version and build number (`1.0 (12)`).
3. **A line about the app, and the way to the parent.** One or two sentences on what the app is
   for, then a link to `https://kwpledger.com`, with the destination stated in the link text
   (`kwpledger.com`), never implied.
4. **Privacy.** The app's own note, or a link to it. §4.
5. **Contact.** `hello@kwpledger.com`, as a `mailto:` link. One address for every app (Kevin,
   2026-11-13). The header rule's §6.2 applies unchanged: encode it as character references where
   the markup allows that for free, and ship it plainly where it does not. The address is
   disposable, which is the actual protection.
6. **`© {year} Kevin Pledger`.** The current year, computed, never written in.
7. **Font licences.** The licence notice for every font the app bundles. The text comes from
   `fonts/OFL-NOTICE.txt`, covering only the faces the app ships. A native app that uses only
   the system font bundles none, and leaves this part out. Third-party code licences, where an app
   ships any, go here too, below the fonts.

The order is the web footer's identity block, read top to bottom, with the mark and the name moved
to the top where a screen of its own puts them.

---

## 4. The privacy note

The header rule's §6.3 governs, and it is stricter here, because an app with accounts collects more
than a page does. **Each app writes its own note and links only that one.** Borrowing the site's
note, or another app's, describes a different system, and an inaccurate privacy statement is worse
than none.

A note covers, in plain language:

- **What the app keeps**, by name: name, email address, the person's own content (alarms, sessions,
  scores), uploaded files.
- **Who sees it.** For a private app, only the person. For anything shown to others, such as a
  leaderboard name or a posted high score, exactly what is shown and where.
- **Who handles it.** The host (Base44), each sign-in provider offered (Apple, Google), and any
  other service data leaves the app for, such as a chat channel that receives scores, or a browser's
  speech recognition that sends audio to its maker.
- **Usage counting.** What the host counts, and the state of every switch that would collect more.
  On Base44 that is session recording and visitor tracking. **A switch the note says is off is a
  promise.** Turning it on changes the note, the native privacy manifest and the store labels on
  the same day.
- **What stays on the device.**
- **How to delete the account**, and the contact address for questions.

**It must agree with three other records**, and changes to any one change all four: the native
app's `PrivacyInfo.xcprivacy`, the App Store privacy labels, and the privacy policy URL on the store
listing. Where a web app and its native app collect different things, they carry different notes.

---

## 5. Building it

**Same content, same order, on every platform.** Neither platform copies the other's components:
the web app and the native app share no code.

### 5.1 Web (Base44)

- A route of its own, `/about`, linked from Settings. It is outside the sign-in gate (§2).
- The mark's register follows the app's own theme switch, not the system's alone: both files ship,
  and the app's theme class hides one, exactly as the header rule's §4.1 does with
  `[data-theme]`. A Base44 app that sets `.dark` on `<html>` uses that selector.
- Colors by role (`text-foreground`, `text-muted-foreground`, `border-border`), never by value.
- The font licence text comes from the pinned package's `fonts/OFL-NOTICE.txt`, so it moves with
  the pin. It is never retyped.

### 5.2 Native (SwiftUI)

- An `AboutView`, pushed from Settings, using system list styling. A `Form` or `List` with
  sections reads as native and handles Dynamic Type without extra work.
- The mark is one asset-catalog image set with **Any** and **Dark** appearances, the two files of
  §3.1. That is the platform's own form of "both files ship"; never tint one file in code.
- `.accessibilityHidden(true)` on the mark; links are `Link` views whose text names the destination.
- The version is read from the bundle (`CFBundleShortVersionString` and `CFBundleVersion`), never
  typed in.

---

## 6. What this changes downstream

| Surface | Now |
| :-- | :-- |
| **SPEC §10.1** | Says an app's own screens are outside the header rule and points here. |
| **Header rule §5** | The Base44 row covers web pages a Base44 app serves as pages; app screens follow this document. |
| **smartalarm-pro**, **smartalarm-pro-ios** | First to build it: the web app, then the native app. |
| **plankvoice**, **plankvoice-ios**, **tapdodge**, **labyrinth-tilt** | Follow this document when each builds its About. `tapdodge` and `labyrinth-tilt` have no Settings yet, so §2's main-screen link applies. |

Each consumer is a **consumer** of this decision, never a precedent for it. A change to what About
holds is made here, and the apps follow.

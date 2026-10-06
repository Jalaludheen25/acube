import type { StaticImageData } from 'next/image'

import abraStationDay from '@/assets/images/abra-station-day.jpg'
import alFahidiAlley from '@/assets/images/al-fahidi-alley.jpg'
import archesBw from '@/assets/images/arches-bw.jpg'
import boulevardDay from '@/assets/images/boulevard-day.jpg'
import burDubaiStreet from '@/assets/images/bur-dubai-street.jpg'
import burjAlArabAerial from '@/assets/images/burj-al-arab-aerial.jpg'
import burjBlue from '@/assets/images/burj-blue.jpg'
import burjHaze from '@/assets/images/burj-haze.jpg'
import burjPalmsDay from '@/assets/images/burj-palms-day.jpg'
import burjSkyDay from '@/assets/images/burj-sky-day.jpg'
import businessBayDay from '@/assets/images/business-bay-day.jpg'
import cargoPortDay from '@/assets/images/cargo-port-day.jpg'
import clinicRoom from '@/assets/images/clinic-room.jpg'
import creekAbra from '@/assets/images/creek-abra.jpg'
import creekDhowDay from '@/assets/images/creek-dhow-day.jpg'
import dhowCargo from '@/assets/images/dhow-cargo.jpg'
import downtownDay from '@/assets/images/downtown-day.jpg'
import dubaiFrameDay from '@/assets/images/dubai-frame-day.jpg'
import frameDetail from '@/assets/images/frame-detail.jpg'
import heritageDoor from '@/assets/images/heritage-door.jpg'
import heritageFacade from '@/assets/images/heritage-facade.jpg'
import hospitalCorridor from '@/assets/images/hospital-corridor.jpg'
import indConstruction from '@/assets/images/ind-construction.jpg'
import indEducation from '@/assets/images/ind-education.jpg'
import indProfessional from '@/assets/images/ind-professional.jpg'
import indRetail from '@/assets/images/ind-retail.jpg'
import madinatDay from '@/assets/images/madinat-day.jpg'
import marinaDay from '@/assets/images/marina-day.jpg'
import museumFutureDay from '@/assets/images/museum-future-day.jpg'
import officeBright from '@/assets/images/office-bright.jpg'
import officeModern from '@/assets/images/office-modern.jpg'
import palmCoastDay from '@/assets/images/palm-coast-day.jpg'
import palmFrondsDay from '@/assets/images/palm-fronds-day.jpg'
import ribs from '@/assets/images/ribs.jpg'
import signing from '@/assets/images/signing.jpg'
import skylineDay from '@/assets/images/skyline-day.jpg'
import skylineWaterDay from '@/assets/images/skyline-water-day.jpg'
import studioWhite from '@/assets/images/studio-white.jpg'
import szrDay from '@/assets/images/szr-day.jpg'
import towersUpDay from '@/assets/images/towers-up-day.jpg'
import warehouseBright from '@/assets/images/warehouse-bright.jpg'
import windTower from '@/assets/images/wind-tower.jpg'

export type SiteImage = { src: StaticImageData; alt: string; credit: string }

/** Photography licensed under the Unsplash License — see CREDITS.md. */
export const images = {
  // Dubai — skylines & districts
  skylineDay: { src: skylineDay, alt: 'The Dubai skyline and Business Bay on a clear day', credit: 'Sirav Talwar' },
  downtownDay: { src: downtownDay, alt: 'Downtown Dubai and the Burj Khalifa in soft daylight', credit: 'Riyas Mohammed' },
  skylineWaterDay: { src: skylineWaterDay, alt: 'The Dubai skyline seen across calm water', credit: 'Thomas Winkler' },
  szrDay: { src: szrDay, alt: 'Towers along Sheikh Zayed Road with the Burj Khalifa beyond', credit: 'K T' },
  businessBayDay: { src: businessBayDay, alt: 'Aerial view of the Business Bay towers by day', credit: 'Nelemson Guevarra' },
  marinaDay: { src: marinaDay, alt: 'Dubai Marina towers and yachts under a blue sky', credit: 'Nelemson Guevarra' },
  palmCoastDay: { src: palmCoastDay, alt: "Turquoise water along Dubai's coastline and the Palm", credit: 'Sajimon Sahadevan' },
  palmFrondsDay: { src: palmFrondsDay, alt: 'Aerial view of residential fronds on Palm Jumeirah', credit: 'Ahmad Ossayli' },
  boulevardDay: { src: boulevardDay, alt: 'A palm-lined boulevard leading to the Burj Khalifa', credit: 'Pawanpreet Singh' },
  towersUpDay: { src: towersUpDay, alt: 'Looking up at residential towers against a clear sky', credit: 'alexanderafan' },
  // Dubai — landmarks
  museumFutureDay: { src: museumFutureDay, alt: 'The Museum of the Future with Arabic calligraphy on a sunny day', credit: 'Ondrej Bocek' },
  dubaiFrameDay: { src: dubaiFrameDay, alt: 'The Dubai Frame standing against a bright blue sky', credit: 'alexanderafan' },
  frameDetail: { src: frameDetail, alt: 'Golden patterned detail of the Dubai Frame', credit: 'Nick Fewings' },
  burjPalmsDay: { src: burjPalmsDay, alt: 'The Burj Khalifa and Downtown towers framed by palms and clouds', credit: 'Wael Hneini' },
  burjSkyDay: { src: burjSkyDay, alt: 'The Burj Khalifa rising into a blue sky with scattered clouds', credit: 'Wael Hneini' },
  burjBlue: { src: burjBlue, alt: 'The Burj Khalifa between palm fronds under a deep blue sky', credit: 'Nick Fewings' },
  burjHaze: { src: burjHaze, alt: 'The Burj Khalifa above the Downtown skyline on a hazy morning', credit: 'Jake De-bique' },
  burjAlArabAerial: { src: burjAlArabAerial, alt: 'Aerial view of the Burj Al Arab and the Jumeirah coast', credit: 'Christoph Schulz' },
  madinatDay: { src: madinatDay, alt: 'A palm-lined waterway at Madinat Jumeirah with the Burj Al Arab beyond', credit: 'Kifayat Ullah' },
  // Bur Dubai & heritage
  creekAbra: { src: creekAbra, alt: 'Traditional boats moored along Dubai Creek in Bur Dubai', credit: 'Nick Fewings' },
  creekDhowDay: { src: creekDhowDay, alt: 'An abra and a cargo dhow crossing Dubai Creek by day', credit: 'Afif Ramdhasuma' },
  abraStationDay: { src: abraStationDay, alt: 'Abras flying UAE flags at a creek-side station in Bur Dubai', credit: 'J Shim' },
  dhowCargo: { src: dhowCargo, alt: 'A loaded wooden cargo dhow sailing along Dubai Creek', credit: 'Afif Ramdhasuma' },
  burDubaiStreet: { src: burDubaiStreet, alt: 'A palm-lined street in Bur Dubai on a sunny day', credit: 'Shreyas Gupta' },
  alFahidiAlley: { src: alFahidiAlley, alt: 'A sunlit alley in the Al Fahidi historical district, Bur Dubai', credit: 'Alex' },
  windTower: { src: windTower, alt: 'A traditional wind tower in Bur Dubai against a clear sky', credit: 'Malik Shibly' },
  heritageDoor: { src: heritageDoor, alt: 'A carved wooden door in a heritage building in Bur Dubai', credit: 'Rushikesh Patil' },
  heritageFacade: { src: heritageFacade, alt: 'A restored coral-stone heritage building in Al Fahidi', credit: 'Rushikesh Patil' },
  // Architecture & work
  archesBw: { src: archesBw, alt: 'Black-and-white arches framing the distant Dubai skyline', credit: 'Dominik Pacholczyk' },
  ribs: { src: ribs, alt: 'Curved architectural ribs casting rhythmic light and shadow', credit: 'Erik Eastman' },
  signing: { src: signing, alt: 'A hand signing a document with a pen', credit: 'Scott Graham' },
  officeBright: { src: officeBright, alt: 'A bright, modern office with desks and natural light', credit: 'mahmoud azmy' },
  // Industries
  indConstruction: { src: indConstruction, alt: 'Tower cranes above new developments in Downtown Dubai', credit: 'Leonard von Bibra' },
  indRetail: { src: indRetail, alt: 'Escalators beneath a skylight in a shopping centre', credit: 'Declan Sun' },
  indProfessional: { src: indProfessional, alt: 'Consultants in conversation around a meeting table', credit: 'Vitaly Gariev' },
  indEducation: { src: indEducation, alt: 'A modern library with long study tables', credit: 'Ilia Bronskiy' },
  officeModern: { src: officeModern, alt: 'An airy modern workspace with plants and glass walls', credit: 'Copernico' },
  hospitalCorridor: { src: hospitalCorridor, alt: 'A bright hospital corridor with marble floors', credit: 'Yiğit Efe Kuyu' },
  clinicRoom: { src: clinicRoom, alt: 'A clean, daylit clinic room', credit: 'Zoshua Colah' },
  warehouseBright: { src: warehouseBright, alt: 'A bright warehouse with organised shelving', credit: 'Alberto Rodríguez' },
  cargoPortDay: { src: cargoPortDay, alt: 'A container ship docked beneath port cranes by day', credit: 'Andy Li' },
  studioWhite: { src: studioWhite, alt: 'A white photo studio with a camera and lighting', credit: 'Randy Fath' },
} satisfies Record<string, SiteImage>

export type ImageKey = keyof typeof images

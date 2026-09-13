// ==UserScript==
// @name         NubeScript
// @namespace    http://tampermonkey.net/
// @version      2025-12-05
// @description  try to take over the world!
// @author       You
// @match        https://nubeli-cash.firebaseapp.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=firebaseapp.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SCRIPT_VERSION = "v4.5b"

    var SET_PROFILE = 1

    if (!localStorage.getItem("DEBUG_PROFILE")) {
        localStorage.setItem("DEBUG_PROFILE", SET_PROFILE);
    } else if (localStorage.getItem("DEBUG_PROFILE")) {
        SET_PROFILE = localStorage.getItem("DEBUG_PROFILE");
    }

    if (SET_PROFILE == 1) {
        var Settings = {

            ShowConsoleLogs: false,             // show console logs
            CopyPhoneNumRightClick: true,       // copy phone numbers to clipboard by right clicking them
            CheckForAppTripsDefault: false,     // default option for highlighting app trips

            HighlightTripsFrom: [               // whose trips to highlight in the dashboard
                "Samuel Martinez",
                "Santiago Martinez"
            ],

            SoundPlayWhenNew: true,             // default option to constantly play a sound when a highlighted trip is on 'NEW'
            SoundPlayWhenNewApp: true,          // play a sound when highlighted app trip is on new
            SoundPlayWhenArrived: true,         // play a sound when a highlighted trip changes to 'ARRIVED'
            SoundPlayWhenStarted: true,         // play a sound when a highlighted trip changes from 'ARRIVED' to 'STARTED'

            SoundForNewTrip: "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0215%20-%20More%20Menu%20Stuff.mp3",
            VolumeNewTrip: 0.06,                 // volume: 0 - 1 (e.g: 0.5, 0.1, 0.9)

            SoundForNewAppTrip: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0896%20-%20Surprise%20Box%20&%20Ten-Yeti%20-%20Miss.mp3",
            VolumeNewAppTrip: 0.06,

            SoundForArrivedTrip: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0210%20-%20Menu%20Selection.mp3",
            VolumeArrivedTrip: 0.4,

            SoundForStartedTrip: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0213%20-%20Unknown%20Menu%20Sound.mp3",
            VolumeStartedTrip: 0.4,

            HighlightwspTrip: true,        // highlight a trip if the currently open whatsapp chat matches the phone number (no sound notifications)

            // v2.0 options

            NotificationWhenArrived: false,      // send desktop notification when a trip's arrived and window is unfocused
            Always100Trips: true,               // always render 100 trips (uses dropdown button)

            // v3.0 - v3.1 options

            ShowTimeSinceAccepted: true,        // shows how many minutes have passed since the trip was accepted
            AlertAfter10MinAccepted: true,      // notif alert when it has been 10 mins since accepted trip, and highlight
            ShowTimeSinceArrived: true,         // shows how many minutes have passed since driver's been on arrived
            AlertAfter7MinArrived: true,        // notif alert when it has been 7 mins since arrived

            TimeAlertsForAppTrips: false,       // (toggleable) if to highlight and send sound warnings of the accepted and arrived trips for app trips

            SoundForAcceptedAlert: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0222%20-%20Almost%20Like%20You%20Failed%20To%20Select.mp3",
            VolumeAcceptedAlert: 0.4,

            SoundForArrivedAlert: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0107%20-%20Getting%20An%20Item.mp3",
            VolumeArrivedAlert: 0.4,

            HighlightTodaysTrips: true,         // (toggleable) if to highlight todays trips and desaturate trips which arent || 3.2: now works for ALL trips

            // v3.2 options

            ShowAssignDriverBeforehand: true,    // v3.5: shows a tag on the leftmost side showing who is the selected driver when trip is NEW / RESERVED or ACCEPTED
            ShowColoredWhatsAppChats: true,      // highlight the whatsapp chats based on the booking status of trips matching the phone number

            // v3.3 options

            WhatsappTagsSystem: false,           // adds a new list on every whatsapp chat so you can tag and order the whatsapp chats for optimizing workflow

            // v3.5 options

            ShowTimeSinceBooked: true,          // shows timestamp of elapsed time of a trip based on its Booking Date time

            // v4.0 options

            WhatsappTagList: [                  // tags for the whatsapp chats
                "COTIZANDO VIAJE",
                "TAXI EN CAMINO",
                "DOUBLE TRIP",
                "VIAJE RESERVADO",
                "VIAJE COMENZADO",
                "CHAT DE SOPORTE",
                "MANTENER CHAT ABIERTO",
                "PENDIENTE ENVIAR SERVICIO",
                "",
            ],

            ShowActiveBookingStats: true,       // show statistics alongisde the Current and Today bookings displaying number of New, Accepted, and Started trips
            UseTermLookupOnSettings: true,      // enables 2 text fields on the settings menu, value set on the fields will be looked upon for each trip

            SoundForLookUpAlert: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/1064%20-%20HP%20Healing%20(Food).mp3",
            VolumeLookupAlert: 0.4,

            LookupWarningInterval: 15,          // counter for playing the arrived warning beep (seconds)

            ShowBookingIcon: true,              // show a booking icon next to the booking timestamp if a trip is a Book Later

            // v4.11 options

            WarningSoundsInterval: 60,          // merged counter for the arrived & accepted warnings in seconds

            // v4.5 options

            KeepWspChatboxContent: true,        // if to save what u were writing on a chatbox to prevent interrumptions (like receiving a new chat)
        }
    }

    if (SET_PROFILE == 2) {
        var Settings = {

            ShowConsoleLogs: false,             // show console logs
            CopyPhoneNumRightClick: true,       // copy phone numbers to clipboard by right clicking them
            CheckForAppTripsDefault: false,     // default option for highlighting app trips

            HighlightTripsFrom: [               // whose trips to highlight in the dashboard
                "Santiago Martinez",
                "Nombre ejemplo",
                "Nombre ejemplo",
            ],

            SoundPlayWhenNew: true,             // default option to constantly play a sound when a highlighted trip is on 'NEW'
            SoundPlayWhenNewApp: true,          // play a sound when highlighted app trip is on new
            SoundPlayWhenArrived: true,         // play a sound when a highlighted trip changes to 'ARRIVED'
            SoundPlayWhenStarted: true,         // play a sound when a highlighted trip changes from 'ARRIVED' to 'STARTED'

            SoundForNewTrip: "https://audio.jukehost.co.uk/IwFHTvemIJJtQIuqvvSTbKAgMO0rTFWI",
            VolumeNewTrip: 0.08,                 // volume: 0 - 1 (e.g: 0.5, 0.1, 0.9)

            SoundForNewAppTrip: "https://audio.jukehost.co.uk/IwFHTvemIJJtQIuqvvSTbKAgMO0rTFWI",
            VolumeNewAppTrip: 0.08,

            SoundForArrivedTrip: "https://audio.jukehost.co.uk/C8K9PT6sjG7G7VRYv0mWyhV0LhEQQVxt",
            VolumeArrivedTrip: 0.4,

            SoundForStartedTrip: "https://audio.jukehost.co.uk/6ZUIedUF2GUwmECTn18c1Llj4AzkF0jn",
            VolumeStartedTrip: 0.4,

            HighlightwspTrip: true,        // highlight a trip if the currently open whatsapp chat matches the phone number

            // v2.0 options

            NotificationWhenArrived: true,      // send desktop notification when a trip's arrived and window is unfocused
            Always100Trips: true,               // always render 100 trips (uses dropdown button)

            // v3.0 - v3.1 options

            ShowTimeSinceAccepted: true,        // shows how many minutes have passed since the trip was accepted
            AlertAfter10MinAccepted: true,      // notif alert when it has been 10 mins since accepted trip, and highlight
            ShowTimeSinceArrived: true,         // shows how many minutes have passed since driver's been on arrived
            AlertAfter7MinArrived: true,        // notif alert when it has been 7 mins since arrived

            TimeAlertsForAppTrips: false,       // (toggleable) if to highlight and send sound warnings of the accepted and arrived trips for app trips

            SoundForAcceptedAlert: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0222%20-%20Almost%20Like%20You%20Failed%20To%20Select.mp3",
            VolumeAcceptedAlert: 0.4,

            SoundForArrivedAlert: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/0107%20-%20Getting%20An%20Item.mp3",
            VolumeArrivedAlert: 0.4,

            HighlightTodaysTrips: false,        // (toggleable) if to highlight todays trips and desaturate trips which arent


            // v3.2 options

            ShowAssignDriverBeforehand: true,   // when trip is new, show who's the selected driver before accepted instead of a blank cell
            ShowColoredWhatsAppChats: true,      // highlight the whatsapp chats based on the booking status of trips matching the phone number

            // v3.3 options

            WhatsappTagsSystem: true,           // adds a new list on every whatsapp chat so you can tag and order the whatsapp chats for optimizing workflow

            // v3.5 options

            ShowTimeSinceBooked: true,          // shows timestamp of elapsed time of a trip based on its Booking Date time

            // v4.0 options

            WhatsappTagList: [                  // tags for the whatsapp chats
                "BOOK LATER",
                "DOUBLE TRIP",
                "PENDIENTE CONFIRMACION",
                "FINALIZADO",
                "REPORTE",
                "EN PROGRESO",
            ],

            ShowActiveBookingStats: true,       // show statistics alongisde the Current and Today bookings displaying number of New, Accepted, and Started trips
            UseTermLookupOnSettings: true,      // enables 2 text fields on the settings menu, value set on the fields will be looked upon for each trip

            SoundForLookUpAlert: "https://github.com/AetherLynx/misc-repo/raw/refs/heads/main/1064%20-%20HP%20Healing%20(Food).mp3",
            VolumeLookupAlert: 0.4,

            LookupWarningInterval: 15,          // counter for playing the arrived warning beep (seconds)

            ShowBookingIcon: true,              // show a booking icon next to the booking timestamp if a trip is a Book Later

            // v4.11 options

            WarningSoundsInterval: 60,        // merged counter for the arrived & accepted warnings in seconds

            // v4.5 options

            KeepWspChatboxContent: true,        // if to save what u were writing on a chatbox to prevent interrumptions (like receiving a new chat)
        }
    }

    var nameTrips = Settings.HighlightTripsFrom;

    const arrivedSound = new Audio(Settings.SoundForArrivedTrip);
    arrivedSound.volume = Settings.VolumeArrivedTrip;

    const startedSound = new Audio(Settings.SoundForStartedTrip);
    startedSound.volume = Settings.VolumeStartedTrip;

    const newtripSound = new Audio(Settings.SoundForNewTrip);
    newtripSound.volume = Settings.VolumeNewTrip;

    const newAppTripSound = new Audio(Settings.SoundForNewAppTrip);
    newAppTripSound.volume = Settings.VolumeNewAppTrip;

    const acceptedAlertSound = new Audio(Settings.SoundForAcceptedAlert);
    acceptedAlertSound.volume = Settings.VolumeAcceptedAlert;

    const arrivedAlertSound = new Audio(Settings.SoundForArrivedAlert);
    arrivedAlertSound.volume = Settings.VolumeArrivedAlert;

    const lookupAlertSound = new Audio(Settings.SoundForLookUpAlert);
    lookupAlertSound.volume = Settings.VolumeLookupAlert;

    // DATA
    const rootStyles = window.getComputedStyle(document.documentElement);
    const arrivedText = "span.p-tag-value";
    var arrivedTrips = 0; //arrived trips counter
    var firstChecker = 0; //first checker
    var csscolour = null;
    const wspContQuery = ".flex.bg-white.align-items-center.justify-content-between.w-full.shadow-2.z-1"; //for IN THE CHAT
    const masterWspContQuery = ".chat-container"; //for OUT THE CHAT
    const wspTextBoxQuery = ".p-inputtextarea.p-inputtext.p-component.p-inputtextarea-resizable.emoji-input.w-full.px-5.emoji-input.w-full.px-5"
    const wspChatgroupsQuery = ".flex.align-items-center.bg-white.p-3.gap-3.border-bottom-1.surface-border.cursor-pointer.mb-1"
    const wspChatHeaderQuery = ".flex.bg-white.align-items-center.justify-content-between.w-full.shadow-2.z-1";
    const cancelBtQuery = "button.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-sm.p-button-danger"
    const warningIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Im0xMi41OTMgMjMuMjU4bC0uMDExLjAwMmwtLjA3MS4wMzVsLS4wMi4wMDRsLS4wMTQtLjAwNGwtLjA3MS0uMDM1cS0uMDE2LS4wMDUtLjAyNC4wMDVsLS4wMDQuMDFsLS4wMTcuNDI4bC4wMDUuMDJsLjAxLjAxM2wuMTA0LjA3NGwuMDE1LjAwNGwuMDEyLS4wMDRsLjEwNC0uMDc0bC4wMTItLjAxNmwuMDA0LS4wMTdsLS4wMTctLjQyN3EtLjAwNC0uMDE2LS4wMTctLjAxOG0uMjY1LS4xMTNsLS4wMTMuMDAybC0uMTg1LjA5M2wtLjAxLjAxbC0uMDAzLjAxMWwuMDE4LjQzbC4wMDUuMDEybC4wMDguMDA3bC4yMDEuMDkzcS4wMTkuMDA1LjAyOS0uMDA4bC4wMDQtLjAxNGwtLjAzNC0uNjE0cS0uMDA1LS4wMTgtLjAyLS4wMjJtLS43MTUuMDAyYS4wMi4wMiAwIDAgMC0uMDI3LjAwNmwtLjAwNi4wMTRsLS4wMzQuNjE0cS4wMDEuMDE4LjAxNy4wMjRsLjAxNS0uMDAybC4yMDEtLjA5M2wuMDEtLjAwOGwuMDA0LS4wMTFsLjAxNy0uNDNsLS4wMDMtLjAxMmwtLjAxLS4wMXoiLz48cGF0aCBmaWxsPSIjNjVhMzBkIiBkPSJNMTIgMmM1LjUyMyAwIDEwIDQuNDc3IDEwIDEwcy00LjQ3NyAxMC0xMCAxMFMyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMm0wIDEzYTEgMSAwIDEgMCAwIDJhMSAxIDAgMCAwIDAtMm0wLTlhMSAxIDAgMCAwLS45OTMuODgzTDExIDd2NmExIDEgMCAwIDAgMS45OTMuMTE3TDEzIDEzVjdhMSAxIDAgMCAwLTEtMSIvPjwvZz48L3N2Zz4="
    const driverChatButtonQuery = '.flex.flex-nowrap.justify-content-between.align-items-center.border-1.surface-border.border-round.p-3.cursor-pointer.select-none.hover\\:surface-hover.transition-colors.transition-duration-150';
    const driverChatBadgeQuery = '.p-badge.p-component.p-badge-no-gutter.p-badge-danger';
    const driverChatWideBadgeQuery = '.p-badge.p-component.p-badge-danger:not(.p-badge-dot)';
    var tabFocused = false;
    var warningsAlertCounter = 0;
    //var acceptedAlertCounter = 0;
    //var arrivedAlertCounter = 0;
    var lookupAlertCounter = 0;
    const minsForAccepted = 10;
    const minsForArrived = 7;
    const actBookSpanQuery = "span.text-xl.text-900.font-bold.mr-3";
    const bookingsCategoryQuery = "span.p-buttonset"
    var lookupCooldown = false;
    const cellCheckQuery = "i.pi.pi-check"

    var lookupData1 = "";
    var lookupData2 = "";

    var toAlertAccepted = false;
    var toAlertArrived = false;

    var allChatButtons = null;
    var activeBadges = null;

    var stats_NewTrips_toggled = false;
    var stats_NewAppTrips_toggled = false;
    var stats_AccTrips_toggled = false;
    var stats_ArrTrips_toggled = false;
    var stats_StaTrips_toggled = false;
    var stats_FinTrips_toggled = false;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = "dark-mode-custom-style";
    style.innerHTML = `
    .filterGlow {
        filter: brightness(150%) contrast(120%);
        outline: 2px dashed #FFF !important;
    }

    .booksStatisticsCont {
        cursor: pointer;
        user-select: none;
    }
        
    .selectedDriverTagBadOutline {
      border: 2px solid #af0b0b !important;
    }
        
    .selectedDriverTagGoodOutline {
      border: 2px solid #26aa1a !important;
    }

    .refreshButtonClass {
        box-shadow: var(--shadow1);
        position: fixed;
        z-index: 99;
        inset: auto 180px 30px auto;
        width: 50px;
        height: 45px;

        text-align: center;
        font-family: "Segoe UI";
        font-weight: bold;
        justify-content: center;

        padding: 6px;
        background: var(--native-dark-bg-color);
        color: white;

        border-radius: 6px;
        outline: 2px solid #a8fab9;
        border: none;

        transition: 0.2s all ease-in-out;
    }

    .refreshButtonClass:hover {
        cursor: pointer;
        filter: brightness(120%);
    }

    /* CUSTOM -- CUSTOM -- CUSTOM -- CUSTOM */
  /* CUSTOM -- CUSTOM -- CUSTOM -- CUSTOM */
  /* CUSTOM -- CUSTOM -- CUSTOM -- CUSTOM */
  /* v4.21 */

  :root {
    /* vv PROFILE 1 OPTIONS vv*/
    
    --duplicate-booking-color: #ffe0a3;

    --own-booking-color: #dcd3de;
    --app-booking-color: #d6d0e9;

    --whatsapp-tripcolour: #659a60;

    --whatsapp-chat-window-size: 110%;
    --whatsapp-chat-window-move-X: -40px;
    --whatsapp-chat-window-move-Y: -40px;
    --whatsapp-chat-window-height: 50%;

    --phonenumber-base-color: #4f4c79;
    --phonenumber-click-color: #c52828;

    --lookup-highlight-tripcolour: #a426af;
    --lookup-highlight-trip-background-colour: #f8e6fa;

    /* ^^ PROFILE 1 OPTIONS ^^ */

    --new-yellow: #b97229;
    --new-green: #00763F;
    --bk-new: var(--new-yellow);
    --bk-finish: var(--new-yellow);

    --darker-phonenums: color-mix(in srgb, var(--phonenumber-base-color), black 40%);
    --evendarker-phonenums: color-mix(in srgb, var(--phonenumber-base-color), black 70%);

    --d-phonecopy: color-mix(in srgb, var(--phonenumber-click-color), black 40%);
    --dd-phonecopy: color-mix(in srgb, var(--phonenumber-click-color), black 70%);

    --shadow1: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  tr[role="row"] td[role="cell"] {
    /*outline: 1px solid rgb(58, 56, 56);*/
  }

  /*
  .p-button.p-component.p-button-icon-only.p-button-secondary:has(.p-button-icon.p-c.pi.pi-refresh) {
    outline: 2px solid red;
  }
    */

  .MuiAutocomplete-popper {
    border: 1px solid gray;
    border-radius: 6px;
  }

  * {
    /* disable transitions */
    transition: none !important;
  }

  #adsettings_dialog {
    outline: none;
    border: none;

    outline: 1px solid gray;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    width: 100rem;
    height: 50rem;

    padding: 2rem;
    border-radius: 6px;

    box-sizing: border-box;

    gap: 20px;
  }

  #adsettings_dialog .sidebar {
    width: 20rem;
    height: 100%;

    border-right: 1px solid gray;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    
    box-sizing: border-box;

    padding-right: 20px;
    gap: 20px;
  }

  #adsettings_dialog .sidebarElementselect {
    outline: 1px solid white;
    border-radius: 4px;

    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    gap: 10px;
    font-size: 1.2rem;

    box-sizing: border-box;

    transform: scale(1.05);
  }

  #adsettings_dialog .sidebarElementunselect {
    outline: 1px dashed gray;
    border-radius: 1px;

    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    gap: 10px;
    font-size: 1.2rem;

    box-sizing: border-box;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .p-scrollpanel-bar {
    background: white !important;
  }

  .newReadButton-disabled {
    width: 100%;

    background-color: #000;
    color: #768178;
    border: 2px dashed #768178;
    border-radius: 6px;
    font-size: 1.2rem;
    padding: 20px;
    margin-bottom: 15px; 
    cursor: not-allowed;
  }

  .newReadButton-active {
    width: 100%;
    
    background-color: #121b10;
    color: #ecffee;
    border: 2px solid #77da77;
    border-radius: 6px;
    font-size: 1.2rem;
    padding: 20px;
    margin-bottom: 15px; 
    cursor: pointer;
  }

  .booksStatisticsCont {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2px;

    padding: 4px;
    margin-left: 6px;
    margin-right: 6px;

    border-radius: 4px;
    outline: 2px solid gray;

    width: auto;
    padding-left: 12px;
    padding-right: 12px;

    color: #000;
  }

  .booksStatisticsCont * {
    color: #000;
  }

  .filterHide {
    filter: brightness(50%);
  }

  .filterBlur {
    filter: blur(150%);
  }

  .whatsappstate_new {
    outline: 2px dashed #ebad28 !important;
    border: none !important;
  }

  .whatsappstate_accepted {
    outline: 2px solid #2862dd !important;
    border: none !important;
  }

  .whatsappstate_arrived {
    outline: 2px dashed #d45134 !important;
    border: none !important;
  }

  .whatsappstate_started {
    outline: 2px solid #369950 !important;
    border: none !important;
  }

  .whatsappstate_reached_paid {
    outline: 2px dashed #2e7742 !important;
    border: none !important;
  }


  .flex.align-items-center.bg-white.p-3.gap-3.border-bottom-1.surface-border.cursor-pointer.mb-1 {
    outline: 2px solid gray;

    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px !important;
    border-radius: 12px;
  }


  .flex.bg-white.align-items-center.justify-content-between.w-full.shadow-2.z-1 {
    background: #1d1d22 !important;
    border-bottom: 2px solid gray;
    box-shadow: var(--shadow1);
  }
  
  .ns-lookupfield {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    outline: 2px solid #363535;
    border-radius: 4px;
    gap: 8px;

    width: 100%;
    height: auto;
  }

  .ns-lookupfield input {
    box-sizing: border-box;
    background-color: var(--lookup-highlight-trip-background-colour);
    border: 1px solid var(--lookup-highlight-tripcolour);
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    height: 50px;
  }

  .newsettings {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    background-color: #000;
    outline: 1px solid rgb(126, 115, 115);
    border-radius: 8px;

    padding: 12px;

    position: fixed;
    z-index: 999;
    inset: auto 180px 90px auto;
    gap: 12px;
    width: auto;
    height: auto;
  }

  .newsettings span {
  color: #fff;
  }

  .ns-wrapcolumn {
    display: flex;
    flex-direction: column;
    max-height: 300px;
    width: auto;
    flex-wrap: wrap;
    gap: 10px;
  }

  .ns-row {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    color: #fff;
    padding: 10px;
    gap: 10px;
    width: 300px;

    border: 2px solid green;
    border-radius: 6px;


    font-size: 14px;
    text-align: center;
    cursor: pointer;
    background-color: #1d1c1c;
  }

  #OPEN_CONFIG {
    border-color: #fff;
    background-color: #373a3b;
  }

  .ns-row:hover {
    /*filter: brightness(120%);*/
  }

  .ns-row:hover * {
    color: rgb(153, 201, 153);
  }

  .ns-row:active {
    /*filter: brightness(80%);*/
  }

  img[isbookingicon] {
    background-color: #000;
    border-radius: 4px;
  }


  .timeDiffAccepted {
    background-color: #2c63b6;
    border: 2px solid color-mix(in srgb, #2c63b6, black 70%);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 8px;
    color: #fff;
  }

  .timeDiffArrived {
    background-color: #bb5f48;
    border: 2px solid color-mix(in srgb, #bb5f48, black 70%);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 8px;
    color: #fff;
  }

  .timeDiffBooked {
    background-color: #405745;
    border: 2px solid color-mix(in srgb, #405745, black 70%);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 8px;
    color: #fff;
  }


  .selectedDriverTag {
    background-color: #282c35;
    border: 2px solid color-mix(in srgb, #282c35, black 70%);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 8px;
    color: #fff;
  }

  .selectedDriverTagDupe {
    background-color: #996428;
    border: 2px solid color-mix(in srgb, #282c35, #570000 70%);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 8px;
    color: #fff;
  }

  .acceptedWarn-highlight {
    outline: 3px solid #4c64a7;
    filter: brightness(120%);
    box-shadow: var(--shadow1);
  }

  .arrivedWarn-highlight {
    outline: 3px solid #a74f4c;
    filter: brightness(120%);
    box-shadow: var(--shadow1);
  }

  .whatsapp-highlight {
    outline: 4px solid var(--whatsapp-tripcolour);
    filter: brightness(130%);
    box-shadow: var(--shadow1);
  }

  .lookup-highlight {
    outline: 4px solid var(--lookup-highlight-tripcolour);
    /*filter: brightness(130%);*/
    box-shadow: var(--shadow1);

    background: var(--lookup-highlight-trip-background-colour) !important;
  }

  .setting-buttonbase {
    box-shadow: var(--shadow1);
    position: fixed;
    z-index: 99;
    inset: auto 180px 30px auto;
    width: 150px;
    height: 45px;

    text-align: center;
    font-family: "Segoe UI";
    font-weight: bold;
    justify-content: center;

    padding: 6px;
    background: var(--native-dark-bg-color);
    color: white;

    border-radius: 6px;
    outline: 2px solid white;
    border: none;

    transition: 0.2s all ease-in-out;
  }

  .container-bookinginfo {
    inset: auto 1000px 30px auto;
    width: 900px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    outline: 1px solid black !important;
  }

  .container-bookinginfo span {
    font-weight: lighter;
  }

  .container-bookinginfo:hover {
    filter: none !important;
    cursor: default !important;
  }

  .setting-fetchbookings {
    inset: auto 580px 30px auto;
  }

  .setting-checkapptrips {
    inset: auto 380px 30px auto;
  }

  .setting-newchecker {
    inset: auto 180px 30px auto;
  }

  .setting-buttonbase {
    position: fixed;
    z-index: 99;
    width: 150px;
    height: 45px;

    text-align: center;
    font-family: "Segoe UI";
    font-weight: bold;
    justify-content: center;

    padding: 6px;
    background: var(--native-dark-bg-color);
    color: white;

    border-radius: 6px;
    outline: 2px solid white;
    border: none;

    transition: 0.2s all ease-in-out;
  }

  .setting-buttonbase:hover {
    filter: brightness(120%);
    cursor: pointer;
  }

  .owntrip {
    background: var(--own-booking-color) !important;
  }

  .alt-owntrip {
    background: var(--app-booking-color) !important;
  }

  .notif-arrived {
    outline: 1px solid var(--arrived-orange);
  }

  .cust_phonecopy,
  a.cust_phonecopy,
  a[href^="tel:"].cust_phonecopy {
    color: var(--phonenumber-click-color) !important;
    background-color: #e6e2f0;
    outline: 2px dashed var(--d-phonecopy) !important;
  }

  a[href^="tel:"] {
    color: var(--phonenumber-base-color) !important;
    background-color: #e6e2f0;
    outline: 1px solid var(--darker-phonenums) !important;
    border-radius: 3px !important;
  }



  /* CUSTOM -- CUSTOM -- CUSTOM -- CUSTOM */
  /* CUSTOM -- CUSTOM -- CUSTOM -- CUSTOM */
  /* CUSTOM -- CUSTOM -- CUSTOM -- CUSTOM */
    `;
    document.getElementsByTagName('head')[0].appendChild(style);


    function hasDuplicates(arr, value) {
        return arr.filter(item => item === value).length > 1;
    }

    var urldata = window.location.href;


    const whatsappClasses = {
        "ACCEPTED": "whatsappstate_accepted",
        "ARRIVED": "whatsappstate_arrived",
        "STARTED": "whatsappstate_started",
        "NEW": "whatsappstate_new",
        "FINISHING": "whatsappstate_reached_paid",
        "REACHED": "whatsappstate_reached_paid",
        "REACHEDEXTRA": "whatsappstate_reached_paid",
        "PAID": "whatsappstate_reached_paid"
    }

    var whatsappSelectList = `
    <select iswsptaglist='true' name='wspChatTag'>
    `

    var tagArray = Settings.WhatsappTagList

    tagArray.forEach((element, index) => {
        let fIndex = index + 1;
        whatsappSelectList += `\n` + `<option value='${fIndex}'>${element}</option>`
    });

    whatsappSelectList += `\n` + `</select>`

    var whatsappTagsNumbers = {
        "numberExample": "17",
    };

    var data_Wsp_TextboxContent = {
        "numberexample": "Lorem ipsum dolor amet",
    }

    var changingDriverList = [
        "Jane Doe"
    ]

    const today = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'numeric', day: 'numeric', year: 'numeric' });

    const originalConsoleLog = console.log;

    var isSettingsVisible = false;

    const TripsPageURL = "https://nubeli-cash.firebaseapp.com/dashboard";
    const IncidentsPageURL = "https://nubeli-cash.firebaseapp.com/incidentreports";
    const DriversChatPageURL = "https://nubeli-cash.firebaseapp.com/chat";

    document.addEventListener("visibilitychange", () => {
        tabFocused = !document.hidden;
    });

    window.addEventListener("blur", () => {
        tabFocused = false;
    });

    window.addEventListener("focus", () => {
        tabFocused = true;
    });


    if (!Settings.ShowConsoleLogs) {
        console.log("-- NUBESCRIPT: DISABLING CONSOLE LOGS --");
        console.log = function () { };
    }

    if (Settings.HighlightwspTrip) {
        highlightWhatsapp();
        setInterval(highlightWhatsapp, 200)
    }

    setInterval(() => {
        tickFunction("new");
    }, 500)

    setInterval(secondsTick, 1000);

    createSettingButtons();

    function secondsTick() {
        warningsAlertCounter++;
        lookupAlertCounter++;
    }

    if (Settings.Always100Trips) {
        setInterval(() => {

            if (window.location.href !== TripsPageURL) return;
            if (!Settings.Always100Trips) return; //because it now updates in the new settings

            const allDropdowns = document.querySelectorAll('[data-pc-name="dropdown"]');

            allDropdowns.forEach((dropdown) => {
                const label = dropdown.querySelector('.p-dropdown-label');

                // Only target the one currently showing "20"
                if (label && label.textContent.trim() === "20") {
                    const trigger = dropdown.querySelector('.p-dropdown-trigger');

                    if (trigger) {
                        // 1. Open the menu
                        trigger.click();

                        // 2. Immediate micro-task to click the option
                        setTimeout(() => {
                            const options = document.querySelectorAll('.p-dropdown-item');
                            const targetOption = Array.from(options).find(opt => opt.textContent.trim() === "100");

                            if (targetOption) {
                                targetOption.click(); // This triggers the framework's internal filter
                                console.log("NUBESCRIPT: FORCED DASHBOARD FILTER TO 100");
                            } else {
                                // If 100 isn't found, close it so it doesn't stay open
                                trigger.click();
                            }
                        }, 10); // 10ms is invisible to the human eye but enough for the DOM
                    }
                }
            });
        }, 500); // Check every 3 seconds
    }

    function highlightWhatsapp() {
        const isChatOpen = document.querySelector(wspContQuery)
        const wspCont = document.querySelector(masterWspContQuery);

        if (isChatOpen) {
            var wspNumber = wspCont.querySelector(`a[href^="tel:"]`);
            var highlightedSomething = false;
            wspNumber = formatPhoneNum(wspNumber.getAttribute('href'), true);

            document.querySelectorAll(`a[href*="${wspNumber}"]`).forEach(element => {
                var row = element.closest('tr[role="row"]');
                if (!row) return;

                var tripData = getDataFromTrip(row);

                row.classList.add("whatsapp-highlight");
                highlightedSomething = true;

                if (Object.keys(whatsappClasses).includes(tripData["tripStatus"])) {
                    wspCont.classList.add(whatsappClasses[tripData["tripStatus"]])
                }
            });

            if (!highlightedSomething) {
                removeClasses("whatsapp-highlight")
                removeClassesObject(whatsappClasses, wspCont)
            }
        } else {
            if (wspCont) {
                removeClasses("whatsapp-highlight")
                removeClassesObject(whatsappClasses, wspCont)
            }
        }
    }

    var statistics = [0, 0, 0, 0, 0, 0, 0]; // newNorm newApp accepted arrived started reachedpaid/reachedpaidextra ALL

    const numBlacklist = [
        "431435555",
        "13158697089",
        "16968870000",
        "13158697099",
    ]

    const driverBlacklist = [
        "New Driver App",
        "Test Driver",
        "Paquita Ramirez",
        "Chris Pasajero",
    ]

    var toPingNew = false;
    var toPingNewApp = false;
    var toPingLookup = false;

    /* TICK FUNCTION - TICK FUNCTION - TICK FUNCTION - TICK FUNCTION - TICK FUNCTION */
    function tickFunction(query) {
        toAlertAccepted = false;
        toAlertArrived = false;

        allChatButtons = [];
        activeBadges = null;

        toPingNew = false;
        toPingNewApp = false;
        toPingLookup = false;

        if (query == "new") {
            firstChecker = 0;
            statistics = [0, 0, 0, 0, 0, 0, 0]

            urldata = window.location.href;

            // change tab title
            switch (urldata) {
                case "https://nubeli-cash.firebaseapp.com/dashboard":
                    document.title = "Dashboard"
                    break;
                case "https://nubeli-cash.firebaseapp.com/booking-history":
                    document.title = "Booking History"
                    break;
                case "https://nubeli-cash.firebaseapp.com/incidentreports":
                    document.title = "Incident Reports"
                    break;
                case "https://nubeli-cash.firebaseapp.com/payment-links":
                    document.title = "Card Payments"
                    break;
                case "https://nubeli-cash.firebaseapp.com/riders":
                    document.title = "User Passengers"
                    break;
                case "https://nubeli-cash.firebaseapp.com/guestusers":
                    document.title = "Guest Passengers"
                    break;
                case "https://nubeli-cash.firebaseapp.com/drivers":
                    document.title = "Drivers List"
                    break;
                case "https://nubeli-cash.firebaseapp.com/whatsapp-settings":
                    document.title = "WhatsApp History"
                    break;
                case "https://nubeli-cash.firebaseapp.com/chat":
                    document.title = "Drivers Chat"
                    break;
                case "https://nubeli-cash.firebaseapp.com/wallethistory":
                    document.title = "Wallet History"
                    break;
                default:
                    document.title = "NubeLi"
                    break;
            }


            // NEW READ ALL BUTTON
            if (urldata == DriversChatPageURL) {
                activeBadges = document.querySelectorAll(driverChatWideBadgeQuery);

                if (activeBadges.length >= 1) {
                    var dataGet = null;
                    activeBadges.forEach((element, index) => {
                        var dummy = element.closest(driverChatButtonQuery)
                        allChatButtons[index] = element.closest(driverChatButtonQuery);
                    });
                }

                if (!document.getElementById("newReadAllButton")) {
                    const readAllButton = document.createElement("button")
                    readAllButton.id = "newReadAllButton";
                    updateReadButton(readAllButton, activeBadges.length)

                    readAllButton.addEventListener("click", () => {
                        allChatButtons.forEach(btn => btn.click());
                        updateReadButton(readAllButton, activeBadges.length);
                    });

                    const scrollContainer = document.querySelector(".p-scrollpanel-content");
                    scrollContainer.prepend(readAllButton);
                } else {
                    const readAllButton = document.getElementById("newReadAllButton");
                    updateReadButton(readAllButton, activeBadges.length);
                }
            }

            if (urldata !== TripsPageURL && document.getElementById("shortcutRefresh")) {
                document.getElementById("shortcutRefresh").remove();
            }

            if (window.location.href !== TripsPageURL) return;

            const activeBookButton = document.querySelector('button[aria-label="Active"].p-button.p-component.p-disabled.p-button-secondary')


            if (Settings.ShowColoredWhatsAppChats) {
                const trip_wspCont = document.querySelector(masterWspContQuery)

                if (trip_wspCont) {
                    const chatGroups = trip_wspCont.querySelectorAll(wspChatgroupsQuery);

                    if (chatGroups) {
                        chatGroups.forEach(element => {
                            const checkClass = Object.values(whatsappClasses).find(cls => element.classList.contains(cls));

                            if (checkClass) {
                                element.classList.remove(checkClass)
                            }
                        });
                    }
                }
            }

            /* LOOP - - - LOOP - - - LOOP - - - LOOP - - - LOOP - - - LOOP */

            document.querySelectorAll(cancelBtQuery).forEach(button => {
                const row = button.closest('tr[role="row"]');
                var reviewingApp = false;
                var reviewingOwn = false;

                if (row) {
                    /*
                    00 CANCEL
                    01 SEE TRIP INFO
                    02 BOOKING DATE
                    03 BOOKING STATUS
                    04 CALLED CELL
                    05 PASSENGER NAME
                    06 PASSENGER MOBILE PHONE
                    07 ASSIGN DRIVER
                    08 CAR DETAILS
                    09 PICKUP ADDRESS
                    10 INITIAL PICKUP ADDRESS
                    11 DROP OFF ADDRESS
                    12 INITIAL DROP ADDRESS
                    13 CREATED BY
                    14 TRIP ACCEPTED TIME
                    15 CONFIRM ARRIVED TIME
                    16 TRIP STARTED TIME
                    17 VEHICLE TYPE
                    18 PAYMENT MODE
                    19 SPECIAL PAYMENTS (ZELLE)
                    20 CASH PAYMENT AMOUNT $
                    21 WALLET PAYMENT AMOUNT $
                    22 PASSENGER DISCOUNT TOTAL
                    23 PASSENGER DISCOUNT DRIVER APPLY CHECK
                    24 LOCATION RULE TOTAL
                    25 LOCATION RULE TYPE
                    26 LOCATION RULE DRIVER APPLY CHECK
                    27 TRIP COST $
                    28 PASSENGER TRANSACTION COST $
                    29 FARE ESTIMATE $
                    30 +PASSENGER $
                    31 +STOP $
                    32 +OTHER TRIP $
                    33 PREMIUM SERVICES (?)
                    34 FARE ESTIMATE DISTANCE (mi)
                    35 CUSTOM TRIP COST CHECK
                    36 BOOK LATER CHECK
                    37 GUEST CHECK
                    38 PENALTY $
                    39 GUEST VOUCHER VALUE $
                    40 SELECTED DRIVER
                    41 IS DROP ADDRESS EDITED CHECK
                    42 DROP ADDRESS EDITED BY
                    43 APPROVED BY (XX)
                    */
                    const cells = row.querySelectorAll('td[role="cell"]');
                    const raw1 = cells[2]?.textContent.trim(); // "MM/DD/YYYY, 2:02:00 PM"
                    const bookingDate = raw1?.split(',')[0].trim()           // "3/12/2026"
                    const bookingHour = raw1?.split(',')[1].trim()           // "2:02:00 PM"
                    var tripBookedT = bookingHour.trim().replace(/^\[\d+m\]\s*/, '');
                    var tripPhonenum = cells[6]?.querySelector(`a[href^="tel:"]`);
                    tripPhonenum = formatPhoneNum(tripPhonenum.getAttribute('href'), true);
                    // 6 7
                    const driversName = cells[7]?.querySelector('span')?.textContent.trim()
                    //const carType = cells[8]?.textContent.trim()
                    //const pickupAddress = cells[9]?.querySelector('span')?.textContent.trim()
                    //const dropoffAddress = cells[11]?.querySelector('span')?.textContent.trim()
                    const tripFrom = cells[13]?.textContent.trim()
                    var tripAcceptedT = cells[14]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
                    var tripArrivedT = cells[15]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
                    //const tripStartedT = cells[16]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
                    //const paymentType = cells[18]?.textContent.trim()
                    const isBookLater = cells[36]?.querySelector(cellCheckQuery);
                    const selectedDriver = cells[40]?.querySelector('span')?.textContent.trim()

                    const tripTag = row.querySelector(arrivedText);
                    const tripStatus = tripTag.textContent;

                    lookupData1 = document.getElementById("settings_LOOKUP1").value;
                    lookupData2 = document.getElementById("settings_LOOKUP2").value;

                    // cleaning the times from NAN

                    tripBookedT = tripBookedT.replaceAll("[NaNm] ", "")
                    tripAcceptedT = tripAcceptedT.replaceAll("[NaNm] ", "")
                    tripArrivedT = tripArrivedT.replaceAll("[NaNm] ", "")

                    var dataTimeBooked = null;
                    var dataTimeAccepted = null;
                    var dataTimeArrived = null;

                    if (numBlacklist.includes(tripPhonenum)) {
                        return; // TEST PASSENGER SKIP CHECK
                    }

                    if (driverBlacklist.includes(driversName)) {
                        return; // TEST DRIVERS SKIP CHECK
                    }

                    if (nameTrips.includes(tripFrom)) {
                        if (tripFrom !== "App Passenger") {
                            //HIGHLIGHTED TRIP, ITS OURS
                            csscolour = rootStyles.getPropertyValue('--own-booking-color').trim();
                            row.classList.add("owntrip");
                            reviewingOwn = true;
                        } else {
                            //ITS AN APP TRIP :YAWN:
                            csscolour = rootStyles.getPropertyValue('--app-booking-color').trim();
                            row.classList.add("alt-owntrip");
                            reviewingApp = true;
                        }

                        //row.style.setProperty('background-color', csscolour, 'important');
                    }

                    if (row.classList.contains("whatsapp-highlight")) {
                        reviewingOwn = true;
                    }

                    if (tripTag) {
                        if (tripStatus == "ARRIVED" && reviewingOwn) {
                            firstChecker++;
                        } else if (tripStatus == "NEW" && activeBookButton) {

                            if (Settings.SoundPlayWhenNew && reviewingOwn) {
                                toPingNew = true;
                                //newtripSound.play();
                            }

                            if (Settings.SoundPlayWhenNewApp && reviewingApp) {
                                toPingNewApp = true;
                                //newAppTripSound.play();
                            }
                        }

                        if (Settings.ShowAssignDriverBeforehand && selectedDriver) {
                            var tagElement = cells[3].querySelector('span[isdrivertag="true"]');
                            if (tripStatus == "NEW" || tripStatus == "RESERVED" || tripStatus == "ACCEPTED") {
                                if (!tagElement) {
                                    var tagStyle = "selectedDriverTag";
                                    var driverID = selectedDriver.replace(/\s/g, '');

                                    const tagElement = document.createElement('span')
                                    tagElement.textContent = selectedDriver;
                                    tagElement.setAttribute("isdrivertag", "true")
                                    tagElement.setAttribute("driverid", driverID)

                                    tagElement.classList.add(tagStyle);
                                    cells[3].prepend(tagElement)

                                    const queryDuplicates = document.querySelectorAll(`span[isdrivertag="true"][driverid="${driverID}"]`)
                                    duplicateTagsUpd(queryDuplicates);

                                    if (driversName) {
                                        if (driversName == selectedDriver) {
                                            tagElement.style.border = "2px solid #41833b"
                                        } else {
                                            tagElement.style.border = "2px solid #7e2626";
                                        }
                                    }
                                } else {
                                    var driverID = selectedDriver.replace(/\s/g, '');
                                    const queryDuplicates = document.querySelectorAll(`span[isdrivertag="true"][driverid="${driverID}"]`)
                                    var actionTaken = duplicateTagsUpd(queryDuplicates);

                                    if (!actionTaken && tagElement.classList.contains("selectedDriverTagDupe")) {
                                        tagElement.classList.remove("selectedDriverTagDupe");
                                        tagElement.classList.add("selectedDriverTag");
                                    }

                                    if (driversName !== "--") {
                                        if (driversName == selectedDriver) {
                                            tagElement.style.border = "2px solid #26aa1a"
                                        } else {
                                            tagElement.style.border = "2px solid #af0b0b";
                                        }
                                    }
                                }
                            }
                        }


                        if (reviewingApp && tripStatus == "NEW") {
                            statistics[1]++;
                        } else if (!reviewingApp && tripStatus == "NEW") {
                            statistics[0]++;
                        }

                        statistics[2] += tripStatus == "ACCEPTED" ? 1 : 0;
                        statistics[3] += tripStatus == "ARRIVED" ? 1 : 0;
                        statistics[4] += tripStatus == "STARTED" ? 1 : 0;
                        statistics[5] += tripStatus == "FINISHING" ? 1 : 0;
                        statistics[5] += tripStatus == "REACHED" ? 1 : 0;
                        statistics[5] += tripStatus == "PAID" ? 1 : 0;
                        statistics[5] += tripStatus == "REACHEDEXTRA" ? 1 : 0;

                        statistics[6] += 1;


                        if ( //what is ts braa  
                            (tripStatus == "NEW" && reviewingApp && stats_NewAppTrips_toggled) ||
                            (tripStatus == "NEW" && !reviewingApp && stats_NewTrips_toggled) ||
                            (tripStatus == "ACCEPTED" && stats_AccTrips_toggled) ||
                            (tripStatus == "ARRIVED" && stats_ArrTrips_toggled) ||
                            (tripStatus == "STARTED" && stats_StaTrips_toggled) ||
                            ((tripStatus == "FINISHING" || tripStatus == "REACHED" || tripStatus == "PAID" || tripStatus == "REACHEDEXTRA") && stats_FinTrips_toggled)
                        ) {
                            row.classList.add("filterGlow")
                        } else if (row.classList.contains("filterGlow")) {
                            row.classList.remove("filterGlow");
                        }

                    }

                    if (Settings.ShowColoredWhatsAppChats) {
                        const trip_wspCont = document.querySelector(masterWspContQuery)

                        if (trip_wspCont) {
                            const chatGroups = trip_wspCont.querySelectorAll(wspChatgroupsQuery);

                            if (chatGroups.length > 0) {
                                chatGroups.forEach(element => {
                                    var chatNumber = element.querySelector(`a[href^="tel:"]`);
                                    chatNumber = formatPhoneNum(chatNumber.getAttribute('href'), true);

                                    var debug = false;
                                    if (debug) {
                                        // trigger false match ((doesnt work nvm))
                                        chatNumber = "16315753361";
                                    }

                                    if (chatNumber == tripPhonenum && tripTag) {
                                        if (Object.keys(whatsappClasses).includes(tripStatus)) {
                                            element.classList.add(whatsappClasses[tripStatus])
                                        }

                                        if (tripStatus == "ARRIVED" && !reviewingOwn) {
                                            firstChecker++;
                                        } else if (tripStatus == "NEW" && activeBookButton && !reviewingOwn) {
                                            if (Settings.SoundPlayWhenNew) {
                                                newtripSound.play();
                                            }
                                        }

                                    }
                                });
                            }
                        }
                    }

                    if (Settings.WhatsappTagsSystem) {
                        const wspCont = document.querySelector(masterWspContQuery)

                        if (wspCont) {
                            const chatGroups = wspCont.querySelectorAll(wspChatgroupsQuery);
                            if (chatGroups) {

                                chatGroups.forEach(element => {
                                    var chatNumber = element.querySelector(`a[href^="tel:"]`);
                                    chatNumber = formatPhoneNum(chatNumber.getAttribute('href'), true);

                                    if (!(element.getAttribute("alreadyHasTags") == "true")) {
                                        element.insertAdjacentHTML("beforeend", whatsappSelectList);
                                        selectElement = element.querySelector("select");

                                        if (chatNumber in whatsappTagsNumbers) {
                                            selectElement.value = whatsappTagsNumbers[chatNumber];
                                        }

                                        selectElement.addEventListener("change", function () {
                                            whatsappTagsNumbers[chatNumber] = this.value;
                                        })

                                        selectElement.addEventListener("click", function (e) {
                                            e.stopPropagation();
                                        });

                                        element.style.flexWrap = "wrap";
                                        selectElement.style.padding = "5px";
                                        selectElement.style.borderRadius = "6px";
                                        selectElement.style.width = "100%";
                                        element.setAttribute("alreadyHasTags", "true");
                                    } else {
                                        var selectElement = element.querySelector("select");

                                        if (!selectElement.value) return;

                                        if (selectElement.value !== whatsappTagsNumbers[chatNumber]) {
                                            console.log("Select does not correspond! " + selectElement.value + " ==NOT== " + whatsappTagsNumbers[chatNumber])
                                            selectElement.value = whatsappTagsNumbers[chatNumber];
                                        }
                                    }
                                })
                            }

                        }
                    }

                    if (Settings.ShowBookingIcon) {
                        if (!(cells[3].querySelector('img[isbookingicon="true"]')) && isBookLater) {
                            const bookIcon = document.createElement('img')
                            bookIcon.setAttribute("isbookingicon", "true")
                            bookIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNy4yODggMTMuNzEzUTcgMTMuNDI1IDcgMTN0LjI4OC0uNzEyVDggMTJ0LjcxMy4yODhUOSAxM3QtLjI4OC43MTNUOCAxNHQtLjcxMi0uMjg4bTQgMFExMSAxMy40MjYgMTEgMTN0LjI4OC0uNzEyVDEyIDEydC43MTMuMjg4VDEzIDEzdC0uMjg4LjcxM1QxMiAxNHQtLjcxMi0uMjg4bTQgMFExNSAxMy40MjYgMTUgMTN0LjI4OC0uNzEyVDE2IDEydC43MTMuMjg4VDE3IDEzdC0uMjg4LjcxM1QxNiAxNHQtLjcxMi0uMjg4TTUgMjJxLS44MjUgMC0xLjQxMi0uNTg3VDMgMjBWNnEwLS44MjUuNTg4LTEuNDEyVDUgNGgxVjJoMnYyaDhWMmgydjJoMXEuODI1IDAgMS40MTMuNTg4VDIxIDZ2MTRxMCAuODI1LS41ODcgMS40MTNUMTkgMjJ6bTAtMmgxNFYxMEg1eiIvPjwvc3ZnPg==";
                            bookIcon.setAttribute("width", "24px")
                            bookIcon.setAttribute("height", "24px")

                            cells[3].prepend(bookIcon)
                        }
                    }

                    if (Settings.ShowTimeSinceAccepted) {
                        if (tripStatus == "ACCEPTED" || tripStatus == "ARRIVED") {
                            if (!(cells[14].querySelector('span[istimedtxt="true"]'))) {
                                if (tripAcceptedT !== "--") {
                                    const nyTime = getNYTime();
                                    let acceptedTimeDiff = minuteDiff(tripAcceptedT, nyTime);
                                    dataTimeAccepted = acceptedTimeDiff;

                                    if (Number.isNaN(acceptedTimeDiff)) {
                                        console.log("ERROR NAN: Accepted time: " + tripAcceptedT + " / Actual Time: " + nyTime)
                                    }

                                    const timeDiffTxt = document.createElement('span')
                                    timeDiffTxt.classList.add("timeDiffAccepted");

                                    timeDiffTxt.textContent = "[" + acceptedTimeDiff + "m] ";
                                    timeDiffTxt.setAttribute("istimedtxt", "true")

                                    cells[14].prepend(timeDiffTxt)
                                }
                            } else {
                                const nyTime = getNYTime();
                                const textGet = cells[14].querySelector('span[istimedtxt="true"]')

                                let acceptedTimeDiff = minuteDiff(tripAcceptedT, nyTime)
                                dataTimeAccepted = acceptedTimeDiff;

                                if (Number.isNaN(acceptedTimeDiff)) {
                                    console.log("ERROR NAN: Accepted time: " + tripAcceptedT + " / Actual Time: " + nyTime)
                                }

                                textGet.textContent = "[" + acceptedTimeDiff + "m] ";

                                if (Settings.AlertAfter10MinAccepted && (reviewingOwn || reviewingApp)) {
                                    if (Settings.TimeAlertsForAppTrips == false && row.classList.contains("acceptedWarn-highlight") && reviewingApp) {
                                        row.classList.remove("acceptedWarn-highlight");
                                    }

                                    if (Settings.TimeAlertsForAppTrips == false && reviewingApp) return;

                                    if (acceptedTimeDiff >= minsForAccepted && tripStatus !== "ARRIVED") {
                                        row.classList.add("acceptedWarn-highlight");

                                        if (warningsAlertCounter >= Settings.WarningSoundsInterval) {
                                            toAlertAccepted = true;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (Settings.ShowTimeSinceArrived) {
                        if (tripStatus == "ARRIVED") {
                            row.classList.remove("acceptedWarn-highlight")
                            if (!(cells[15].querySelector('span[istimedtxt="true"]'))) {
                                if (tripArrivedT !== "--") {
                                    const nyTime = getNYTime();
                                    let arrivedTimeDiff = minuteDiff(tripArrivedT, nyTime);
                                    dataTimeArrived = arrivedTimeDiff;

                                    const timeDiffTxt = document.createElement('span')
                                    timeDiffTxt.classList.add("timeDiffArrived");

                                    timeDiffTxt.textContent = "[" + arrivedTimeDiff + "m] ";
                                    timeDiffTxt.setAttribute("istimedtxt", "true")

                                    cells[15].prepend(timeDiffTxt)
                                }
                            } else {
                                const nyTime = getNYTime();
                                const textGet = cells[15].querySelector('span[istimedtxt="true"]')
                                let arrivedTimeDiff = minuteDiff(tripArrivedT, nyTime);
                                dataTimeArrived = arrivedTimeDiff;

                                textGet.textContent = "[" + arrivedTimeDiff + "m] ";

                                if (Settings.AlertAfter7MinArrived && (reviewingOwn || reviewingApp)) {
                                    if (Settings.TimeAlertsForAppTrips == false && row.classList.contains("arrivedWarn-highlight") && reviewingApp) {
                                        row.classList.remove("arrivedWarn-highlight");
                                    }

                                    if (Settings.TimeAlertsForAppTrips == false && reviewingApp) return;

                                    if (arrivedTimeDiff >= minsForArrived && !isBookLater) {
                                        row.classList.add("arrivedWarn-highlight");

                                        if (warningsAlertCounter >= Settings.WarningSoundsInterval) {
                                            toAlertArrived = true;
                                        }
                                    } else if (!(arrivedTimeDiff >= minsForArrived) && !isBookLater) {
                                        row.classList.remove("arrivedWarn-highlight");
                                    }
                                }
                            }
                        } else {
                            row.classList.remove("arrivedWarn-highlight")
                        }
                    }

                    if (Settings.ShowTimeSinceBooked) {
                        if (!(cells[3].querySelector('span[istimedtxt="true"]'))) {
                            if (tripBookedT !== "--") {
                                const nyTime = getNYTime();
                                var bookedTimeDiff = minuteDiff(tripBookedT, nyTime);
                                dataTimeBooked = bookedTimeDiff;

                                const timeDiffTxt = document.createElement('span')
                                timeDiffTxt.classList.add("timeDiffBooked");

                                timeDiffTxt.textContent = "[" + bookedTimeDiff + "m] ";
                                timeDiffTxt.setAttribute("istimedtxt", "true")

                                cells[3].prepend(timeDiffTxt)
                            }
                        } else {
                            const nyTime = getNYTime();
                            var bookedTimeDiff = minuteDiff(tripBookedT, nyTime);
                            dataTimeBooked = bookedTimeDiff;
                            const textGet = cells[3].querySelector('span[istimedtxt="true"]')

                            textGet.textContent = "[" + bookedTimeDiff + "m] ";

                            if (Settings.AlertAfter7MinArrived && (reviewingOwn || reviewingApp)) {
                                if (Settings.TimeAlertsForAppTrips == false && row.classList.contains("arrivedWarn-highlight") && reviewingApp) {
                                    row.classList.remove("arrivedWarn-highlight");
                                }

                                if (Settings.TimeAlertsForAppTrips == false && reviewingApp) return;

                                if (!isBookLater) return;

                                if (tripStatus !== "ARRIVED") return;

                                if (bookedTimeDiff >= minsForArrived && dataTimeArrived >= minsForArrived) {
                                    row.classList.add("arrivedWarn-highlight");

                                    if (warningsAlertCounter >= Settings.WarningSoundsInterval) {
                                        toAlertArrived = true;
                                    }
                                }
                            }
                        }
                    }

                    if (Settings.HighlightTodaysTrips) {
                        if (bookingDate !== today) {
                            row.classList.add("filterHide")
                        }
                    }

                    if (Settings.UseTermLookupOnSettings) {
                        if (!lookupCooldown) {
                            let setMode = 0; // 0 = no lookie / 1 = lookie for one term / 2 = lookie both terms case match
                            var isOneEmpty = false;
                            var singleString = "";
                            const lookupTextField1 = document.getElementById("settings_LOOKUP1");
                            const lookupTextField2 = document.getElementById("settings_LOOKUP2");

                            var textOnTrip = row.textContent;
                            var match = false;

                            if (lookupData1 == "DEBUG_SWITCH_PROFILE") {
                                if (SET_PROFILE == 1) {
                                    localStorage.setItem("DEBUG_PROFILE", 2)
                                    window.location.reload();
                                } else if (SET_PROFILE == 2) {
                                    localStorage.setItem("DEBUG_PROFILE", 1)
                                    window.location.reload();
                                }
                            }

                            if (lookupData1 == "DEBUG_PLAYSOUND_NEW") {
                                newtripSound.play();
                                lookupTextField1.value = "DEBUG_RESPONSE_SUCCESFUL"
                            }

                            if (!lookupData1 || lookupData1 == " ") {
                                lookupTextField1.value = "";
                                isOneEmpty = true;
                            } else {
                                setMode++;
                            }

                            if (!lookupData2 || lookupData2 == " ") {
                                lookupTextField2.value = "";
                            } else {
                                setMode++;
                            }

                            if (setMode == 0) {

                                const array = document.querySelectorAll(".lookup-highlight");

                                array.forEach(element => {
                                    element.classList.remove("lookup-highlight");
                                });
                                return;

                            } else if (setMode == 1) {

                                singleString = isOneEmpty == false ? lookupData1 : lookupData2;
                                match = textOnTrip.includes(singleString) == true ? true : false;

                            } else if (setMode == 2) {

                                if (textOnTrip.includes(lookupData1) && textOnTrip.includes(lookupData2)) {
                                    match = true;
                                }

                            }

                            if (match) {

                                if (!row.classList.contains("lookup-highlight")) {
                                    row.classList.add("lookup-highlight");
                                }

                                if (lookupAlertCounter >= Settings.LookupWarningInterval) {
                                    lookupAlertCounter = 0;
                                    toPingLookup = true;
                                }

                            } else {

                                if (row.classList.contains("lookup-highlight")) {
                                    row.classList.remove("lookup-highlight");
                                }

                            }
                        }
                    }


                }
            })



            /* OUT THE LOOP -- -- OUT THE LOOP -- -- OUT THE LOOP -- -- OUT THE LOOP   */



            if (Settings.KeepWspChatboxContent) {
                var global_wspTextbox = document.querySelector(wspTextBoxQuery);

                if (global_wspTextbox && !global_wspTextbox.getAttribute("haslistener")) {
                    global_wspTextbox.setAttribute("haslistener", "true")

                    var wspHeader = document.querySelector(wspChatHeaderQuery);

                    var wspNumber = wspHeader.querySelector("a")
                    wspNumber = formatPhoneNum(wspNumber.getAttribute("href"), true);

                    if (wspNumber in data_Wsp_TextboxContent) {
                        if (data_Wsp_TextboxContent[wspNumber] !== "") {
                            global_wspTextbox.value = data_Wsp_TextboxContent[wspNumber];

                            var temp_previousStyle = global_wspTextbox.style.border;
                            global_wspTextbox.style.border = "1px solid white";

                            setTimeout(() => {
                                global_wspTextbox.style.border = temp_previousStyle
                            }, 100);
                        }
                    }

                    global_wspTextbox.addEventListener("change", (event) => {
                        data_Wsp_TextboxContent[wspNumber] = global_wspTextbox.value;
                    })
                }
            }

            if (!document.getElementById("shortcutRefresh")) {
                var list = document.querySelectorAll(".p-button.p-component.p-button-icon-only.p-button-secondary:has(.p-button-icon.p-c.pi.pi-refresh)");

                if (list.length == 2) {
                    const refreshID = "shortcutRefresh";

                    const refreshButton = document.createElement('button');
                    refreshButton.id = refreshID;
                    refreshButton.style.background = "#000";

                    const iconImage = document.createElement('img');
                    iconImage.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04NC41MzkgMjEuNTg2YTEuNTE1IDEuNTE1IDAgMCAwLTIuMzkzLTEuMjIybC01Ljk0NCA0LjI2MWwtLjQ2OC4zMzdjLTYuNDA1LTYuMzkyLTE1LjE5Ni0xMC4zODktMjQuOTM3LTEwLjM4OWMtMTkuNTM1IDAtMzUuNDI3IDE1Ljg5NC0zNS40MjcgMzUuNDI4czE1Ljg5MyAzNS40MjggMzUuNDI3IDM1LjQyOGEzNS40MiAzNS40MiAwIDAgMCAyOS4zNzQtMTUuNjE4YTEuNzcgMS43NyAwIDAgMC0uNDc1LTIuNDYybC04Ljg2My02LjE1MWExLjkgMS45IDAgMCAwLTIuNjI4LjUxMmMtMy45MTggNS43OTItMTAuNDEgOS4yNS0xNy4zNzUgOS4yNWMtMTEuNTU4IDAtMjAuOTYyLTkuNDAyLTIwLjk2Mi0yMC45NTdzOS40MDQtMjAuOTU3IDIwLjk2Mi0yMC45NTdjNC44NzggMCA5LjM1MiAxLjY5NiAxMi45MTQgNC41bC0xLjAwMS43MmwtNS45NDggNC4yNmExLjUxMyAxLjUxMyAwIDAgMCAuMzk3IDIuNjU2bDI1LjQ0NiA4LjY2OWMuNDYxLjE2MS45NjYuMDgzIDEuMzY4LS4yMDNjLjM5OS0uMjkuNjI5LS43NDcuNjI3LTEuMjMxeiIvPjwvc3ZnPg=="
                    iconImage.setAttribute("width", "20px")
                    iconImage.setAttribute("height", "20px")

                    refreshButton.style.outlineColor = "white";

                    refreshButton.classList.add("refreshButtonClass");
                    refreshButton.style.inset = "auto 350px 30px auto"

                    document.body.append(refreshButton);
                    refreshButton.append(iconImage);
                }
            } else {
                var list = document.querySelectorAll(".p-button.p-component.p-button-icon-only.p-button-secondary:has(.p-button-icon.p-c.pi.pi-refresh)");
                var refreshButton = document.getElementById("shortcutRefresh")
                if (list.length == 2) {
                    var realRefreshButton = list[1];

                    refreshButton.addEventListener("click", () => {
                        realRefreshButton.click();
                    })

                    document.addEventListener("keydown", (e) => {
                        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'x') {
                            e.preventDefault();
                            realRefreshButton.click();
                            refreshButton.style.outline = "4px solid red";

                            setTimeout(() => {
                                refreshButton.style.outline = "2px solid white";
                            }, 500);
                        }
                    });

                    refreshButton.addEventListener("mouseenter", () => {
                        realRefreshButton.style.outline = "2px solid red";
                    })

                    refreshButton.addEventListener("mouseleave", () => {
                        realRefreshButton.style.outline = "none";
                    })
                }
            }

            // STATISTICS
            if (activeBookButton) {
                if (Settings.ShowActiveBookingStats) {
                    const actBookSpan = document.querySelector(actBookSpanQuery);
                    const parentCont = actBookSpan.parentElement;

                    if (!document.getElementById("statsNEW")) {
                        const stats_NewTrips = document.createElement("span");
                        stats_NewTrips.id = "statsNEW";

                        stats_NewTrips.textContent = "NEW: ?"
                        stats_NewTrips.classList.add("booksStatisticsCont")
                        stats_NewTrips.style.outlineColor = "#ebad28"

                        if (stats_NewTrips_toggled) {
                            stats_NewTrips.style.background = "#ebad28";
                            stats_NewTrips.style.color = "#242424";
                        } else {
                            stats_NewTrips.style.background = "none";
                        }

                        stats_NewTrips.addEventListener("click", () => {
                            if (!stats_NewTrips_toggled) {
                                stats_NewTrips.style.background = "#ebad28";
                                stats_NewTrips.style.color = "#242424";
                                stats_NewTrips_toggled = true;
                            } else {
                                stats_NewTrips.style.background = "none";
                                stats_NewTrips_toggled = false;
                            }
                        })

                        parentCont.append(stats_NewTrips);
                    }

                    if (!document.getElementById("statsNEWAPP")) {
                        const stats_NewAppTrips = document.createElement("span");
                        stats_NewAppTrips.id = "statsNEWAPP";

                        stats_NewAppTrips.textContent = "NEW APP: ?"
                        stats_NewAppTrips.classList.add("booksStatisticsCont")
                        stats_NewAppTrips.style.outlineColor = "#ebad28"

                        if (stats_NewAppTrips_toggled) {
                            stats_NewAppTrips.style.background = "#ebad28";
                            stats_NewAppTrips.style.color = "#242424";
                        } else {
                            stats_NewAppTrips.style.background = "none";
                        }

                        stats_NewAppTrips.addEventListener("click", () => {
                            if (!stats_NewAppTrips_toggled) {
                                stats_NewAppTrips.style.background = "#ebad28";
                                stats_NewAppTrips.style.color = "#242424";
                                stats_NewAppTrips_toggled = true;
                            } else {
                                stats_NewAppTrips.style.background = "none";
                                stats_NewAppTrips_toggled = false;
                            }
                        })

                        parentCont.append(stats_NewAppTrips);
                    }

                    if (!document.getElementById("statsACCEPTED")) {
                        const stats_AccTrips = document.createElement("span");
                        stats_AccTrips.id = "statsACCEPTED";

                        stats_AccTrips.textContent = "ACCEPTED: ?"
                        stats_AccTrips.classList.add("booksStatisticsCont")
                        stats_AccTrips.style.outlineColor = "#5174d4"

                        if (stats_AccTrips_toggled) {
                            stats_AccTrips.style.background = "#5174d4";
                            stats_AccTrips.style.color = "#242424";
                        } else {
                            stats_AccTrips.style.background = "none";
                        }

                        stats_AccTrips.addEventListener("click", () => {
                            if (!stats_AccTrips_toggled) {
                                stats_AccTrips.style.background = "#5174d4";
                                stats_AccTrips.style.color = "#242424";
                                stats_AccTrips_toggled = true;
                            } else {
                                stats_AccTrips.style.background = "none";
                                stats_AccTrips_toggled = false;
                            }
                        })

                        parentCont.append(stats_AccTrips);
                    }


                    if (!document.getElementById("statsARRIVED")) {
                        const stats_ArrTrips = document.createElement("span");
                        stats_ArrTrips.id = "statsARRIVED";

                        stats_ArrTrips.textContent = "ARRIVED: ?"
                        stats_ArrTrips.classList.add("booksStatisticsCont")
                        stats_ArrTrips.style.outlineColor = "#bd3d34"

                        if (stats_ArrTrips_toggled) {
                            stats_ArrTrips.style.background = "#bd3d34";
                            stats_ArrTrips.style.color = "#242424";
                        } else {
                            stats_ArrTrips.style.background = "none";
                        }

                        stats_ArrTrips.addEventListener("click", () => {
                            if (!stats_ArrTrips_toggled) {
                                stats_ArrTrips.style.background = "#bd3d34";
                                stats_ArrTrips.style.color = "#242424";
                                stats_ArrTrips_toggled = true;
                            } else {
                                stats_ArrTrips.style.background = "none";
                                stats_ArrTrips_toggled = false;
                            }
                        })

                        parentCont.append(stats_ArrTrips);
                    }


                    if (!document.getElementById("statsSTARTED")) {
                        const stats_StaTrips = document.createElement("span");
                        stats_StaTrips.id = "statsSTARTED";

                        stats_StaTrips.textContent = "STARTED: ?"
                        stats_StaTrips.classList.add("booksStatisticsCont")
                        stats_StaTrips.style.outlineColor = "#56ad3b"

                        if (stats_StaTrips_toggled) {
                            stats_StaTrips.style.background = "#56ad3b";
                            stats_StaTrips.style.color = "#242424";
                        } else {
                            stats_StaTrips.style.background = "none";
                        }

                        stats_StaTrips.addEventListener("click", () => {
                            if (!stats_StaTrips_toggled) {
                                stats_StaTrips.style.background = "#56ad3b";
                                stats_StaTrips.style.color = "#242424";
                                stats_StaTrips_toggled = true;
                            } else {
                                stats_StaTrips.style.background = "none";
                                stats_StaTrips_toggled = false;
                            }
                        })

                        parentCont.append(stats_StaTrips);
                    }


                    if (!document.getElementById("statsNEAREND")) {
                        const stats_FinTrips = document.createElement("span");
                        stats_FinTrips.id = "statsNEAREND";

                        stats_FinTrips.textContent = "FINISHING: ?"
                        stats_FinTrips.classList.add("booksStatisticsCont")
                        stats_FinTrips.style.outlineColor = "#407c2e"
                        stats_FinTrips.style.outlineStyle = "dotted";

                        if (stats_FinTrips_toggled) {
                            stats_FinTrips.style.background = "#407c2e";
                            stats_FinTrips.style.color = "#242424";
                        } else {
                            stats_FinTrips.style.background = "none";
                        }

                        stats_FinTrips.addEventListener("click", () => {
                            if (!stats_FinTrips_toggled) {
                                stats_FinTrips.style.background = "#407c2e";
                                stats_FinTrips.style.color = "#242424";
                                stats_FinTrips_toggled = true;
                            } else {
                                stats_FinTrips.style.background = "none";
                                stats_FinTrips_toggled = false;
                            }
                        })

                        parentCont.append(stats_FinTrips);
                    }


                    if (!document.getElementById("statsTOTAL")) {
                        const stats_TotTrips = document.createElement("span");
                        stats_TotTrips.id = "statsTOTAL";

                        stats_TotTrips.textContent = "TOTAL: ?"
                        stats_TotTrips.classList.add("booksStatisticsCont")
                        stats_TotTrips.style.outlineColor = "#9ca0a7"
                        stats_TotTrips.style.cursor = "default";

                        parentCont.append(stats_TotTrips);
                    }
                }

                document.getElementById("statsTOTAL").textContent = "TOTAL: " + statistics[6];
                document.getElementById("statsNEW").textContent = "NEW: " + statistics[0];
                document.getElementById("statsNEWAPP").textContent = "NEW APP: " + statistics[1];
                document.getElementById("statsACCEPTED").textContent = "ACCEPTED: " + statistics[2];
                document.getElementById("statsARRIVED").textContent = "ARRIVED: " + statistics[3];
                document.getElementById("statsSTARTED").textContent = "STARTED: " + statistics[4];
                document.getElementById("statsNEAREND").textContent = "FINISHING: " + statistics[5];

                // higher difference means there's a new arrived trip
                // lower difference means an arrived trip changed/got canceled
                // equal values means no difference, trips are the same

                if (firstChecker > arrivedTrips && Settings.SoundPlayWhenArrived) {
                    arrivedSound.play();

                    if (!tabFocused) {
                        if (Settings.NotificationWhenArrived) {
                            notifyMe(warningIcon, "NubeLi", "Nuevo viaje en arrived (" + firstChecker + " viajes)");
                        }
                    }
                }

                if (firstChecker < arrivedTrips && Settings.SoundPlayWhenArrived) {
                    startedSound.play();
                }

                if (firstChecker !== arrivedTrips) {
                    arrivedTrips = firstChecker;
                    firstChecker = 0;
                }

                if (toPingNew) {
                    newtripSound.play();
                }

                if (toPingNewApp) {
                    newAppTripSound.play();
                }

                if (toPingLookup) {
                    lookupAlertSound.play();
                }
            }

            if (lookupCooldown) {
                lookupCooldown = false;
            }

            if (Settings.CheckForAppTripsDefault == false) {
                const removeApps = document.querySelectorAll(".alt-owntrip");

                removeApps.forEach(element => {
                    element.classList.remove("alt-owntrip");
                });
            }

            if (Settings.HighlightTodaysTrips == false) {
                const removeHighlights = document.querySelectorAll(".filterHide");

                removeHighlights.forEach(element => {
                    element.classList.remove("filterHide");
                });
            }

            if (toAlertArrived || toAlertAccepted) {
                warningsAlertCounter = 0;
                playAlertsFunction(toAlertArrived, toAlertAccepted);
            }
        }
    }

    /* TICK FUNCTION - TICK FUNCTION - TICK FUNCTION - TICK FUNCTION - TICK FUNCTION */

    // NEW CHECKER BUTTON //
    function createSettingButtons() {

        const buttonID = "openSettingsMenu";

        const settingsOpenBT = document.createElement('button');
        settingsOpenBT.id = buttonID;

        const iconImage = document.createElement('img');
        iconImage.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgNDIgNDIiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik02LjYyIDI0LjVjLjQgMS42MiAxLjA2IDMuMTMgMS45MyA0LjQ5bC0yLjQzIDIuNDRjLTEuMDkgMS4wOS0xLjA4IDEuNzQtLjEyIDIuN2wyLjM3IDIuMzdjLjk3Ljk3MSAxLjYzLjk1IDIuNy0uMTJsMi41NS0yLjU2YzEuMi42ODggMi41IDEuMjIgMy44OCAxLjU2djMuMTJjMCAxLjU1LjQ3IDIgMS44MiAyaDMuMzZjMS4zNyAwIDEuODItLjQ4IDEuODItMnYtMy4xMmMxLjM4LS4zNCAyLjY4LS44NyAzLjg4LTEuNTZsMi42MSAyLjYxOWMxLjA4IDEuMDY4IDEuNzI5IDEuMDkgMi42OTkuMTMxbDIuMzgxLTIuMzgxYy45NDktLjk0OS45Ny0xLjYwMi0uMTMxLTIuNjk5bC0yLjUtMi41YTE0LjcgMTQuNyAwIDAgMCAxLjkzOC00LjQ5aDMuMzAyYzEuMzY4IDAgMS44MTgtLjQ4IDEuODE4LTJ2LTNjMC0xLjQ4LS4zOTMtMi0xLjgxOC0yaC0zLjMwMmMtLjM0LTEuMzgtLjg3LTIuNjgtMS41NjItMy44OGwyLjM4Mi0yLjM3YzEuMDUtMS4wNSAxLjE0LTEuNy4xMy0yLjdsLTIuMzgtMi4zOGMtLjk1LS45NS0xLjYzMi0uOTQtMi43LjEzbC0yLjI2IDIuMjVBMTUgMTUgMCAwIDAgMjQuNSA2LjYyVjMuNWMwLTEuNDgtLjM5MS0yLTEuODItMmgtMy4zNmMtMS4zNSAwLTEuODIuNDktMS44MiAydjMuMTJjLTEuNjIuNC0zLjEzIDEuMDYtNC40OSAxLjkzTDEwLjc1IDYuM0M5LjY4IDUuMjMgOSA1LjIyIDguMDUgNi4xN0w1LjY3IDguNTVjLTEuMDEgMS0uOTIgMS42NS4xMyAyLjdsMi4zNyAyLjM3Yy0uNjggMS4yLTEuMjEgMi41LTEuNTUgMy44OGgtMy4zYy0xLjM1IDAtMS44Mi40OS0xLjgyIDJ2M2MwIDEuNTUuNDcgMiAxLjgyIDJ6bTguNjYtMy41YzAtMy4xNiAyLjU2LTUuNzIgNS43Mi01LjcyczUuNzIxIDIuNTYgNS43MjEgNS43MmE1LjcyIDUuNzIgMCAxIDEtMTEuNDQxIDAiLz48L3N2Zz4="
        iconImage.setAttribute("width", "20px")
        iconImage.setAttribute("height", "20px")

        settingsOpenBT.style.outlineColor = "white";
        settingsOpenBT.style.background = "black";

        settingsOpenBT.classList.add("setting-buttonbase");
        settingsOpenBT.style.inset = "auto 180px 30px auto"

        document.body.append(settingsOpenBT);
        settingsOpenBT.append(iconImage);

        const newSettingsCont = document.createElement("div");
        newSettingsCont.id = "settings_CONTAINER";
        newSettingsCont.classList.add("newsettings")

        newSettingsCont.innerHTML = `
            <span style="width: 100%; text-align: center;">NubeScript ${SCRIPT_VERSION} | Profile ${SET_PROFILE}</span>
        <span>Script Settings</span>
        <div class="ns-wrapcolumn">
            <span class="ns-row" id="settings_OPT1">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMC42NjQgMy40NzhMOCA4djdsLjc0OC4yNjdsLTEuMTI3IDIuMjU0YTIgMiAwIDAgMCAxLjE1NiAyLjc5Mmw0LjA4NCAxLjM2MWEyLjAxNSAyLjAxNSAwIDAgMCAyLjQyMS0xLjAwM2wxLjMwMy0yLjYwNmw0LjA3OSAxLjQ1N0ExIDEgMCAwIDAgMjIgMTguNTgxVjQuNDE5YTEgMSAwIDAgMC0xLjMzNi0uOTQxbS03LjE3MSAxNi4yOTlMOS40MSAxOC40MTZsMS4yMzUtMi40NzFsNC4wNDIgMS40NDR6TTQgMTVoMlY4SDRjLTEuMTAzIDAtMiAuODk3LTIgMnYzYzAgMS4xMDMuODk3IDIgMiAyIi8+PC9zdmc+
                " width="20px" height="20px">
                Ping New OWN Trips
            </span>
            
            <span class="ns-row" id="settings_OPT10">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy40NCAyLjVhMiAyIDAgMSAxIDQgMHYyLjgyNGEyIDIgMCAxIDEtNCAwem0tMTYuMDUgMTZhMiAyIDAgMCAwIDIgMmgyLjgzMWEyIDIgMCAwIDAgMC00SDkuMzlhMiAyIDAgMCAwLTIgMm0zNy4zNiAwYTIgMiAwIDAgMS0yIDJoLTIuODMyYTIgMiAwIDAgMSAwLTRoMi44MzJhMiAyIDAgMCAxIDIgMk0xMi42NzQgNS43NzVhMS45OSAxLjk5IDAgMCAwIDAgMi44MjVsMi4wMDIgMS45OTZjLjc4Mi43OCAyLjA1Ljc4IDIuODMzIDBhMS45OTMgMS45OTMgMCAwIDAgMC0yLjgyNGwtMi4wMDMtMS45OTdhMi4wMDcgMi4wMDcgMCAwIDAtMi44MzIgMG0yNi4wOTQgMi4zODdhMS45OTMgMS45OTMgMCAwIDAgMC0yLjgyNGEyLjAwNyAyLjAwNyAwIDAgMC0yLjgzMyAwbC0yLjAwMyAxLjk5NmExLjk5MyAxLjk5MyAwIDAgMCAwIDIuODI0Yy43ODMuNzggMi4wNS43OCAyLjgzMyAwek0yMy44MjIgMTguNTg5Yy03LjAzNSA2LjUxNy0xMy41OSAxMy4xOS0xNi4zMDIgMTUuOTg2Yy0uMjg0LjI5Mi0uMzIyLjY1LS4yMDYuOTE1Yy4yNC41NDYuNTA3IDEuMTAyLjc2NSAxLjU0N3MuNjA3Ljk1My45NjEgMS40MzRjLjE3NC4yMzUuNTExLjM4NC45MTIuMjg0YzMuNzgtLjk0MiAxMi44MzktMy4yNjEgMjIuMDA3LTYuMDcyYy0uNjQtMS41MjYtMS43ODMtMy45NDgtMy43NDQtNy4zMzVjLTEuODkzLTMuMjY5LTMuMzg3LTUuNDMtNC4zOTMtNi43Nk0yOSA5LjE1MmwtLjc3NC43MXphMiAyIDAgMCAwLTMuMjQzIDIuMjg3QzE3LjAyIDE5LjE2MiA3Ljk1NSAyOC4zOCA0LjY0OCAzMS43ODljLTEuMzMzIDEuMzc2LTEuODEzIDMuNDUyLS45OTYgNS4zMTFjLjI2OC42MDguNjAyIDEuMzE0Ljk2NSAxLjk0MmMuMzY0LjYyNi44MSAxLjI2OCAxLjIwNSAxLjgwM2MxLjIwNCAxLjYzMyAzLjI0IDIuMjU0IDUuMDk3IDEuNzkxYy42OTktLjE3NCAxLjU4LS4zOTUgMi42MS0uNjU5bC4xNTEuNTY1Yy45NiAzLjU3MiA0LjYzOSA1LjY4MyA4LjIxIDQuNzNjMy41NzMtLjk1NSA1LjcwMy00LjYyMiA0Ljc0Mi04LjE5NmwtLjE2LS41OTljNC4xLTEuMTczIDguNS0yLjQ5OSAxMi42OS0zLjg5MmEyIDIgMCAwIDAgMy42LTEuNjdsLS45OTYuMzE2bC45OTUtLjMxN3YtLjAwMWwtLjAwMi0uMDAzbC0uMDAxLS4wMDZsLS4wMDYtLjAxNmwtLjAxNi0uMDQ4bC0uMDU0LS4xNTZxLS4wNy0uMTk3LS4yMTQtLjU2OGMtLjE5NC0uNDk0LS41LTEuMjI2LS45NTctMi4yMThjLS45MTUtMS45ODQtMi40NDEtNS4wMTQtNC45MTEtOS4yOHMtNC4zNC03LjA5Ny01LjYwNi04Ljg3OWE0MyA0MyAwIDAgMC0xLjQ0OC0xLjkzNWExOSAxOSAwIDAgMC0uNDk1LS41OTRsLS4wMzMtLjAzN2wtLjAxMi0uMDEzbC0uMDA0LS4wMDVMMjkgOS4xNTNNMjIuNjIgMzkuNTZjLTEuODY4LjUxNi0zLjYyNy45OS01LjIyIDEuNDFsLjE0My41MzRhMi43MDYgMi43MDYgMCAwIDAgMy4zMTUgMS45MDNhMi42OSAyLjY5IDAgMCAwIDEuOTExLTMuMjkzeiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+
                " width="20px" height="20px">
                Ping New APP Trips
            </span>

            <span class="ns-row" id="settings_OPT2">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNyAxOUg3VjVoMTBtMC00SDdjLTEuMTEgMC0yIC44OS0yIDJ2MThhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMi0yVjNhMiAyIDAgMCAwLTItMiIvPjwvc3ZnPg==
                " width="20px" height="20px">
                Highlight App Trips
            </span>

            <span class="ns-row" id="settings_OPT3">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIgMTJDMiA2LjQ3NyA2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTBzLTQuNDc3IDEwLTEwIDEwUzIgMTcuNTIzIDIgMTJtMTEtNWExIDEgMCAxIDAtMiAwdjMuNzY0YTMgMyAwIDAgMCAxLjY1OCAyLjY4M2wyLjg5NSAxLjQ0N2ExIDEgMCAxIDAgLjg5NC0xLjc4OGwtMi44OTQtMS40NDhhMSAxIDAgMCAxLS41NTMtLjg5NHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==
                " width="20px" height="20px">
                Time Alerts for App Trips
            </span>

            <span class="ns-row" id="settings_OPT4">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yMCAxOVY3SDR2MTJ6bTAtMTZhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJ6bS03IDE0di0yaDV2MnptLTMuNDItNEw1LjU3IDlIOC40bDMuMyAzLjNjLjM5LjM5LjM5IDEuMDMgMCAxLjQyTDguNDIgMTdINS41OXoiLz48L3N2Zz4=
                " width="20px" height="20px">
                Show Console Logs
            </span>

            <span class="ns-row" id="settings_OPT5">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0ibTEyLjU5MyAyMy4yNThsLS4wMTEuMDAybC0uMDcxLjAzNWwtLjAyLjAwNGwtLjAxNC0uMDA0bC0uMDcxLS4wMzVxLS4wMTYtLjAwNS0uMDI0LjAwNWwtLjAwNC4wMWwtLjAxNy40MjhsLjAwNS4wMmwuMDEuMDEzbC4xMDQuMDc0bC4wMTUuMDA0bC4wMTItLjAwNGwuMTA0LS4wNzRsLjAxMi0uMDE2bC4wMDQtLjAxN2wtLjAxNy0uNDI3cS0uMDA0LS4wMTYtLjAxNy0uMDE4bS4yNjUtLjExM2wtLjAxMy4wMDJsLS4xODUuMDkzbC0uMDEuMDFsLS4wMDMuMDExbC4wMTguNDNsLjAwNS4wMTJsLjAwOC4wMDdsLjIwMS4wOTNxLjAxOS4wMDUuMDI5LS4wMDhsLjAwNC0uMDE0bC0uMDM0LS42MTRxLS4wMDUtLjAxOC0uMDItLjAyMm0tLjcxNS4wMDJhLjAyLjAyIDAgMCAwLS4wMjcuMDA2bC0uMDA2LjAxNGwtLjAzNC42MTRxLjAwMS4wMTguMDE3LjAyNGwuMDE1LS4wMDJsLjIwMS0uMDkzbC4wMS0uMDA4bC4wMDQtLjAxMWwuMDE3LS40M2wtLjAwMy0uMDEybC0uMDEtLjAxeiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01IDNhMiAyIDAgMCAwLTIgMnY0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMlY1YTIgMiAwIDAgMC0yLTJ6bTAgMTBhMiAyIDAgMCAwLTIgMnY0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtNGEyIDIgMCAwIDAtMi0yeiIvPjwvZz48L3N2Zz4=
                " width="20px" height="20px">
                Toggle Auto-100 Trips
            </span>

            <span class="ns-row" id="settings_OPT6">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik03LjI4OCAxMy43MTNRNyAxMy40MjUgNyAxM3QuMjg4LS43MTJUOCAxMnQuNzEzLjI4OFQ5IDEzdC0uMjg4LjcxM1Q4IDE0dC0uNzEyLS4yODhtNCAwUTExIDEzLjQyNiAxMSAxM3QuMjg4LS43MTJUMTIgMTJ0LjcxMy4yODhUMTMgMTN0LS4yODguNzEzVDEyIDE0dC0uNzEyLS4yODhtNCAwUTE1IDEzLjQyNiAxNSAxM3QuMjg4LS43MTJUMTYgMTJ0LjcxMy4yODhUMTcgMTN0LS4yODguNzEzVDE2IDE0dC0uNzEyLS4yODhNNSAyMnEtLjgyNSAwLTEuNDEyLS41ODdUMyAyMFY2cTAtLjgyNS41ODgtMS40MTJUNSA0aDFWMmgydjJoOFYyaDJ2MmgxcS44MjUgMCAxLjQxMy41ODhUMjEgNnYxNHEwIC44MjUtLjU4NyAxLjQxM1QxOSAyMnptMC0yaDE0VjEwSDV6Ii8+PC9zdmc+
                " width="20px" height="20px">
                Hide Other-Day Trips
            </span>

            <span class="ns-row" id="settings_OPT7">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJtNSAxMWwxLjUtNC41aDExTDE5IDExbS0xLjUgNWExLjUgMS41IDAgMCAxLTEuNS0xLjVhMS41IDEuNSAwIDAgMSAxLjUtMS41YTEuNSAxLjUgMCAwIDEgMS41IDEuNWExLjUgMS41IDAgMCAxLTEuNSAxLjVtLTExIDBBMS41IDEuNSAwIDAgMSA1IDE0LjVBMS41IDEuNSAwIDAgMSA2LjUgMTNBMS41IDEuNSAwIDAgMSA4IDE0LjVBMS41IDEuNSAwIDAgMSA2LjUgMTZNMTguOTIgNmMtLjItLjU4LS43Ni0xLTEuNDItMUgxNVYzSDl2Mkg2LjVjLS42NiAwLTEuMjIuNDItMS40MiAxTDMgMTJ2OGExIDEgMCAwIDAgMSAxaDFhMSAxIDAgMCAwIDEtMXYtMWgxMnYxYTEgMSAwIDAgMCAxIDFoMWExIDEgMCAwIDAgMS0xdi04eiIvPjwvc3ZnPg==
                " width="20px" height="20px">
                Show Select Driver on Left side
            </span>

            <span class="ns-row" id="settings_OPT8">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCA0SDRhMSAxIDAgMCAwLTEgMXYxNGExIDEgMCAwIDAgMSAxaDE2YTEgMSAwIDAgMCAxLTFWNWExIDEgMCAwIDAtMS0xTTQgMmEzIDMgMCAwIDAtMyAzdjE0YTMgMyAwIDAgMCAzIDNoMTZhMyAzIDAgMCAwIDMtM1Y1YTMgMyAwIDAgMC0zLTN6bTIgNWgydjJINnptNSAwYTEgMSAwIDEgMCAwIDJoNmExIDEgMCAxIDAgMC0yem0tMyA0SDZ2Mmgyem0yIDFhMSAxIDAgMCAxIDEtMWg2YTEgMSAwIDEgMSAwIDJoLTZhMSAxIDAgMCAxLTEtMW0tMiAzSDZ2Mmgyem0yIDFhMSAxIDAgMCAxIDEtMWg2YTEgMSAwIDEgMSAwIDJoLTZhMSAxIDAgMCAxLTEtMSIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+
                " width="20px" height="20px">
                WhatsApp Chat Tags
            </span>

            <span class="ns-row" id="settings_OPT9">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTkgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0yVjVhMiAyIDAgMCAwLTItMm0wIDE2SDVWNWgxNHpNOSAxN0g3di01aDJ6bTQgMGgtMlY3aDJ6bTQgMGgtMnYtN2gyeiIvPjwvc3ZnPg==
                " width="20px" height="20px">
                Active Booking Stats
            </span>

            <span class="ns-row" id="settings_OPT11">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNjAgOTZjLTM1LjMgMC02NCAyOC43LTY0IDY0djMyMGMwIDM1LjMgMjguNyA2NCA2NCA2NGgzMjBjMzUuMyAwIDY0LTI4LjcgNjQtNjRWMjM3LjNjMC0xNy02LjctMzMuMy0xOC43LTQ1LjNMNDQ4IDExNC43Yy0xMi0xMi0yOC4zLTE4LjctNDUuMy0xOC43em0zMiA5NmMwLTE3LjcgMTQuMy0zMiAzMi0zMmgxNjBjMTcuNyAwIDMyIDE0LjMgMzIgMzJ2NjRjMCAxNy43LTE0LjMgMzItMzIgMzJIMjI0Yy0xNy43IDAtMzItMTQuMy0zMi0zMnptMTI4IDE2MGMzNS4zIDAgNjQgMjguNyA2NCA2NHMtMjguNyA2NC02NCA2NHMtNjQtMjguNy02NC02NHMyOC43LTY0IDY0LTY0Ii8+PC9zdmc+
                " width="20px" height="20px">
                Remember WhatsApp Textbox Text
            </span>
        </div>
        <div class="ns-wrapcolumn" style="width: 100%">
            <span>Lookup Info</span>
            <div class="ns-lookupfield">
                <input id="settings_LOOKUP1" placeholder="Term 1..." autocomplete="off">
                <input id="settings_LOOKUP2" placeholder="Term 2..." autocomplete="off">
            </div>
        </div>
            `;

        document.body.append(newSettingsCont)
        newSettingsCont.style.display = "none"

        // toggle isSettingsVisible
        settingsOpenBT.addEventListener("click", () => {
            if (isSettingsVisible) {
                newSettingsCont.style.display = "none"
                isSettingsVisible = false;
            } else {
                newSettingsCont.style.display = "flex"
                isSettingsVisible = true;
            }
        })

        document.getElementById("settings_LOOKUP1").addEventListener("change", () => {
            lookupCooldown = true;
        });

        var setting_OPT11 = document.getElementById("settings_OPT11");
        setting_OPT11.style.borderColor = Settings.KeepWspChatboxContent == true ? "green" : "red";

        setting_OPT11.addEventListener("click", () => {
            if (Settings.KeepWspChatboxContent) {
                Settings.KeepWspChatboxContent = false;
                setting_OPT11.style.borderColor = "red";
            } else {
                Settings.KeepWspChatboxContent = true;
                setting_OPT11.style.borderColor = "green";
            }
        })

        var setting_OPT10 = document.getElementById("settings_OPT10");
        setting_OPT10.style.borderColor = Settings.SoundPlayWhenNewApp == true ? "green" : "red";

        setting_OPT10.addEventListener("click", () => {
            if (Settings.SoundPlayWhenNewApp) {
                Settings.SoundPlayWhenNewApp = false;
                setting_OPT10.style.borderColor = "red";
            } else {
                Settings.SoundPlayWhenNewApp = true;
                setting_OPT10.style.borderColor = "green";
            }
        })

        var setting_OPT9 = document.getElementById("settings_OPT9");
        setting_OPT9.style.borderColor = Settings.ShowActiveBookingStats == true ? "green" : "red";

        setting_OPT9.addEventListener("click", () => {
            if (Settings.ShowActiveBookingStats) {
                Settings.ShowActiveBookingStats = false;
                setting_OPT9.style.borderColor = "red";

                document.getElementById("statsNEWAPP").remove();
                document.getElementById("statsNEW").remove();
                document.getElementById("statsACCEPTED").remove();
                document.getElementById("statsARRIVED").remove();
                document.getElementById("statsSTARTED").remove();
                document.getElementById("statsNEAREND").remove();
                toggleOffStatToggles();
            } else {
                Settings.ShowActiveBookingStats = true;
                setting_OPT9.style.borderColor = "green";
            }
        })

        var setting_OPT8 = document.getElementById("settings_OPT8");
        setting_OPT8.style.borderColor = Settings.WhatsappTagsSystem == true ? "green" : "red";

        setting_OPT8.addEventListener("click", () => {
            if (Settings.WhatsappTagsSystem) {
                Settings.WhatsappTagsSystem = false;
                setting_OPT8.style.borderColor = "red";

                var all = document.querySelectorAll('select[iswsptaglist="true"]')

                all.forEach(element => {
                    element.remove();
                });

                var all2 = document.querySelectorAll('[alreadyHasTags="true"]')

                all2.forEach(element => {
                    element.setAttribute("alreadyHasTags", "false");
                });

            } else {
                Settings.WhatsappTagsSystem = true;
                setting_OPT8.style.borderColor = "green";
            }
        })

        var setting_OPT7 = document.getElementById("settings_OPT7");
        setting_OPT7.style.borderColor = Settings.ShowAssignDriverBeforehand == true ? "green" : "red";

        setting_OPT7.addEventListener("click", () => {
            if (Settings.ShowAssignDriverBeforehand) {
                Settings.ShowAssignDriverBeforehand = false;
                setting_OPT7.style.borderColor = "red";

                var all = document.querySelectorAll('span[isdrivertag="true"]')

                all.forEach(element => {
                    element.remove();
                });
            } else {
                Settings.ShowAssignDriverBeforehand = true;
                setting_OPT7.style.borderColor = "green";
            }
        })

        var setting_OPT1 = document.getElementById("settings_OPT1");
        setting_OPT1.style.borderColor = Settings.SoundPlayWhenNew == true ? "green" : "red";

        setting_OPT1.addEventListener("click", () => {
            if (Settings.SoundPlayWhenNew) {
                Settings.SoundPlayWhenNew = false;
                setting_OPT1.style.borderColor = "red";
            } else {
                Settings.SoundPlayWhenNew = true;
                setting_OPT1.style.borderColor = "green";
            }
        })

        var setting_OPT2 = document.getElementById("settings_OPT2");
        setting_OPT2.style.borderColor = Settings.CheckForAppTripsDefault == true ? "green" : "red";

        setting_OPT2.addEventListener("click", () => {
            if (Settings.CheckForAppTripsDefault) {
                Settings.CheckForAppTripsDefault = false;
                nameTrips.pop();

                setting_OPT2.style.borderColor = "red";
            } else {
                Settings.CheckForAppTripsDefault = true;
                nameTrips.push("App Passenger");

                setting_OPT2.style.borderColor = "green";
            }
        })

        var setting_OPT3 = document.getElementById("settings_OPT3");
        setting_OPT3.style.borderColor = Settings.TimeAlertsForAppTrips == true ? "green" : "red";

        setting_OPT3.addEventListener("click", () => {
            if (Settings.TimeAlertsForAppTrips) {
                Settings.TimeAlertsForAppTrips = false;
                setting_OPT3.style.borderColor = "red";
            } else {
                Settings.TimeAlertsForAppTrips = true;
                setting_OPT3.style.borderColor = "green";
            }
        })

        var setting_OPT4 = document.getElementById("settings_OPT4");
        setting_OPT4.style.borderColor = Settings.ShowConsoleLogs == true ? "green" : "red";

        setting_OPT4.addEventListener("click", () => {
            if (Settings.ShowConsoleLogs) {
                console.log("NUBESCRIPT: DISABLING CONSOLE LOGS (userToggled)");
                console.log = function () { };

                Settings.ShowConsoleLogs = false;
                setting_OPT4.style.borderColor = "red";
            } else {
                console.log = originalConsoleLog;
                console.log("NUBESCRIPT: ENABLING CONSOLE LOGS (userToggled)")

                Settings.ShowConsoleLogs = true;
                setting_OPT4.style.borderColor = "green";
            }
        })

        var setting_OPT5 = document.getElementById("settings_OPT5");
        setting_OPT5.style.borderColor = Settings.Always100Trips == true ? "green" : "red";

        setting_OPT5.addEventListener("click", () => {
            if (Settings.Always100Trips) {
                Settings.Always100Trips = false;
                setting_OPT5.style.borderColor = "red";
            } else {
                Settings.Always100Trips = true;
                setting_OPT5.style.borderColor = "green";
            }
        })

        var setting_OPT6 = document.getElementById("settings_OPT6");
        setting_OPT6.style.borderColor = Settings.HighlightTodaysTrips == true ? "green" : "red";

        setting_OPT6.addEventListener("click", () => {
            if (Settings.HighlightTodaysTrips) {
                Settings.HighlightTodaysTrips = false;
                setting_OPT6.style.borderColor = "red";
            } else {
                Settings.HighlightTodaysTrips = true;
                setting_OPT6.style.borderColor = "green";
            }
        })
    }

    if (Settings.NotificationWhenArrived) {
        if (Notification.permission !== "granted") {
            const buttonID = "allowNotifsBT"

            const allowNotifsButton = document.createElement('button');
            allowNotifsButton.id = buttonID;
            allowNotifsButton.innerText = "Allow Notifs";
            allowNotifsButton.style.outlineColor = "yellow";

            allowNotifsButton.classList.add("setting-buttonbase");
            allowNotifsButton.style.inset = "auto 580px 30px auto"

            allowNotifsButton.addEventListener("click", () => {
                let promise = Notification.requestPermission();

                allowNotifsButton.remove();
            })

            document.body.append(allowNotifsButton);
        }
    }

    function updateReadButton(button, length) {
        if (length < 1) {
            button.classList.remove("newReadButton-active");
            button.classList.add("newReadButton-disabled");

            button.innerText = "No hay chats por leer"
        } else if (length >= 1) {
            button.classList.remove("newReadButton-disabled");
            button.classList.add("newReadButton-active");

            button.innerText = "Marcar chats como leidos"
        }
    }

    //RIGHT CLICK COPY FUNCTION
    if (Settings.CopyPhoneNumRightClick) {
        document.addEventListener('contextmenu', function (event) {
            const anchor = event.target.closest('a[href^="tel:"]');

            if (anchor) {
                event.preventDefault();
                var phoneNumber = anchor.getAttribute('href').replace('tel:', '');
                phoneNumber = phoneNumber.replace('+', '')

                highlightText(anchor);

                navigator.clipboard.writeText(phoneNumber).then(() => {
                    console.log('NUBESCRIPT: COPIED PHONE NUMBER [' + phoneNumber + ']');
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        }, false);
    }


    // FUNCTIONS -- FUNCTIONS -- FUNCTIONS -- FUNCTIONS -- FUNCTIONS -- FUNCTIONS -- FUNCTIONS -- FUNCTIONS

    function toggleOffStatToggles() {
        stats_NewTrips_toggled = false;
        stats_NewAppTrips_toggled = false;
        stats_AccTrips_toggled = false;
        stats_ArrTrips_toggled = false;
        stats_StaTrips_toggled = false;
        stats_FinTrips_toggled = false;
    }

    function duplicateTagsUpd(queryDuplicates) {
        if (queryDuplicates.length > 1) {
            queryDuplicates.forEach(element => {
                element.classList.remove("selectedDriverTag")
                element.classList.add("selectedDriverTagDupe")
            });
            return true;
        } else {
            return false;
        }
    }

    function getRowElement(reference) {
        var row = reference.closest(cancelBtQuery);
        if (!row) return null;

        row = row.closest('tr[role="row"]');

        return row;
    }

    function removeClasses(classToRemove) {
        const array = document.querySelectorAll("." + classToRemove)
        if (array) {
            array.forEach(element => {
                element.classList.remove(classToRemove)
            });
        }
    }

    function removeClassesObject(classesList, elementToCheck) {
        const checkClass = Object.values(classesList).find(cls => elementToCheck.classList.contains(cls));

        if (checkClass) {
            elementToCheck.classList.remove(checkClass)
        }
    }

    function getDataFromTrip(row) {

        /*
        00 CANCEL
        01 SEE TRIP INFO
        02 BOOKING DATE
        03 BOOKING STATUS
        04 CALLED CELL
        05 PASSENGER NAME
        06 PASSENGER MOBILE PHONE
        07 ASSIGN DRIVER
        08 CAR DETAILS
        09 PICKUP ADDRESS
        10 INITIAL PICKUP ADDRESS
        11 DROP OFF ADDRESS
        12 INITIAL DROP ADDRESS
        13 CREATED BY
        14 TRIP ACCEPTED TIME
        15 CONFIRM ARRIVED TIME
        16 TRIP STARTED TIME
        17 VEHICLE TYPE
        18 PAYMENT MODE
        19 SPECIAL PAYMENTS (ZELLE)
        20 CASH PAYMENT AMOUNT $
        21 WALLET PAYMENT AMOUNT $
        22 PASSENGER DISCOUNT TOTAL
        23 PASSENGER DISCOUNT DRIVER APPLY CHECK
        24 LOCATION RULE TOTAL
        25 LOCATION RULE TYPE
        26 LOCATION RULE DRIVER APPLY CHECK
        27 TRIP COST $
        28 PASSENGER TRANSACTION COST $
        29 FARE ESTIMATE $
        30 +PASSENGER $
        31 +STOP $
        32 +OTHER TRIP $
        33 PREMIUM SERVICES (?)
        34 FARE ESTIMATE DISTANCE (mi)
        35 CUSTOM TRIP COST CHECK
        36 BOOK LATER CHECK
        37 GUEST CHECK
        38 PENALTY $
        39 GUEST VOUCHER VALUE $
        40 SELECTED DRIVER
        41 IS DROP ADDRESS EDITED CHECK
        42 DROP ADDRESS EDITED BY
        43 APPROVED BY (XX)
        */

        const cells = row.querySelectorAll('td[role="cell"]');
        const raw1 = cells[2]?.textContent.trim(); // "MM/DD/YYYY, 2:02:00 PM"


        var bookingDate = raw1?.split(',')[0].trim()           // "3/12/2026"
        var bookingHour = raw1?.split(',')[1].trim()           // "2:02:00 PM"
        var tripBookedT = bookingHour.trim().replace(/^\[\d+m\]\s*/, '');
        var tripPhonenum = cells[6]?.querySelector(`a[href^="tel:"]`);
        tripPhonenum = formatPhoneNum(tripPhonenum.getAttribute('href'), true);
        var driversName = cells[7]?.querySelector('span')?.textContent.trim()
        var carType = cells[8]?.textContent.trim()
        var pickupAddress = cells[9]?.querySelector('span')?.textContent.trim()
        var dropoffAddress = cells[11]?.querySelector('span')?.textContent.trim()
        var tripFrom = cells[13]?.textContent.trim()
        var tripAcceptedT = cells[14]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
        var tripArrivedT = cells[15]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
        var tripStartedT = cells[16]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
        var paymentType = cells[18]?.textContent.trim()
        var isBookLater = cells[36]?.querySelector(cellCheckQuery);
        var selectedDriver = cells[40]?.querySelector('span')?.textContent.trim()

        const tripTag = row.querySelector(arrivedText);
        const tripStatus = tripTag.textContent;

        const dataObject = {
            "bookingDate": bookingDate,
            "bookingHour": bookingHour,
            "phoneNumber": tripPhonenum,
            "activeDriver": driversName,
            "carType": carType,
            "pickupAddress": pickupAddress,
            "dropoffAddress": dropoffAddress,
            "tripCreator": tripFrom,
            "tripBookedT": tripBookedT,
            "tripAcceptedT": tripAcceptedT,
            "tripArrivedT": tripArrivedT,
            "tripStartedT": tripStartedT,
            "paymentType": paymentType,
            "isBookLater": isBookLater,
            "selectedDriver": selectedDriver,
            "tripTagObject": tripTag,
            "tripStatus": tripStatus
        }

        return dataObject;
    }

    function playAlertsFunction(arr, acc) {
        if (arr) {
            arrivedAlertSound.play();
        }

        if (acc) {
            if (!arr) {
                acceptedAlertSound.play();
                return;
            }

            setTimeout(() => {
                acceptedAlertSound.play();
            }, "800");
        }
    }

    function highlightText(element) {
        element.classList.add('cust_phonecopy');

        setTimeout(() => {
            element.classList.remove('cust_phonecopy');
        }, 300);
    }

    function formatPhoneNum(number, plus) {
        var formatted = number.replace('tel:', '');
        if (plus) {
            formatted = formatted.replace('+', '');
        }

        return formatted;
    }

    function notifyMe(icon, title, text) {
        let promise = Notification.requestPermission();

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {

            const notification = new Notification(title, {
                body: text,
                icon: icon
            });

        }
    }

    function minuteDiff(time1, time2) {
        const toSeconds = (t) => {
            const [time, modifier] = t.trim().split(' ');
            let [hours, minutes, seconds = 0] = time.split(':').map(Number);
            if (modifier === 'PM' && hours !== 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            return hours * 3600 + minutes * 60 + seconds;
        };

        let diffSeconds = toSeconds(time2) - toSeconds(time1);

        // handle midnight rollover so a 11:55PM -> 12:05AM diff isn't ~23h50m
        if (diffSeconds > 12 * 3600) diffSeconds -= 24 * 3600;
        if (diffSeconds < -12 * 3600) diffSeconds += 24 * 3600;

        return Math.floor(diffSeconds / 60); // no Math.abs — keeps the sign
    }

    function OLDminuteDiff(time1, time2) {
        const toSeconds = (t) => {
            const [time, modifier] = t.trim().split(' ');
            let [hours, minutes, seconds = 0] = time.split(':').map(Number);
            if (modifier === 'PM' && hours !== 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            return hours * 3600 + minutes * 60 + seconds;
        };

        return Math.floor(Math.abs(toSeconds(time2) - toSeconds(time1)) / 60);
    }

    function getNYTime() {
        return new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
})();

/*
4.45b
[features]
- textbox memory: whenever you write text on a whatsapp chat if it gets closed the textbox will recover its previous text


4.43
[fixes]
- fixed a probable performance issue with the new / newapp ping sounds as they overlapped and played multiple times on a loop

[debug]
- added a debug way to switch profiles with lookup


4.42
[tweaks]
- changed refresh keybind AGAIN to Ctr + Alt + X

4.41
[tweaks]
- made refresh button get removed if it can't get the og refresh button for clean-ness
- changed keybind to refresh button from Alt + X to Ctrl + X because ALT triggers navigation

4.4
[features]
- selected driver now shows green/red if selected driver matches
- added a new statistic that shows total active bookings number
- new shortcut to refresh bookings (also triggers with Alt + X)
- can now toggle the NEW ping separately from one's trips and app trips

[tweaks]
- made the statistic highlight style more unique and noticeable

[fixes]
- when statistics reappear and they were toggled to highlight before it will now adjust visually automatically

4.3
[features]
- added highlighting trips with booking statistics

4.23
[fixes]
- fixed some functions like select driver and booking icon not working because of a new cell on trips

[tweaks]
- changed the book later icon
- test driver or developer trips are ignored now
- cleaned up some extra variables and unused leftover code from old versions

4.21
[features]
- script now updates and loads automatically from github

[rewrites]
- lightly rewrote the selected driver tag system to fix various issues

[fixes]
- fixed whatsapp classes not including "FINISHING" trips
- fixed read all button not counting chats which have a double digit unread message count
- fixed toggling Active Stats Booking button on settings not removing NEW APP stat
- fixed driver tags not removing if you disable them in the Settings Menu
- fixed whatsapp tag lists not removing if you disable them in the Settings Menu

[tweaks]
- always 100 trips now checks every 500ms, to decrease chance of interrupting workflow
- reverted selected driver tags to highlight if it finds duplicates independently if the trips are NEW or not

4.2
[features]
- selected drivers tag now highlight when NEW trips have a repeated selected driver
- site tab name changes depending on current open page for easier multi-tab managing
- open-chat coloring: when opening a whatsapp chat, if the trip exists the outline will color based on the trip status
- statistics now count NEW app trips and dispatcher trips separately
- newly coded read all chats button which reads only unread chats, works faster and doesnt send unnecessary requests to server

[rewrites]
- rewrote the whatsapp chat highlighting system for optimization and compatiblity with open-chat coloring

[tweaks]
- tick function should fully ignore Test Passenger trips now
- on bookings, booked time and both arrived time must be more than 7 minutes for the arrived warning to enable

[fixes]
- fixed the statistics running under every loop tick instead of every singular tick
- fixed 7-min arrived warning highlights not removing from trips if the trip's addresses had been modified

4.12
[heavily important and critically hard change]
- fixed url dashboard-beta -> dashboard

4.11
[rewrites]
- accepted/arrived warnings system rewritten for optimization, now uses one singular counter and plays the alerts after a full-trips check up, not for each checked trip

[tweaks]
- arrived alerts on book laters now function based on booking time, for accuracy

4.1
[bugfixes]
- fixed bug where the arrived/started sound would play if entering and exiting a whatsapp chat with arrived status


4.0
[bugfixes]
- fixed elapsed times in trips from showing NaN
- fixed bug where lookup doesnt update properly in between ticks if typing fast (added cooldown)
- fixed on whatsapp colours which colours got stuck on a chat and didnt remove (until dom update) if trip already closed 
- app trips and hide other day trips now UPDATE PROPERLY if you disable them 
- trips on book later tab dont ping anymore
- ping sounds now dont trigger if changing tabs or trip data dissapears

[features]
- added new colors for whatsapp chats: new, reached/paid
- added lookup function
- highlighted whatsapp chats now can ping sounds as if it was your trip (NEW, ARRIVED, ACCEPTED)
- trips that have a phone number that match a chat you have open, now ping as if it was your trip
- book laters now show an icon to indicate they're a booking

[rewrites]
- refactored whatsapp tags system
- refactored whatsapp coloring, more optimized




3.5
- separated by profiles
- selected driver now appears on leftmost Booking Status column
- refactored selected driver logic, now shows when trip is NEW/RESERVED or ACCEPTED
- added timestamp on Booking Status column that tracks time since trip was booked (if its future time it will show NEGATIVE time)
- double trips now show driver name on the left


3.4
- optimized open whatsapp trip highlight check


3.3
- selected driver's name now shows up under passenger name when trip is NEW
- added the Whatsapp Tags System, you can now tag chats with a specific category for ordering


3.2
- tripChecker now checks every trip (rewrite)
- hide other-day trips now works for every trip
- timestamps now show on every trip
- assigned driver now merges with selected driver for accesibility
- whatsapp chats now highlight to the state of the trip



3.1
- can now toggle if app trips are included in time alerts
- notification when arrived settings now works
- added new settings menu
- new setting options
- optimized some code and variable-settings to work properly
- added option to hide trips that aren't for today (only works for selected/highlighted trips)



3.0
- highlight loop now only checks when page is dashboard
- refactored highlight system
- added accepted time and arrived time passed to highlighted trips
- added warning and highlight for trips higher than 10 mins in accepted
- added warning and highlight for trips higher than 7 mins in arrived
- cleaned up lots of code


2.0
- cleaned up and refactored settings
- feature: desktop notification for arrived trips when unfocused
- feature: automatically set dashboard trips to 100
- internal: added notification function

1.35
- special ping new trip sound for app trips

1.34
- changed started trip sound

1.33
-feature: whatsapp highlight trip corresponding to open chat
-tweak: small performance optimizations and tweaks

1.22
-feature: ringing for NEW trips
-feature: alt behaviour for App Passenger trips
-feature: button to toggle NEW trips ping function
-feature: button for toggling checking for app passengers

-known bug: cant remove class when untoggling checkforapptrips, it has to refresh

1.21
-feature: play a sound when a trip starts

-fix: fixed error loop when rows have no trip status tag
-fix: rows in incidents reports with your name not highlighting
*/
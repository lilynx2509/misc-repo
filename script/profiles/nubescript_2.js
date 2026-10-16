// ==UserScript==
// @name         NubeScript2
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

    const global_SCRIPT_VERSION = 1.1
    var global_USER_PROFILE = 1
    var global_SETTINGS_SOURCE = "Settings: Script"

    /* SAVE DATA */
    if (!localStorage.getItem("DEBUG_PROFILE")) {
        localStorage.setItem("DEBUG_PROFILE", global_USER_PROFILE);
    } else if (localStorage.getItem("DEBUG_PROFILE")) {
        global_USER_PROFILE = localStorage.getItem("DEBUG_PROFILE");
    }

    global_USER_PROFILE--;

    var Settings = {

        HighlightTripsFrom: [
            [
                "Samuel Martinez",
            ],

            [
                "Santiago Martinez",
            ]
        ],

        HighlightAppTrips: [true, false],
        HideOtherDayTrips: [true, false],
        DriverTagOnLeftSide: [true, true],
        UseRefreshShortcut: [true, true],
        TopBookingStats: [true, true],
        AlwaysShow100Trips: [true, true],
        ShowUserDetails: [true, true],

        PingNewTrips: [true, true],
        PingNewAppTrips: [true, true],
        PingArrivedTrips: [true, true],
        PingStartedTrips: [true, true],

        PingTimeIntervals: [1, 1], // SECONDS

        SoundPingNew: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0215%20-%20More%20Menu%20Stuff.mp3",
            "https://audio.jukehost.co.uk/IwFHTvemIJJtQIuqvvSTbKAgMO0rTFWI",
        ],
        SoundPingNew_Volume: [0.1, 0.1],

        SoundPingNewApp: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0896%20-%20Surprise%20Box%20&%20Ten-Yeti%20-%20Miss.mp3",
            "https://audio.jukehost.co.uk/IwFHTvemIJJtQIuqvvSTbKAgMO0rTFWI",
        ],
        SoundPingNewApp_Volume: [0.1, 0.1],

        SoundPingArrived: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0210%20-%20Menu%20Selection.mp3",
            "https://audio.jukehost.co.uk/C8K9PT6sjG7G7VRYv0mWyhV0LhEQQVxt",
        ],
        SoundPingArrived_Volume: [0.4, 0.1],

        SoundPingStarted: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0213%20-%20Unknown%20Menu%20Sound.mp3",
            "https://audio.jukehost.co.uk/6ZUIedUF2GUwmECTn18c1Llj4AzkF0jn",
        ],
        SoundPingStarted_Volume: [0.3, 0.1],

        ElapsedTimeAccepted: [true, true],
        ElapsedTimeArrived: [true, true],
        ElapsedTimeBooked: [true, true],
        FreezeElapsedTimes: [false, false],

        AlertAcceptedTime: [true, true],
        AlertAcceptedTime_Value: [10, 10], // MINUTES
        SoundAlertAccepted: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0222%20-%20Almost%20Like%20You%20Failed%20To%20Select.mp3",
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0222%20-%20Almost%20Like%20You%20Failed%20To%20Select.mp3",
        ],
        SoundAlertAccepted_Volume: [0.4, 0.4],

        AlertArrivedTime: [true, true],
        AlertArrivedTime_Value: [7, 7], // MINUTES
        SoundAlertArrived: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0107%20-%20Getting%20An%20Item.mp3",
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/0107%20-%20Getting%20An%20Item.mp3",
        ],
        SoundAlertArrived_Volume: [0.4, 0.4],

        AlertsForAppTrips: [false, false],
        AlertsSoundsInterval: [60, 60], // SECONDS

        WspTagsSystem: [true, true],
        WspHighlightTrip: [true, true], //unchangeable
        WspRememberTextbox: [true, true],

        WspArrivedSound: [true, true],
        WspSoundPingArrived: [
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/1069%20-%20Happy%20Sound.mp3",
            "https://cdn.jsdelivr.net/gh/AetherLynx/misc-repo@main/1069%20-%20Happy%20Sound.mp3",
        ],
        WspSoundPingArrived_Volume: [0.1, 0.1],

        WspTagList: [
            [                  // tags for the whatsapp chats
                "COTIZANDO VIAJE",
                "TAXI EN CAMINO",
                "ARRIVED AVISADO",
                "DOUBLE TRIP",
                "VIAJE RESERVADO",
                "VIAJE COMENZADO",
                "CHAT DE SOPORTE",
                "MANTENER CHAT ABIERTO",
                "PENDIENTE ENVIAR SERVICIO",
                "",
            ],

            [
                "BOOK LATER",
                "DOUBLE TRIP",
                "PENDIENTE CONFIRMACION",
                "FINALIZADO",
                "REPORTE",
                "EN PROGRESO",
            ],
        ],

        // OTHER

        EnableConsoleLogs: [false, false],
        CopyNumbersRightClick: [true, true],
        ShowBookLaterIcon: [true, true],
        LegacyDarkFilter: [false, false],

        MasterLoopInterval: [200, 200],
    }

    if (localStorage.getItem("SAVED_SETTINGS")) {
        var saveVer = localStorage.getItem("SAVED_SETTINGS_VERSION");
        var savedSettings = JSON.parse(localStorage.getItem("SAVED_SETTINGS"));

        Settings = { ...Settings, ...savedSettings }
        global_SETTINGS_SOURCE = `Settings: Saved Data (v${saveVer})`


        /*
        if (saveVer == global_SCRIPT_VERSION || saveVer > global_SCRIPT_VERSION) {
            Settings = JSON.parse(retrieveSave);
            global_SETTINGS_SOURCE = `Settings: Saved Data (v${saveVer})`
        }
        */
    }

    var audio_Arrived = new Audio(Settings.SoundPingArrived[global_USER_PROFILE])
    var audio_ArrivedWsp = new Audio(Settings.WspSoundPingArrived[global_USER_PROFILE])
    var audio_Started = new Audio(Settings.SoundPingStarted[global_USER_PROFILE])
    var audio_New = new Audio(Settings.SoundPingNew[global_USER_PROFILE])
    var audio_NewApp = new Audio(Settings.SoundPingNewApp[global_USER_PROFILE])
    var audio_AlertAccept = new Audio(Settings.SoundAlertAccepted[global_USER_PROFILE])
    var audio_AlertArrived = new Audio(Settings.SoundAlertArrived[global_USER_PROFILE])

    audio_Arrived.volume = Settings.SoundPingArrived_Volume[global_USER_PROFILE]
    audio_ArrivedWsp.volume = Settings.WspSoundPingArrived_Volume[global_USER_PROFILE]
    audio_Started.volume = Settings.SoundPingStarted_Volume[global_USER_PROFILE]
    audio_New.volume = Settings.SoundPingNew_Volume[global_USER_PROFILE]
    audio_NewApp.volume = Settings.SoundPingNewApp_Volume[global_USER_PROFILE]
    audio_AlertAccept.volume = Settings.SoundAlertAccepted_Volume[global_USER_PROFILE]
    audio_AlertArrived.volume = Settings.SoundAlertArrived_Volume[global_USER_PROFILE]

    // QUERIES

    const css_root = window.getComputedStyle(document.documentElement);
    const query_WspHeader = ".flex.bg-white.align-items-center.justify-content-between.w-full.shadow-2.z-1";
    const query_WspContainer = ".chat-container";
    const query_WspTextbox = ".p-inputtextarea.p-inputtext.p-component.p-inputtextarea-resizable.emoji-input.w-full.px-5.emoji-input.w-full.px-5:enabled:focus"
    const query_WspChatTab = ".flex.align-items-center.bg-white.p-3.gap-3.border-bottom-1.surface-border.cursor-pointer.mb-1"
    const query_ButtonCancel = "button.p-button.p-component.p-button-icon-only.p-button-rounded.p-button-sm.p-button-danger"
    const query_DriverChatTab = '.flex.flex-nowrap.justify-content-between.align-items-center.border-1.surface-border.border-round.p-3.cursor-pointer.select-none.hover\\:surface-hover.transition-colors.transition-duration-150';
    const query_DriverUnreadBadge = '.p-badge.p-component.p-badge-danger:not(.p-badge-dot)';
    const query_tripTag = "span.p-tag-value";
    const query_ActiveBookSpan = "span.text-xl.text-900.font-bold.mr-3";
    const query_CellCheckSymbol = "i.pi.pi-check";

    // START DATA BLOCK
    // DATA

    var global_debugActive = false;

    var global_AlertsCounter = 0;
    var global_PingsCounter = 0;
    var global_toAlertAccepted = false
    var global_toAlertArrived = false
    var global_DriverChatTabs = null
    var global_DriverChatBadges = null
    var global_DriverUnreadChats = 0;

    var global_statsNew = [null, false] // element, isToggled
    var global_statsNewApp = [null, false]
    var global_statsAccepted = [null, false]
    var global_statsArrived = [null, false]
    var global_statsStarted = [null, false]
    var global_statsFinishing = [null, false]

    var global_wspTagsNumbers = {
        "phonenumber": "67", // number : assignedOption
    }

    var global_wspTextboxData = {
        "phonenumber": "dummy text"
    }

    const global_scriptFileUrl = 'https://raw.githubusercontent.com/lilynx2509/misc-repo/refs/heads/main/script/profiles/version.txt';
    var global_asyncScriptVer = "";

    const isHexColor = (str) => /^#?([0-9A-F]{3,4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(str);

    const global_wspClasses = {
        "ACCEPTED": "whatsappstate_accepted",
        "ARRIVED": "whatsappstate_arrived",
        "STARTED": "whatsappstate_started",
        "NEW": "whatsappstate_new",
        "RESERVED": "whatsappstate_reserved",
        "Finishing": "whatsappstate_reached_paid",
        "REACHED": "whatsappstate_reached_paid",
        "REACHEDEXTRA": "whatsappstate_reached_paid",
        "PAID": "whatsappstate_reached_paid"
    }

    var global_todayDate = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'numeric', day: 'numeric', year: 'numeric' });
    var global_ogConsoleLog = console.log;

    restoreMemoryColours();

    var css_colours = {
        global_css_colourOwn: css_root.getPropertyValue('--own-booking-color').trim(),
        global_css_colourApp: css_root.getPropertyValue('--app-booking-color').trim(),
        global_css_colourPhone: css_root.getPropertyValue('--phonenumber-base-color').trim(),
        global_css_colourPhoneCopy: css_root.getPropertyValue('--phonenumber-click-color').trim(),
        global_css_colourDuplicate: css_root.getPropertyValue('--duplicate-booking-color').trim(),
    }

    const global_URL_Dashboard = "https://nubeli-cash.firebaseapp.com/dashboard";
    const global_URL_Incidents = "https://nubeli-cash.firebaseapp.com/incidentreports";
    const global_URL_DriverChat = "https://nubeli-cash.firebaseapp.com/chat";

    const global_userLoopIgnore = [
        "431435555",
        "13158697089",
        "16968870000",
        "13158697099",
    ]

    const global_driverLoopIgnore = [
        "New Driver App",
        "Test Driver",
        "Paquita Ramirez",
        "Chris Pasajero",
    ]

    var global_busyDrivers = [
    ]

    var global_objectSelectedDrivers = {
    }

    var global_statistics = [0, 0, 0, 0, 0, 0, 0]

    var global_currentTripsTable = [] // for comparing
    var global_currentTripsTable_Dupe = []

    var global_activeTripsTable = []
    var global_activeTripsTable_Dupe = []

    var global_doubleTripsTable = []
    var global_doubleTripsTable_Dupe = []

    var global_bookLaterTable = []
    var global_bookLaterTable_Dupe = []

    const global_stats_index = {
        ACCEPTED: 2,
        ARRIVED: 3,
        STARTED: 4,
        Finishing: 5,
        REACHED: 5,
        REACHEDEXTRA: 5,
        PAID: 5,
    }

    var global_playNewPing = false;
    var global_playNewAppPing = false;
    var global_playArrivedPing = false;
    var global_playArrivedWspPing = false;
    var global_playStartedPing = false;

    var global_playAcceptedAlert = false;
    var global_playArrivedAlert = false;

    var global_driverTagClasses = [
        "driverTagAccepted",
        "driverTagIgnored",
        "driverTagDupe",
        "driverTagTaken"
    ]

    // ELEMENTS

    var global_mapElement = document.getElementById("map");

    const element_bookingIcon = document.createElement('img')
    element_bookingIcon.setAttribute("isbookingicon", "true")
    element_bookingIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNlMTFkNDgiIGQ9Ik0xOSAxOUg1VjhoMTRtLTMtN3YySDhWMUg2djJINWMtMS4xMSAwLTIgLjg5LTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNWEyIDIgMCAwIDAtMi0yaC0xVjFtLTEgMTFoLTV2NWg1eiIvPjwvc3ZnPg==";
    element_bookingIcon.setAttribute("width", "28px")
    element_bookingIcon.setAttribute("height", "28px")

    var element_debugWindow = document.createElement("div")
    element_debugWindow.id = "debugWindow"
    element_debugWindow.style.position = "fixed";
    element_debugWindow.style.top = "20px";
    element_debugWindow.style.left = "20px";
    element_debugWindow.style.padding = "12px"
    element_debugWindow.style.borderRadius = "2px"
    element_debugWindow.style.color = "white";
    element_debugWindow.style.background = "rgba(0,0,0,0.5)"
    element_debugWindow.style.zIndex = "9999"
    element_debugWindow.style.maxWidth = "1000px"

    /* REFRESH BUTTON */

    const element_buttonRefresh = document.createElement("button")
    element_buttonRefresh.id = "shortcutRefresh"
    element_buttonRefresh.classList.add("shortcutRefresh")

    const refreshIcon = document.createElement("img");
    refreshIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04NC41MzkgMjEuNTg2YTEuNTE1IDEuNTE1IDAgMCAwLTIuMzkzLTEuMjIybC01Ljk0NCA0LjI2MWwtLjQ2OC4zMzdjLTYuNDA1LTYuMzkyLTE1LjE5Ni0xMC4zODktMjQuOTM3LTEwLjM4OWMtMTkuNTM1IDAtMzUuNDI3IDE1Ljg5NC0zNS40MjcgMzUuNDI4czE1Ljg5MyAzNS40MjggMzUuNDI3IDM1LjQyOGEzNS40MiAzNS40MiAwIDAgMCAyOS4zNzQtMTUuNjE4YTEuNzcgMS43NyAwIDAgMC0uNDc1LTIuNDYybC04Ljg2My02LjE1MWExLjkgMS45IDAgMCAwLTIuNjI4LjUxMmMtMy45MTggNS43OTItMTAuNDEgOS4yNS0xNy4zNzUgOS4yNWMtMTEuNTU4IDAtMjAuOTYyLTkuNDAyLTIwLjk2Mi0yMC45NTdzOS40MDQtMjAuOTU3IDIwLjk2Mi0yMC45NTdjNC44NzggMCA5LjM1MiAxLjY5NiAxMi45MTQgNC41bC0xLjAwMS43MmwtNS45NDggNC4yNmExLjUxMyAxLjUxMyAwIDAgMCAuMzk3IDIuNjU2bDI1LjQ0NiA4LjY2OWMuNDYxLjE2MS45NjYuMDgzIDEuMzY4LS4yMDNjLjM5OS0uMjkuNjI5LS43NDcuNjI3LTEuMjMxeiIvPjwvc3ZnPg=="
    refreshIcon.setAttribute("width", "20px");
    refreshIcon.setAttribute("height", "20px");

    element_buttonRefresh.append(refreshIcon);

    var element_realRefreshButton = null;

    element_buttonRefresh.addEventListener("click", () => {
        if (element_realRefreshButton) {
            element_realRefreshButton.click();
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'x') {
            if (element_realRefreshButton) {
                e.preventDefault();
                element_realRefreshButton.click();

                element_buttonRefresh.style.outline = "4px solid red";

                setTimeout(() => {
                    element_buttonRefresh.style.outline = "2px solid white";
                }, 500);
            }
        }
    });

    /* STATISTICS ELEMENTS */

    const statElem_wrapper = document.createElement("div");
    statElem_wrapper.id = "statsWrapper";
    statElem_wrapper.classList.add("statsWrapper")

    const statElem_newTrips = document.createElement("span")
    statElem_newTrips.id = "statsNEW";
    statElem_newTrips.textContent = "New: X"
    statElem_newTrips.style.background = "#5a4007"
    statElem_newTrips.classList.add("statsBase")

    const statElem_newAppTrips = document.createElement("span")
    statElem_newAppTrips.id = "statsNEWAPP";
    statElem_newAppTrips.textContent = "App New: X"
    statElem_newAppTrips.style.background = "#5a4007"
    statElem_newAppTrips.classList.add("statsBase")

    const statElem_accTrips = document.createElement("span")
    statElem_accTrips.id = "statsACC";
    statElem_accTrips.textContent = "Accepted: X"
    statElem_accTrips.style.background = "#272658"
    statElem_accTrips.classList.add("statsBase")

    const statElem_arrTrips = document.createElement("span")
    statElem_arrTrips.id = "statsARR";
    statElem_arrTrips.textContent = "Arrived: X"
    statElem_arrTrips.style.background = "#570f0a"
    statElem_arrTrips.classList.add("statsBase")

    const statElem_staTrips = document.createElement("span")
    statElem_staTrips.id = "statsSTA";
    statElem_staTrips.textContent = "Started: X"
    statElem_staTrips.style.background = "#044d0a"
    statElem_staTrips.classList.add("statsBase")

    const statElem_finTrips = document.createElement("span")
    statElem_finTrips.id = "statsFIN";
    statElem_finTrips.textContent = "Finishing: X"
    statElem_finTrips.style.background = "#344234"
    statElem_finTrips.classList.add("statsBase")

    const statElem_totalTrips = document.createElement("span")
    statElem_totalTrips.id = "statsTOT";
    statElem_totalTrips.textContent = "Total: X"
    statElem_totalTrips.classList.add("statsBase")

    statElem_wrapper.append(statElem_newTrips);
    statElem_wrapper.append(statElem_newAppTrips);
    statElem_wrapper.append(statElem_accTrips);
    statElem_wrapper.append(statElem_arrTrips);
    statElem_wrapper.append(statElem_staTrips);
    statElem_wrapper.append(statElem_finTrips);
    statElem_wrapper.append(statElem_totalTrips);

    // settings element

    const settings_cont = document.createElement("div");
    settings_cont.classList.add("st_cont")
    settings_cont.style.display = "none"

    settings_cont.innerHTML = /*html*/`
        <span class="st_header">NubeScript 2 // v${global_SCRIPT_VERSION} // ${global_SETTINGS_SOURCE}</span>


        <div class="st_body" id="st_tab1" style="display: flex;">
            <span style="font-weight: bold;">Dashboard Bookings</span>
            <div class="st_wrapper">
                <span>Highlight Trips sent by: (mind the format)</span>
                <input class="st_input" type="text" id="HighlightTripsFrom" isJson="true">
            </div>
            <button class="st_option" id="HighlightAppTrips">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNiAySDhhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDItMlY0YTIgMiAwIDAgMC0yLTJtLTMgMTloLTJ2LTFoMnptMy0ySDhWNWg4eiIvPjwvc3ZnPg==
                " alt="">
                <div style="width: 100%">
                    <b>Highlight App Trips</b>
                    <br>
                    Changes the colour of App Passenger trips
                </div>
            </button>
            <button class="st_option" id="HideOtherDayTrips">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xNSA5aC0zYTMgMyAwIDAgMC0zIDN2M0gzYTIgMiAwIDAgMS0yLTJWN2gxNHoiLz48cGF0aCBkPSJNMTAgMTV2LTNhMiAyIDAgMCAxIDItMmgzem0yLTE0YTEgMSAwIDAgMSAxIDF2MWEyIDIgMCAwIDEgMiAydjFIMVY1YTIgMiAwIDAgMSAyLTJWMmExIDEgMCAwIDEgMiAwdjFoNlYyYTEgMSAwIDAgMSAxLTEiLz48L2c+PC9zdmc+
                " alt="">
                <div style="width: 100%">
                    <b>Obscure Other Day Bookings</b>
                    <br>
                    Darkens bookings that are for another day
                </div>
            </button>
            <button class="st_option" id="DriverTagOnLeftSide">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01LjUgN0ExLjUgMS41IDAgMCAxIDQgNS41QTEuNSAxLjUgMCAwIDEgNS41IDRBMS41IDEuNSAwIDAgMSA3IDUuNUExLjUgMS41IDAgMCAxIDUuNSA3bTE1LjkxIDQuNThsLTktOUMxMi4wNSAyLjIyIDExLjU1IDIgMTEgMkg0Yy0xLjExIDAtMiAuODktMiAydjdjMCAuNTUuMjIgMS4wNS41OSAxLjQxbDguOTkgOWMuMzcuMzYuODcuNTkgMS40Mi41OXMxLjA1LS4yMyAxLjQxLS41OWw3LTdjLjM3LS4zNi41OS0uODYuNTktMS40MWMwLS41Ni0uMjMtMS4wNi0uNTktMS40MiIvPjwvc3ZnPg==
                " alt="">
                <div style="width: 100%">
                    <b>Driver Tags on Left</b>
                    <br>
                    Shows at leftmost side a tag with the selected driver of the trip
                </div>
            </button>
            <button class="st_option" id="UseRefreshShortcut">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNC42NiAxNS42NkE4IDggMCAxIDEgMTcgMTBoLTJhNiA2IDAgMSAwLTEuNzYgNC4yNHpNMTIgMTBoOGwtNCA0eiIvPjwvc3ZnPg==
                " alt="">
                <div style="width: 100%">
                    <b>Refresh Bookings Shortcut</b>
                    <br>
                    Shortcut button to refresh bookings or use Ctrl + Alt + X
                </div>
            </button>
            <button class="st_option" id="TopBookingStats">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI1IDEwMjQiIHdpZHRoPSIxLjAwMDk3NjU2MjVlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04OTYuNDI4IDEwMjRoLTc2OHEtNTMgMC05MC41LTM3LjVULjQyOCA4OTZWMTI4cTAtNTMgMzcuNS05MC41dDkwLjUtMzcuNWg3NjhxNTMgMCA5MC41IDM3LjV0MzcuNSA5MC41djc2OHEwIDUzLTM3LjUgOTAuNXQtOTAuNSAzNy41bS01NzYtMjg4cTAtMTMtOS41LTIyLjV0LTIyLjUtOS41aC02NHEtMTMgMC0yMi41IDkuNXQtOS41IDIyLjV2MTI4cTAgMTMgOS41IDIyLjV0MjIuNSA5LjVoNjRxMTMgMCAyMi41LTkuNXQ5LjUtMjIuNXptMjU2LTI1NnEwLTEzLTkuNS0yMi41dC0yMi41LTkuNWgtNjRxLTEzIDAtMjIuNSA5LjV0LTkuNSAyMi41djM4NHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDY0cTEzIDAgMjIuNS05LjV0OS41LTIyLjV6bTI1Ni0zMjBxMC0xMy05LjUtMjIuNXQtMjIuNS05LjVoLTY0cS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXY3MDRxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWg2NHExMyAwIDIyLjUtOS41dDkuNS0yMi41eiIvPjwvc3ZnPg==
                " alt="">
                <div style="width: 100%">
                    <b>Show Booking Statistics</b>
                    <br>
                    Show number of trips on top based on their Trip Status
                </div>
            </button>
            <button class="st_option" id="AlwaysShow100Trips">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNCAxMnY3Ljg4Yy4wNC4zLS4wNi42Mi0uMjkuODNhLjk5Ni45OTYgMCAwIDEtMS40MSAwbC0yLjAxLTIuMDFhLjk5Ljk5IDAgMCAxLS4yOS0uODNWMTJoLS4wM0w0LjIxIDQuNjJhMSAxIDAgMCAxIC4xNy0xLjRjLjE5LS4xNC40LS4yMi42Mi0uMjJoMTRjLjIyIDAgLjQzLjA4LjYyLjIyYTEgMSAwIDAgMSAuMTcgMS40TDE0LjAzIDEyeiIvPjwvc3ZnPg==
                " alt="">
                <div style="width: 100%">
                    <b>Always Filter 100 Trips</b>
                    <br>
                    Automatically set to render 100 bookings
                </div>
            </button>
            <button class="st_option" id="ShowUserDetails">
                <img src="
                data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNSAxMWg3djJoLTd6bTEgNGg2djJoLTZ6bS0yLThoOHYyaC04ek00IDE5aDEwdi0xYzAtMi43NTctMi4yNDMtNS01LTVIN2MtMi43NTcgMC01IDIuMjQzLTUgNXYxem00LTdjMS45OTUgMCAzLjUtMS41MDUgMy41LTMuNVM5Ljk5NSA1IDggNVM0LjUgNi41MDUgNC41IDguNVM2LjAwNSAxMiA4IDEyIi8+PC9zdmc+
                " alt="">
                <div style="width: 100%">
                    <b>Show User Details under Passenger Name</b>
                    <br>
                    Shows a tag with the user type and payment method
                </div>
            </button>
        </div>

        <div class="st_body" id="st_tab2" style="display: none;">
            <span style="font-weight: bold;">Trip Pings (1 / 2)</span>
            <div class="st_wrapper">
                <button class="st_option" id="PingNewTrips">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTQgMjVjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYxNkgxNHoiLz48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yNCA1djNtMTEuODkyIDEuMzI4bC0xLjkyOSAyLjI5OG04LjI1NiA4LjY2MWwtMi45NTUuNTIxbS0zMy40ODMtLjUyMWwyLjk1NS41MjFtMy4zNzMtMTEuNDhsMS45MjggMi4yOThNNiA0MWgzNyIvPjwvZz48L3N2Zz4=
                    " alt="">
                    <div style="width: 100%">
                        <b>Ping New Trips</b>
                        <br>
                        Play a sound whenever an own trip is on "NEW"
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>Ping New Audio Source:</span>
                    <input class="st_input" type="text" id="SoundPingNew">

                    <span>Ping New Audio Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="SoundPingNew_Volume">
                </div>
            </div>
            <div class="st_wrapper">
                <button class="st_option" id="PingNewAppTrips">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ij48cGF0aCBkPSJNMTQgMjVjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMHYxNkgxNHoiLz48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yNCA1djNtMTEuODkyIDEuMzI4bC0xLjkyOSAyLjI5OG04LjI1NiA4LjY2MWwtMi45NTUuNTIxbS0zMy40ODMtLjUyMWwyLjk1NS41MjFtMy4zNzMtMTEuNDhsMS45MjggMi4yOThNNiA0MWgzNyIvPjwvZz48L3N2Zz4=
                    " alt="">
                    <div style="width: 100%">
                        <b>Ping New App Trips</b>
                        <br>
                        Play a sound whenever an App Passenger trip is on "NEW"
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>Ping New App Audio Source:</span>
                    <input class="st_input" type="text" id="SoundPingNewApp">

                    <span>Ping New App Audio Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="SoundPingNewApp_Volume">
                </div>
            </div>


            <div class="st_wrapper">
                <span>Ping Frequency (in seconds)</span>
                <input class="st_input" type="number" id="PingTimeIntervals">
            </div>
        </div>

        <div class="st_body" id="st_tab3" style="display: none;">
            <span style="font-weight: bold;">Trip Pings (2 / 2)</span>

            <div class="st_wrapper">
                <button class="st_option" id="PingArrivedTrips">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im0xOC40NCAxMy43OTFsLTUuNDk5LTkuNTg1YTIuMSAyLjEgMCAwIDAtMS4yNzQtLjk4YTIuMTQgMi4xNCAwIDAgMC0xLjYwNy4yMDVsLTEuMTk2LjY5NmEuMi4yIDAgMCAwLS4wNzguMDZsLS4wNjkuMDg3YS42LjYgMCAwIDAtLjE0Ny4yNzVhMjUuNCAyNS40IDAgMCAxLTEuNTg4IDMuNzgzYTYuMSA2LjEgMCAwIDEtMS43NTQgMS44OTJsLTEuNzk0IDEuNTg4YTIuMTQgMi4xNCAwIDAgMC0uNjg2IDEuMjQ0YTIuMyAyLjMgMCAwIDAgLjA1OS45OGMtLjI0Ni4xMzYtLjQ2LjMyNC0uNjI3LjU1YTIuMSAyLjEgMCAwIDAtLjM2My43NDRhMi4yIDIuMiAwIDAgMCAwIC44MzNhMi4xNCAyLjE0IDAgMCAwIC44MDYgMS4zOTdjLjIyLjE2OC40NzMuMjkuNzQzLjM1OHEuMjY0LjA3MS41MzkuMDY4cS4xNDYuMDE1LjI5NCAwYy4yNzItLjAzMy41MzMtLjEyNy43NjQtLjI3NGMuMjE2LjI0My40ODkuNDI4Ljc5NC41NGMuMjM3LjA5My40OS4xNC43NDUuMTM2cS4yMDkuMDA1LjQxMi0uMDQ5bDEuNTk3IDIuODUzYTIuMTcgMi4xNyAwIDAgMCAxLjg0MyAxLjA1OGEyLjE0IDIuMTQgMCAwIDAgMi4wMzktMS41NzhhMi4yIDIuMiAwIDAgMC0uMjA2LTEuNjA3bC0xLjE5Ni0yLjA3OHEuNDg0LS4xMDguOTgtLjExOGMxLjM5NS4wNTkgMi43ODIuMjM2IDQuMTQ2LjUzaC4zNDNsLjE1Ny0uMDdsLjE0Ny0uMDg4bDEuMDQ5LS42MDdjLjQ4Mi0uMjc5LjgzNS0uNzM3Ljk4LTEuMjc0YTIuMTQgMi4xNCAwIDAgMC0uMzUzLTEuNTY5TTYuNTUxIDE2Ljk0OGEuNjUuNjUgMCAwIDEtLjQzMSAwYS42LjYgMCAwIDEtLjMyNC0uMjc1bC0xLjQ5LTIuNjA3bC0uMDk3LS4xNjdhLjY2LjY2IDAgMCAxIC4xMzctLjgyM2wxLjEwNy0uOThsLjQxMi43MjVsMi4xMjcgMy43MjV6bTEwLjY3NC0xLjk2YS43LjcgMCAwIDEtLjMwNC40MDFsLS41NDkuMzE0bC02LjEzNi0xMC42OTRsLjU1OS0uMzIzYS42LjYgMCAwIDEgLjQ4LS4wNTlhLjYzLjYzIDAgMCAxIC4zOTIuMjk0bDUuNDk5IDkuNTc2YS42Ni42NiAwIDAgMSAuMDU5LjU0OXptLS4yNTUtNS44MjNhLjcyLjcyIDAgMCAxLS42MzctLjM2MmEuNzM1LjczNSAwIDAgMSAuMjY1LS45OGwyLjQ1LTEuNDIyYS43MjUuNzI1IDAgMCAxIC45OC4yNjVhLjczNS43MzUgMCAwIDEtLjI2NS45OGwtMi40NSAxLjQyMWEuNy43IDAgMCAxLS4zNDMuMDk4bTQuNTE4IDMuNDdoLTIuODMyYS43MzUuNzM1IDAgMSAxIDAtMS40N2gyLjgzMmEuNzM1LjczNSAwIDAgMSAwIDEuNDdtLTYuODMxLTYuOTY5YS43LjcgMCAwIDEtLjM2My0uMDk4YS43MjYuNzI2IDAgMCAxLS4yNzQtLjk4bDEuNDExLTIuNDdhLjczNi43MzYgMCAwIDEgMS4yNzQuNzM1bC0xLjQxMSAyLjQ2YS43My43MyAwIDAgMS0uNjM3LjM1MyIvPjwvc3ZnPg==
                    " alt="">
                    <div style="width: 100%">
                        <b>Ping Arrived Trips</b>
                        <br>
                        Play a sound whenever an own trip switches to ARRIVED
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>Ping Arrived Source:</span>
                    <input class="st_input" type="text" id="SoundPingArrived">

                    <span>Ping Arrived Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="SoundPingArrived_Volume">
                </div>
            </div>
            <div class="st_wrapper">
                <button class="st_option" id="PingStartedTrips">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im0xMC42IDE2LjZsNy4wNS03LjA1bC0xLjQtMS40bC01LjY1IDUuNjVsLTIuODUtMi44NWwtMS40IDEuNHpNMTIgMjJxLTIuMDc1IDAtMy45LS43ODh0LTMuMTc1LTIuMTM3VDIuNzg4IDE1LjlUMiAxMnQuNzg4LTMuOXQyLjEzNy0zLjE3NVQ4LjEgMi43ODhUMTIgMnQzLjkuNzg4dDMuMTc1IDIuMTM3VDIxLjIxMyA4LjFUMjIgMTJ0LS43ODggMy45dC0yLjEzNyAzLjE3NXQtMy4xNzUgMi4xMzhUMTIgMjIiLz48L3N2Zz4=
                    " alt="">
                    <div style="width: 100%">
                        <b>Ping Started Trips</b>
                        <br>
                        Play a sound whenever an own trip switches to STARTED
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>Ping Started Source:</span>
                    <input class="st_input" type="text" id="SoundPingStarted">

                    <span>Ping Started Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="SoundPingStarted_Volume">
                </div>
            </div>
        </div>

        <div class="st_body" id="st_tab4" style="display: none;">
            <span style="font-weight: bold;">Elapsed Times</span>

            <button class="st_option" id="ElapsedTimeBooked">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMgNWEzIDMgMCAwIDEgMy0zaDEyYTMgMyAwIDAgMSAzIDN2MTRhMyAzIDAgMCAxLTMgM0g2YTMgMyAwIDAgMS0zLTN6bTUgMHY3bDIuMjkzLTIuMjkzYTEgMSAwIDAgMSAxLjQxNCAwTDE0IDEyVjVhMSAxIDAgMCAwLTEtMUg5YTEgMSAwIDAgMC0xIDEiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==
                    " alt="">
                <div style="width: 100%">
                    <b>Show Elapsed time since Booked</b>
                    <br>
                    Shows the time since trip was booked or how much time for a book later to activate (mins)
                </div>
            </button>
            <button class="st_option" id="ElapsedTimeAccepted">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik05IDNWMWg2djJ6bTEgMTEuNzVsLTEuMS0yLjJxLS4xMjUtLjI3NS0uMzc1LS40MTNUOCAxMkgzLjA1cS4zNzUtMy4zNzUgMi45MjUtNS42ODdUMTIgNHExLjU1IDAgMi45NzUuNXQyLjY3NSAxLjQ1bDEuNC0xLjRsMS40IDEuNGwtMS40IDEuNHEuOCAxLjA1IDEuMjc1IDIuMjEzVDIwLjk1IDEyaC00LjMyNUwxNC45IDguNTVxLS4yNzUtLjU3NS0uOS0uNTc1dC0uOS41NzV6bS00LjAyNSA0LjkzOFEzLjQyNSAxNy4zNzUgMy4wNSAxNGg0LjMyNUw5LjEgMTcuNDVxLjI3NS41NzUuOS41NzV0LjktLjU3NWwzLjEtNi4ybDEuMSAyLjJxLjEyNS4yNzUuMzc1LjQxM1QxNiAxNGg0Ljk1cS0uMzc1IDMuMzc1LTIuOTI1IDUuNjg3VDEyIDIydC02LjAyNS0yLjMxMiIvPjwvc3ZnPg==
                    " alt="">
                <div style="width: 100%">
                    <b>Show Elapsed time since Accepted</b>
                    <br>
                    Shows the time since the driver accepted the trip (mins), gets removed on STARTED
                </div>
            </button>
            <button class="st_option" id="ElapsedTimeArrived">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04IDRjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDhzOC0zLjU4IDgtOHMtMy41OC04LTgtOG0xMC41IDhjMCAuNjktLjI4IDEuMzItLjczIDEuNzdsMS40MSAxLjQxYy44Mi0uODEgMS4zMi0xLjk0IDEuMzItMy4xOHMtLjUtMi4zNy0xLjMyLTMuMThsLTEuNDEgMS40MWMuNDUuNDUuNzMgMS4wOC43MyAxLjc3bTMuNSAwYzAgMS42Ni0uNjcgMy4xNi0xLjc2IDQuMjRsMS40MSAxLjQxQzIzLjEgMTYuMjEgMjQgMTQuMjEgMjQgMTJzLS45LTQuMjEtMi4zNS01LjY1bC0xLjQxIDEuNDFBNS45NCA1Ljk0IDAgMCAxIDIyIDEybS0xMC4xOSAyLjQybC0xLjM5IDEuMzlMNyAxMi4zOVY4aDJ2My42MXoiLz48L3N2Zz4=
                    " alt="">
                <div style="width: 100%">
                    <b>Show Elapsed time since Arrived</b>
                    <br>
                    Shows the time since the driver set they arrived (mins), gets removed on STARTED
                </div>
            </button>
            <button class="st_option" id="FreezeElapsedTimes" style="display: none">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMi45NTYgMTguOTU2TDkgMTVsLTMuOTU2LTMuOTU2YTEgMSAwIDAgMSAuMzE0LTEuNjI2bDUuMjYxLTIuMjU1YTEgMSAwIDAgMCAuNTM1LS41NDhsMS4yODMtMy4yMDdhMSAxIDAgMCAxIDEuNjM1LS4zMzZsNi44NTYgNi44NTZhMSAxIDAgMCAxLS4zMzYgMS42MzVsLTMuMjA3IDEuMjgzYTEgMSAwIDAgMC0uNTQ4LjUzNWwtMi4yNTUgNS4yNjFhMSAxIDAgMCAxLTEuNjI2LjMxNCIvPjxwYXRoIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Im00IDIwbDUtNW0wIDBsMy45NTYgMy45NTZhMSAxIDAgMCAwIDEuNjI2LS4zMTRsMi4yNTUtNS4yNjFhMSAxIDAgMCAxIC41NDgtLjUzNWwzLjIwNy0xLjI4M2ExIDEgMCAwIDAgLjMzNi0xLjYzNWwtNi44NTYtNi44NTZhMSAxIDAgMCAwLTEuNjM1LjMzNmwtMS4yODMgMy4yMDdhMSAxIDAgMCAxLS41MzUuNTQ4TDUuMzU4IDkuNDE4YTEgMSAwIDAgMC0uMzE0IDEuNjI2eiIvPjwvZz48L3N2Zz4=
                    " alt="">
                <div style="width: 100%">
                    <b>Keep Elapsed Time Tags on Trips</b>
                    <br>
                    Keeps the elapsed time tags for Accepted and Arrived when trip starts, calculates based on STARTED
                    time instead
                </div>
            </button>
            <button class="st_option" id="AlertsForAppTrips">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik03IDIzcS0uODI1IDAtMS40MTItLjU4N1Q1IDIxVjNxMC0uODI1LjU4OC0xLjQxMlQ3IDFoMTBxLjgyNSAwIDEuNDEzLjU4OFQxOSAzdjMuMXEuNDUuMTc1LjcyNS41NVQyMCA3LjV2MnEwIC40NzUtLjI3NS44NVQxOSAxMC45VjIxcTAgLjgyNS0uNTg3IDEuNDEzVDE3IDIzem01LjcxMy02LjI4OFExMyAxNi40MjYgMTMgMTZ0LS4yODgtLjcxMlQxMiAxNXQtLjcxMi4yODhUMTEgMTZ0LjI4OC43MTNUMTIgMTd0LjcxMy0uMjg4bTAtNFExMyAxMi40MjUgMTMgMTJWOHEwLS40MjUtLjI4OC0uNzEyVDEyIDd0LS43MTIuMjg4VDExIDh2NHEwIC40MjUuMjg4LjcxM1QxMiAxM3QuNzEzLS4yODgiLz48L3N2Zz4=
                    " alt="">
                <div style="width: 100%">
                    <b>Alert App Trips</b>
                    <br>
                    Enables time alerts for App Passenger trips
                </div>
            </button>
        </div>

        <div class="st_body" id="st_tab5" style="display: none;">
            <span style="font-weight: bold;">Time Alerts</span>

            <div class="st_wrapper">
                <button class="st_option" id="AlertArrivedTime">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTguODkzIDEuNWMtLjE4My0uMzEtLjUyLS41LS44ODctLjVzLS43MDMuMTktLjg4Ni41TC4xMzggMTMuNDk5YS45OC45OCAwIDAgMCAwIDEuMDAxYy4xOTMuMzEuNTMuNTAxLjg4Ni41MDFoMTMuOTY0Yy4zNjcgMCAuNzA0LS4xOS44NzctLjVhMS4wMyAxLjAzIDAgMCAwIC4wMS0xLjAwMkw4Ljg5MyAxLjV6bS4xMzMgMTEuNDk3SDYuOTg3di0yLjAwM2gyLjAzOXYyLjAwM3ptMC0zLjAwNEg2Ljk4N1Y1Ljk4N2gyLjAzOXY0LjAwNnoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=
                    " alt="">
                    <div style="width: 100%">
                        <b>Alert when Arrived time limits</b>
                        <br>
                        Alerts trips when they stay too long on Arrived
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>Arrived Alert Sound Source:</span>
                    <input class="st_input" type="text" id="SoundAlertArrived">

                    <span>Arrived Alert Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="SoundAlertArrived_Volume">

                    <span>Play alert after: (minutes):</span>
                    <input class="st_input" type="number" id="AlertArrivedTime_Value">
                </div>
            </div>
            <div class="st_wrapper">
                <button class="st_option" id="AlertAcceptedTime">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTguODkzIDEuNWMtLjE4My0uMzEtLjUyLS41LS44ODctLjVzLS43MDMuMTktLjg4Ni41TC4xMzggMTMuNDk5YS45OC45OCAwIDAgMCAwIDEuMDAxYy4xOTMuMzEuNTMuNTAxLjg4Ni41MDFoMTMuOTY0Yy4zNjcgMCAuNzA0LS4xOS44NzctLjVhMS4wMyAxLjAzIDAgMCAwIC4wMS0xLjAwMkw4Ljg5MyAxLjV6bS4xMzMgMTEuNDk3SDYuOTg3di0yLjAwM2gyLjAzOXYyLjAwM3ptMC0zLjAwNEg2Ljk4N1Y1Ljk4N2gyLjAzOXY0LjAwNnoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=
                    " alt="">
                    <div style="width: 100%">
                        <b>Alert when Accepted time limits</b>
                        <br>
                        Alerts trips when they stay too long on Accepted
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>Accepted Alert Sound Source:</span>
                    <input class="st_input" type="text" id="SoundAlertAccepted">

                    <span>Accepted Alert Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="SoundAlertAccepted_Volume">

                    <span>Play alert after: (minutes):</span>
                    <input class="st_input" type="number" id="AlertAcceptedTime_Value">
                </div>
            </div>
        </div>

        <div class="st_body" id="st_tab6" style="display: none;">
            <span style="font-weight: bold;">WhatsApp</span>

            <button class="st_option" id="WspRememberTextbox">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiPjxwYXRoIGQ9Ik00MCA0MEg4YTIgMiAwIDAgMS0yLTJWMTkuMTA2YTIgMiAwIDAgMSAuMzM2LTEuMTFsNi4wNy05LjEwNUEyIDIgMCAwIDEgMTQuMDcgOEg0MGEyIDIgMCAwIDEgMiAydjI4YTIgMiAwIDAgMS0yIDJNMTggMTZWOG02IDhWOG02IDhWOG02IDhWOCIvPjxwYXRoIGQ9Ik0xNSAyOGgxOHYxMkgxNXoiLz48L2c+PC9zdmc+
                    " alt="">
                <div style="width: 100%">
                    <b>Remember WhatsApp Textbox</b>
                    <br>
                    Saves what you had typed in a WhatsApp chat
                </div>
            </button>
            <div class="st_wrapper">
                <button class="st_option" id="WspTagsSystem">
                    <img src="
                        data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNzA0IDE5MmgxNjB2NzM2SDE2MFYxOTJoMTYwdjY0aDM4NHpNMjg4IDUxMmg0NDh2LTY0SDI4OHptMCAyNTZoNDQ4di02NEgyODh6bTk2LTU3NlY5NmgyNTZ2OTZ6Ii8+PC9zdmc+
                        " alt="">
                    <div style="width: 100%">
                        <b>Enable Tag Lists on Chats</b>
                        <br>
                        Allows you to tag and order chats
                    </div>
                </button>
                <span>WhatsApp Tag List: (mind the format)</span>
                <input class="st_input" type="text" id="WspTagList" isJson="true">
            </div>
            <div class="st_wrapper">
                <button class="st_option" id="WspArrivedSound">
                    <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTUuMzQxIDYuODMxYy0uODk3LTEuMzk4LS4xNDctMy4xOSAxLjM4OC0zLjYyMmMzLjI3OC0uOTIxIDcuMTAzLTEuMzk4IDguOTYzLTEuNTkzYTIuNDUzIDIuNDUzIDAgMCAxIDIuNyAyLjY4NWMtLjE4NyAxLjkxNy0uNjYgNS45NDQtMS41OTIgOS4wNDdhMi4zOTUgMi4zOTUgMCAwIDEtMy41OTEgMS4zMzZhMjQgMjQgMCAwIDEtMi4zOTctMS43NzFBMTcuMDMgMTcuMDMgMCAwIDAgNi41IDI0LjI1MWMwIDQuNzUzIDEuOTQ4IDkuMDU5IDUuMTE0IDEyLjE4NkExNy41NyAxNy41NyAwIDAgMCAyNCA0MS41YzQuODQ0IDAgOS4yMTgtMS45MzYgMTIuMzg2LTUuMDYzQzM5LjU1MiAzMy4zMSA0MS41IDI5LjAwNSA0MS41IDI0LjI1cy0xLjk0OC05LjA1OC01LjExNC0xMi4xODVhMTcuNiAxNy42IDAgMCAwLTUuNjgtMy43NTJhMi41IDIuNSAwIDEgMSAxLjg5My00LjYyOGEyMi42IDIyLjYgMCAwIDEgNy4zIDQuODIyYzQuMDcyIDQuMDIgNi42MDEgOS41OSA2LjYwMSAxNS43NDNzLTIuNTMgMTEuNzIzLTYuNjAxIDE1Ljc0NEEyMi41NyAyMi41NyAwIDAgMSAyNCA0Ni41YTIyLjU3IDIyLjU3IDAgMCAxLTE1Ljg5OS02LjUwNUM0LjAzIDM1Ljk3NCAxLjUgMzAuNDA1IDEuNSAyNC4yNWMwLTUuNzE2IDIuMTgyLTEwLjkyNyA1Ljc1Ny0xNC44NjJBMjQgMjQgMCAwIDEgNS4zNCA2LjgzbTI3LjIyIDkuMDU4Yy0uODE4LTIuMzcyLTMuNDI1LTMuMzMtNS41OTgtMi4zMDZjLTUuOTkxIDIuODI2LTExLjM0OSA2LjI4Ny0xMy42MzkgNy44M2MtMS4xMi43NTUtMS45MjcgMi4wNzUtMS43OCAzLjYwN2MuMDU0LjU2My4xNTYgMS4yNC4zNDggMS45NTZzLjQ0MSAxLjM1NC42NzYgMS44NjhjLjY0IDEuNDAxIDEuOTk4IDIuMTQgMy4zNDYgMi4yMzRxLjUwOC4wMzUgMS4xNjguMDc0QTggOCAwIDAgMCAyNSAzOGEyIDIgMCAwIDAgMC00YTQgNCAwIDAgMS0zLjc3OC0yLjY4M2MyLjk4My4wNjYgNi42NjMuMDM0IDEwLjQxOS0uMjc4YzIuMzk0LS4xOTkgNC4xNzItMi4zMzMgMy42OTUtNC43OTZjLS4yNDQtMS4yNjUtLjYyOC0yLjk4LTEuMjI4LTUuMjJzLTEuMTI1LTMuOTE2LTEuNTQ2LTUuMTM0IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=
                    " alt="">
                    <div style="width: 100%">
                        <b>Play Unique Arrived Ping for WhatsApp</b>
                        <br>
                        Plays a separate Ping sound for Arrived trips if it has the WhatsApp icon or if you have the
                        chat of said trip
                    </div>
                </button>
                <div class="st_wrapper">
                    <span>WhatsApp Arrived Ping Sound Source:</span>
                    <input class="st_input" type="text" id="WspSoundPingArrived">

                    <span>WhatsApp Arrived Ping Volume ( 0.1 - 1.0 ):</span>
                    <input class="st_input" type="number" id="WspSoundPingArrived_Volume">
                </div>
            </div>
        </div>

        <div class="st_body" id="st_tab7" style="display: none;">
            <span style="font-weight: bold;">Other Settings</span>

            <button class="st_option" id="EnableConsoleLogs">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTIxIDUuNzVWN0gzVjUuNzVBMi43NTUgMi43NTUgMCAwIDEgNS43NSAzaDEyLjVBMi43NTUgMi43NTUgMCAwIDEgMjEgNS43NU0zIDE4LjI1VjguNWgxOHY5Ljc1QTIuNzU1IDIuNzU1IDAgMCAxIDE4LjI1IDIxSDUuNzVBMi43NTUgMi43NTUgMCAwIDEgMyAxOC4yNW00Ljc4LS40N2wyLjY0NS0yLjY0NWExLjI2IDEuMjYgMCAwIDAgMC0xLjc3TDcuNzggMTAuNzJsLTEuMDYgMS4wNmwyLjQ3IDIuNDdsLTIuNDcgMi40N3pNMTIgMTcuNWg1VjE2aC01eiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+
                    " alt="">
                <div style="width: 100%">
                    <b>Enable Console Logs</b>
                    <br>
                    Recommended: Disabled for performance
                </div>
            </button>
            <button class="st_option" id="CopyNumbersRightClick">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xNyA0aC0xLjE4QTMgMyAwIDAgMCAxMyAyaC0yYTMgMyAwIDAgMC0yLjgyIDJIN2EzIDMgMCAwIDAtMyAzdjEyYTMgMyAwIDAgMCAzIDNoMTBhMyAzIDAgMCAwIDMtM1Y3YTMgMyAwIDAgMC0zLTNtLTcgMWExIDEgMCAwIDEgMS0xaDJhMSAxIDAgMCAxIDEgMXYxaC00Wm04IDE0YTEgMSAwIDAgMS0xIDFIN2ExIDEgMCAwIDEtMS0xVjdhMSAxIDAgMCAxIDEtMWgxdjFhMSAxIDAgMCAwIDEgMWg2YTEgMSAwIDAgMCAxLTFWNmgxYTEgMSAwIDAgMSAxIDFaIi8+PC9zdmc+
                    " alt="">
                <div style="width: 100%">
                    <b>Copy Phone Numbers with Right Click</b>
                </div>
            </button>
            <button class="st_option" id="ShowBookLaterIcon">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01IDZoMTR2Mkg1eiIgb3BhY2l0eT0iLjMiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTEuMjEgMjBINVYxMGgxNHY0LjM4bDItMlY2YzAtMS4xLS45LTItMi0yaC0xVjJoLTJ2Mkg4VjJINnYySDVjLTEuMTEgMC0xLjk5LjktMS45OSAyTDMgMjBhMiAyIDAgMCAwIDIgMmg4LjIxek01IDZoMTR2Mkg1em0xMS41NCAxNi41TDEzIDE4Ljk2bDEuNDEtMS40MWwyLjEyIDIuMTJsNC4yNC00LjI0bDEuNDEgMS40MXpNMTAuNDEgMTRMMTIgMTUuNTlMMTAuNTkgMTdMOSAxNS40MUw3LjQxIDE3TDYgMTUuNTlMNy41OSAxNEw2IDEyLjQxTDcuNDEgMTFMOSAxMi41OUwxMC41OSAxMUwxMiAxMi40MXoiLz48L3N2Zz4=
                    " alt="">
                <div style="width: 100%">
                    <b>Show icon when trip is Booked for Later</b>
                </div>
            </button>
            <button class="st_option" id="LegacyDarkFilter" style="display: none">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik05LjM1MyAzQzUuODQ5IDQuNDA4IDMgNy40NjMgMyAxMS40N0E5LjUzIDkuNTMgMCAwIDAgMTIuNTMgMjFjNC4wMDcgMCA3LjA2Mi0yLjg0OSA4LjQ3LTYuMzUzQzguMTcgMTcuMDY1IDguMTQgOC4xNCA5LjM1MyAzIi8+PC9zdmc+
                    " alt="">
                <div style="width: 100%">
                    <b>Apply Dark Mode Filter</b>
                </div>
            </button>

            <span>Master loop interval: (milliseconds) (min: 200)</span>
            <input class="st_input" type="number" id="MasterLoopInterval">
            <b>If value is changed, save changes and refresh the page</b>
        </div>

        <div class="st_body" id="st_tab8" style="display: none;">
            <span style="font-weight: bold;">Colours Settings</span>

            <div class="st_wrapper row spread">
                <span>Own Boooking Colour</span>
                <input class="st_input" type="color" id="global_css_colourOwn" save="DATA_CSS_COLOUROWN" cssref="--own-booking-color">
            </div>
            <div class="st_wrapper row spread">
                <span>App Boooking Colour</span>
                <input class="st_input" type="color" id="global_css_colourApp" save="DATA_CSS_COLOURAPP" cssref="--app-booking-color">
            </div>
            <div class="st_wrapper row spread">
                <span>Phone Number Colour</span>
                <input class="st_input" type="color" id="global_css_colourPhone" save="DATA_CSS_COLOURPHONE" cssref="--phonenumber-base-color">
            </div>
            <div class="st_wrapper row spread">
                <span>Phone Number Colour when Copying</span>
                <input class="st_input" type="color" id="global_css_colourPhoneCopy" save="DATA_CSS_COLOURPHONECOPY" cssref="--phonenumber-click-color">
            </div>
            <div class="st_wrapper row spread">
                <span>Duplicated Booking Colour</span>
                <input class="st_input" type="color" id="global_css_colourDuplicate" save="DATA_CSS_COLOURDUPLICATES" cssref="--duplicate-booking-color">
            </div>
        </div>

        <div class="st_tabwrapper">
            <button class="st_option st_fit" notoption id="stAction_updScript" style="display: none;">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMiAyMXEtMS44NzUgMC0zLjUxMi0uNzEydC0yLjg1LTEuOTI1dC0xLjkyNS0yLjg1VDMgMTJ0LjcxMy0zLjUxMnQxLjkyNC0yLjg1dDIuODUtMS45MjVUMTIgM3EyLjA1IDAgMy44ODguODc1VDE5IDYuMzVWNGgydjZoLTZWOGgyLjc1cS0xLjAyNS0xLjQtMi41MjUtMi4yVDEyIDVROS4wNzUgNSA3LjAzOCA3LjAzOFQ1IDEydDIuMDM4IDQuOTYzVDEyIDE5cTIuNjI1IDAgNC41ODgtMS43VDE4LjkgMTNoMi4wNXEtLjM3NSAzLjQyNS0yLjkzNyA1LjcxM1QxMiAyMW0yLjgtNC44TDExIDEyLjRWN2gydjQuNmwzLjIgMy4yeiIvPjwvc3ZnPg==
                    " alt="">
                <b>Update Script</b>
            </button>
            <button class="st_option st_fit" notoption id="stAction_saveChanges">
                <img src="
                    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiB3aWR0aD0iMC44NzVlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im00MzMuOTQxIDEyOS45NDFsLTgzLjg4Mi04My44ODJBNDggNDggMCAwIDAgMzE2LjExOCAzMkg0OEMyMS40OSAzMiAwIDUzLjQ5IDAgODB2MzUyYzAgMjYuNTEgMjEuNDkgNDggNDggNDhoMzUyYzI2LjUxIDAgNDgtMjEuNDkgNDgtNDhWMTYzLjg4MmE0OCA0OCAwIDAgMC0xNC4wNTktMzMuOTQxTTIyNCA0MTZjLTM1LjM0NiAwLTY0LTI4LjY1NC02NC02NHMyOC42NTQtNjQgNjQtNjRzNjQgMjguNjU0IDY0IDY0cy0yOC42NTQgNjQtNjQgNjRtOTYtMzA0LjUyVjIxMmMwIDYuNjI3LTUuMzczIDEyLTEyIDEySDc2Yy02LjYyNyAwLTEyLTUuMzczLTEyLTEyVjEwOGMwLTYuNjI3IDUuMzczLTEyIDEyLTEyaDIyOC41MmMzLjE4MyAwIDYuMjM1IDEuMjY0IDguNDg1IDMuNTE1bDMuNDggMy40OEExMiAxMiAwIDAgMSAzMjAgMTExLjQ4Ii8+PC9zdmc+
                    " alt="">
                <b>Save Changes</b>
            </button>
        </div>

        <div class="st_tabwrapper">
            <button class="st_tabswitcher" id="bt_switch1" ontab>1</button>
            <button class="st_tabswitcher" id="bt_switch2">2</button>
            <button class="st_tabswitcher" id="bt_switch3">3</button>
            <button class="st_tabswitcher" id="bt_switch4">4</button>
            <button class="st_tabswitcher" id="bt_switch5">5</button>
            <button class="st_tabswitcher" id="bt_switch6">6</button>
            <button class="st_tabswitcher" id="bt_switch7">7</button>
            <button class="st_tabswitcher" id="bt_switch8">8</button>
        </div>
    `

    const st_tabs = settings_cont.querySelectorAll(".st_body")
    const st_buttons = settings_cont.querySelectorAll(".st_tabswitcher")
    var currentTab = "1"
    var st_contVisible = false;

    st_buttons.forEach(element => {
        element.addEventListener("click", (event) => {
            const hideTab = document.getElementById(`st_tab${currentTab}`)
            const prevBt = document.getElementById(`bt_switch${currentTab}`)
            const clickedBt = event.currentTarget;

            if (clickedBt.textContent !== currentTab) {
                hideTab.style.display = "none"

                const showTab = document.getElementById(`st_tab${clickedBt.textContent}`)
                showTab.style.display = "flex"
                clickedBt.setAttribute("ontab", "true")
                prevBt.removeAttribute("ontab");

                currentTab = clickedBt.textContent;
            }
        })
    });

    const st_optionButtons = settings_cont.querySelectorAll(".st_option:not([notoption])")

    var st_dataButtons = []
    if (st_optionButtons.length > 0) {
        st_optionButtons.forEach(element => {
            st_dataButtons.push(element);
            const elid = element.id;
            element.classList.toggle("st_optionoff", !Settings[elid][global_USER_PROFILE]);

            element.addEventListener("click", (event) => {
                const elem = event.currentTarget;

                if (elem.classList.contains("st_optionoff")) {
                    const elid = elem.id;
                    Settings[elid][global_USER_PROFILE] = true;

                    if (elid == "EnableConsoleLogs") {
                        console.log = global_ogConsoleLog;
                        console.log("ScriptLog: Enabling console logs (Toggled in Settings Menu)")
                    }

                    elem.classList.remove("st_optionoff")
                } else {
                    const elid = elem.id;
                    Settings[elid][global_USER_PROFILE] = false;

                    if (elid == "EnableConsoleLogs") {
                        console.log("ScriptLog: Disabling console logs (Toggled in Settings Menu)")
                        console.log = function () { };
                    }

                    elem.classList.add("st_optionoff")
                }
            })
        });
    }

    const st_inputFields = settings_cont.querySelectorAll('input:not([type="color"])')

    var st_dataFields = [];
    if (st_inputFields.length > 0) {
        st_inputFields.forEach(element => {
            st_dataFields.push(element);
            const theid = element.id;
            const isJson = element.getAttribute("isJson")

            if (!isJson) {
                element.value = Settings[theid][global_USER_PROFILE]
            } else {
                element.value = JSON.stringify(Settings[theid][global_USER_PROFILE]);
            }
        });
    }

    const st_colorFields = settings_cont.querySelectorAll('input[type="color"]')

    var st_dataColors = [];
    if (st_colorFields.length > 0) {
        st_colorFields.forEach(element => {
            st_dataColors.push(element);
            if (css_colours[element.id]) {
                element.value = css_colours[element.id];
            } else {
                element.value = "#ff0000"
            }
        });
    }

    document.body.append(settings_cont)

    const settings_ButtonEnabler = document.createElement("button")
    settings_ButtonEnabler.id = "st_buttonenabler"
    settings_ButtonEnabler.classList.add("st_buttonenabler")

    const sicon = document.createElement("img");
    sicon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSI+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSI0OCIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im00NzAuMzkgMzAwbC0uNDctLjM4bC0zMS41Ni0yNC43NWExNi4xMSAxNi4xMSAwIDAgMS02LjEtMTMuMzN2LTExLjU2YTE2IDE2IDAgMCAxIDYuMTEtMTMuMjJMNDY5LjkyIDIxMmwuNDctLjM4YTI2LjY4IDI2LjY4IDAgMCAwIDUuOS0zNC4wNmwtNDIuNzEtNzMuOWExLjYgMS42IDAgMCAxLS4xMy0uMjJBMjYuODYgMjYuODYgMCAwIDAgNDAxIDkyLjE0bC0uMzUuMTNsLTM3LjEgMTQuOTNhMTUuOTQgMTUuOTQgMCAwIDEtMTQuNDctMS4yOXEtNC45Mi0zLjEtMTAtNS44NmExNS45NCAxNS45NCAwIDAgMS04LjE5LTExLjgybC01LjU5LTM5LjU5bC0uMTItLjcyQTI3LjIyIDI3LjIyIDAgMCAwIDI5OC43NiAyNmgtODUuNTJhMjYuOTIgMjYuOTIgMCAwIDAtMjYuNDUgMjIuMzlsLS4wOS41NmwtNS41NyAzOS42N2ExNiAxNiAwIDAgMS04LjEzIDExLjgyYTE3NSAxNzUgMCAwIDAtMTAgNS44MmExNS45MiAxNS45MiAwIDAgMS0xNC40MyAxLjI3bC0zNy4xMy0xNWwtLjM1LS4xNGEyNi44NyAyNi44NyAwIDAgMC0zMi40OCAxMS4zNGwtLjEzLjIybC00Mi43NyA3My45NWEyNi43MSAyNi43MSAwIDAgMCA1LjkgMzQuMWwuNDcuMzhsMzEuNTYgMjQuNzVhMTYuMTEgMTYuMTEgMCAwIDEgNi4xIDEzLjMzdjExLjU2YTE2IDE2IDAgMCAxLTYuMTEgMTMuMjJMNDIuMDggMzAwbC0uNDcuMzhhMjYuNjggMjYuNjggMCAwIDAtNS45IDM0LjA2bDQyLjcxIDczLjlhMS42IDEuNiAwIDAgMSAuMTMuMjJhMjYuODYgMjYuODYgMCAwIDAgMzIuNDUgMTEuM2wuMzUtLjEzbDM3LjA3LTE0LjkzYTE1Ljk0IDE1Ljk0IDAgMCAxIDE0LjQ3IDEuMjlxNC45MiAzLjExIDEwIDUuODZhMTUuOTQgMTUuOTQgMCAwIDEgOC4xOSAxMS44Mmw1LjU2IDM5LjU5bC4xMi43MkEyNy4yMiAyNy4yMiAwIDAgMCAyMTMuMjQgNDg2aDg1LjUyYTI2LjkyIDI2LjkyIDAgMCAwIDI2LjQ1LTIyLjM5bC4wOS0uNTZsNS41Ny0zOS42N2ExNiAxNiAwIDAgMSA4LjE4LTExLjgyYzMuNDItMS44NCA2Ljc2LTMuNzkgMTAtNS44MmExNS45MiAxNS45MiAwIDAgMSAxNC40My0xLjI3bDM3LjEzIDE0Ljk1bC4zNS4xNGEyNi44NSAyNi44NSAwIDAgMCAzMi40OC0xMS4zNGEzIDMgMCAwIDEgLjEzLS4yMmw0Mi43MS03My44OWEyNi43IDI2LjcgMCAwIDAtNS44OS0zNC4xMW0tMTM0LjQ4LTQwLjI0YTgwIDgwIDAgMSAxLTgzLjY2LTgzLjY3YTgwLjIxIDgwLjIxIDAgMCAxIDgzLjY2IDgzLjY3Ii8+PC9zdmc+"
    sicon.setAttribute("width", "20px");
    sicon.setAttribute("height", "20px");

    settings_ButtonEnabler.append(sicon);
    document.body.append(settings_ButtonEnabler)

    settings_ButtonEnabler.addEventListener("click", () => {
        if (st_contVisible) {
            settings_cont.style.display = "none";
            st_contVisible = false;
        } else {
            settings_cont.style.display = "flex";
            st_contVisible = true;
        }
    })

    const st_btSaveChanges = document.getElementById("stAction_saveChanges")

    if (st_btSaveChanges) {
        st_btSaveChanges.addEventListener("click", () => {
            console.log("ScriptLog: executing save")
            const btSaveText = st_btSaveChanges.querySelector("b");

            btSaveText.textContent = "Saving..."

            if (st_dataColors.length > 0) {
                const root = document.documentElement;
                st_dataColors.forEach(element => {
                    const cssRef = element.getAttribute("cssRef")
                    const saveRef = element.getAttribute("save")
                    const value = element.value;

                    if (cssRef && saveRef && value) {
                        root.style.setProperty(cssRef, value)
                        localStorage.setItem(saveRef, value)

                        if (!localStorage.getItem("DATA_CSS_EXISTS")) {
                            localStorage.setItem("DATA_CSS_EXISTS", true)
                        }
                    }
                });
            }

            if (st_dataFields.length > 0) {
                st_dataFields.forEach(element => {
                    const elemJson = element.getAttribute("isJson")

                    if (elemJson) {
                        var corValue = JSON.parse(element.value);
                        var elid = element.id;

                        Settings[elid][global_USER_PROFILE] = corValue;
                    } else {
                        var elid = element.id;
                        Settings[elid][global_USER_PROFILE] = element.value;
                    }
                });
            }

            audio_Arrived.volume = Settings.SoundPingArrived_Volume[global_USER_PROFILE]
            audio_ArrivedWsp.volume = Settings.WspSoundPingArrived_Volume[global_USER_PROFILE]
            audio_Started.volume = Settings.SoundPingStarted_Volume[global_USER_PROFILE]
            audio_New.volume = Settings.SoundPingNew_Volume[global_USER_PROFILE]
            audio_NewApp.volume = Settings.SoundPingNewApp_Volume[global_USER_PROFILE]
            audio_AlertAccept.volume = Settings.SoundAlertAccepted_Volume[global_USER_PROFILE]
            audio_AlertArrived.volume = Settings.SoundAlertArrived_Volume[global_USER_PROFILE]

            const stringSettings = JSON.stringify(Settings);
            localStorage.setItem("SAVED_SETTINGS", stringSettings)
            localStorage.setItem("SAVED_SETTINGS_VERSION", global_SCRIPT_VERSION)
            global_SETTINGS_SOURCE = global_SCRIPT_VERSION;


            btSaveText.textContent = "Saved Succesfully"

            setTimeout(() => {
                btSaveText.textContent = "Save Changes"
            }, 1000);
        });
    }

    // JS CSS

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = /*css*/`
    :root {
    /* vv OPTIONS vv*/

    --duplicate-booking-color: #ffe0a3;
    --own-booking-color: #edfaee;
    --app-booking-color: #e0e0e0;
    --whatsapp-tripcolour: #659a60;
    --phonenumber-base-color: #4f4c79;
    --phonenumber-click-color: #c52828;
    --lookup-highlight-tripcolour: #a426af;
    --lookup-highlight-trip-background-colour: #f8e6fa;

    /* ^^ OPTIONS ^^ */

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

.MuiSwitch-root, .MuiSwitch-root *{
    color-scheme: only light;
}

.MuiSwitch-colorPrimary {
    color: #703232 !important;
}

.MuiSwitch-colorPrimary.Mui-checked {
    color: #4f8f43 !important;
}

.MuiSwitch-colorPrimary + .MuiSwitch-track {
    background-color: #ff0000 !important;
}

.MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background-color: #04ff16 !important;
}

.st_buttonenabler {
    color-scheme: only light !important;

    box-shadow: var(--shadow1);
    position: fixed;
    z-index: 99;
    width: 50px;
    height: 45px;
    text-align: center;
    font-family: "Segoe UI";
    font-weight: bold;
    justify-content: center;
    padding: 6px;
    background: black;
    color: white;
    border-radius: 2px;
    outline: 1px solid white;
    border: none;
    transition: 0.2s all ease-in-out;
    bottom: 30px;
    left: 50px;
}

.st_buttonenabler:hover {
    cursor: pointer;
    filter: brightness(120%);
}

        .st_cont {
            position: fixed;
            display: flex;
            flex-direction: column;
            width: 600px;
            height: fit-content;
            background: #0f1d0f;
            border-radius: 4px;
            gap: 20px;

            border: 4px solid #2b6325;
            padding: 15px;
            padding-top: 70px;

            bottom: 100px;
            left: 50px;
            z-index: 9999;
        }

        .st_cont * {
            color-scheme: only light;
            color: #fff;
            box-sizing: border-box;

            font-size: 18px;
        }

        .st_body {
            color-scheme: only light;
            width: 100%;
            height: fit-content;
            border-radius: 6px;


            padding: 15px;
            box-sizing: border-box;

            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .st_header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: #2b6325;

            padding: 15px;

            font-weight: bold;
            color: #fff;
        }

        .st_option {
            width: 100%;
            background: #113b11;
            text-align: start;
            padding: 15px;

            border: 2px solid green;
            border-radius: 4px;

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }

        .st_option:hover {
            cursor: pointer;
            filter: brightness(120%);
        }

        .st_optionoff {
            background: #3b1111;
            border: 2px solid red;
        }

        .st_option img {
            width: 24px;
            aspect-ratio: 1 / 1;
        }

        .st_input:not([type="color"]) {
            width: 100%;
            background: #113b11;
            text-align: start;
            padding: 10px;

            border: 2px solid rgb(178, 211, 178);
            border-radius: 4px;

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;

            font-family: Consolas;
        }

        .st_input[type="color"] {
            height: 40px;
            width: 40px;
            border-radius: 4px;
        }

        .st_input:focus {
            outline: none;
            filter: brightness(120%);
        }

        .st_wrapper {
            padding: 12px;
            display: flex;
            flex-direction: column;
            border: 1px solid #3b583b;
            gap: 10px;
            border-radius: 6px;
        }

        .row {
            flex-direction: row;
            align-items: center;
        }

        .spread {
            justify-content: space-between;
        }

        .st_tabwrapper {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .st_tabswitcher {
            background: #113b11;
            text-align: start;
            padding: 10px;
            height: 50px;
            width: 50px;
            justify-content: center;

            border: 4px solid #74a874;
            border-radius: 4px;

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }

        .st_tabswitcher:hover {
            cursor: pointer;
            filter: brightness(120%);
            transform: scale(1.05);
        }

        .st_tabswitcher[ontab] {
            background: #74a874;
            color: black;
        }

        .st_option.st_fit {
            width: fit-content;
        }

.p-tag-warning, .p-badge-warning,
.p-tag-warning *, .p-badge-warning * {
    color-scheme: only light;
    color: #4d1414;
}

.userDetails {
    background: #2a2b30;
    border: 2px solid color-mix(in srgb, #2a2b30, black 70%);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 2px;
    color: #fff;

    display: block;
    text-align: center;
}

.statsWrapper {
    color-scheme: only light;

    width: fit-content;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 0;
    overflow: visible;
    border: 1px solid #474e5e;
    border-radius: 2px;
}

.statsBase {
    color-scheme: only light;

    background: #272a31;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 14px;
    padding-right: 14px;
    color: #fff;
}

.statsBase:hover {
    filter: brightness(115%);
    cursor: pointer;
}

.shortcutRefresh {
    color-scheme: only light !important;

    box-shadow: var(--shadow1);
    position: fixed;
    z-index: 99;
    inset: auto 200px 30px auto; /* 2nd var: lower RIGHT - higher LEFT */
    width: 50px;
    height: 45px;
    text-align: center;
    font-family: "Segoe UI";
    font-weight: bold;
    justify-content: center;
    padding: 6px;
    background: black;
    color: white;
    border-radius: 2px;
    outline: 1px solid white;
    border: none;
    transition: 0.2s all ease-in-out;
}

.shortcutRefresh:hover {
    cursor: pointer;
    filter: brightness(120%);
}

.driverTagTaken {
    background: #362424 !important;
    border: 2px solid color-mix(in srgb, #362424, white 70%) !important;
    color: #a08787 !important;
}

.driverTagDupe {
    background: #bb9349 !important;
    border: 2px solid color-mix(in srgb, #bb9349, black 70%) !important;
    color: black !important;
}

.driverTagIgnored {
    background: #500d0d !important;
    border: 2px solid color-mix(in srgb, #500d0d, black 70%) !important;
}

.driverTagAccepted {
    background: #0b642d !important;
    border: 2px solid color-mix(in srgb, #0b642d, black 70%) !important;
}

.driverTagBase {
    background: #2a2b30;
    border: 2px solid color-mix(in srgb, #2a2b30, black 70%);
    width: 100%;
    margin-left: 4px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 2px;
    align-self: center;
    color: #fff;
}

.wspSelectList {
    padding: 5px;
    border-radius: 2px;
    width: 100%;
}

.whatsappstate_new {
    outline: 4px dashed #d18f00 !important;
    border: none !important;
}

.whatsappstate_reserved {
    outline: 4px dotted #d18f00 !important;
    border: 2px solid #d18f00 !important;
    border: none !important;
}

.whatsappstate_accepted {
    outline: 4px solid #0e3997 !important;
    border: none !important;
}

.whatsappstate_arrived {
    outline: 4px dashed #c53110 !important;
    border: none !important;
}

.whatsappstate_started {
    outline: 4px solid #0ba133 !important;
    border: none !important;
}

.whatsappstate_reached_paid {
    outline: 4px dashed #165e29 !important;
    border: none !important;
}

#map {
    color-scheme: only light !important;
}


td.bg-yellow-100 {
  background-color: var(--duplicate-booking-color) !important;
}

.flex-column.fixed.overflow-hidden.z-5.md\\:w-30rem.border-round-lg.surface-100.shadow-4.chat-container:has(button.p-button.p-component.close-btn.p-button-icon-only.p-button-rounded.p-button-danger:hover) {
    outline: 4px solid black;
    opacity: 0.2;
}

.flex-column.fixed.overflow-hidden.z-5.md\\:w-30rem.border-round-lg.surface-100.shadow-4.chat-container button.p-button.p-component.close-btn.p-button-icon-only.p-button-rounded.p-button-danger {
    transform: scale(1.2);
}

.filterDark {
    filter: invert(85%) hue-rotate(180deg) brightness(100%) contrast(110%);
}

/* Aplica el filtro inverso exacto para restaurar el mapa */
html.filterDark #map {
    filter: invert(100%) hue-rotate(180deg) brightness(115%) contrast(100%) !important;
}

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

.filterHide {
    filter: brightness(50%);
}

.filterBlur {
    filter: blur(150%);
}

.flex.align-items-center.bg-white.p-3.gap-3.border-bottom-1.surface-border.cursor-pointer.mb-1 {
    outline: 2px solid gray;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px !important;
    border-radius: 12px;
}

.flex.bg-white.align-items-center.justify-content-between.w-full.shadow-2.z-1 {
    border-bottom: 2px solid gray;
    box-shadow: var(--shadow1);
}

img[isbookingicon] {
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

.acceptedWarn-highlight {
    outline: 4px dashed #4c64a7;
    box-shadow: var(--shadow1);
}

.arrivedWarn-highlight {
    outline: 4px dashed #a74f4c;
    box-shadow: var(--shadow1);
}

.whatsapp-highlight {
    outline: 6px solid var(--whatsapp-tripcolour);
    box-shadow: var(--shadow1);
}

.owntrip {
    background: var(--own-booking-color) !important;
}

.alt-owntrip {
    background: var(--app-booking-color) !important;
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

.notif-arrived {
    outline: 1px solid var(--arrived-orange);
}

.cust_phonecopy,
a.cust_phonecopy,
a[href^="tel:"].cust_phonecopy {
    color-scheme: only light;
    color: var(--phonenumber-click-color) !important;
    outline: 2px dashed var(--d-phonecopy) !important;
    background: color-mix(in srgb, var(--phonenumber-click-color), black 70%);

}

a[href^="tel:"] {
    color-scheme: only light;
    color: var(--phonenumber-base-color) !important;
    outline: 1px solid var(--darker-phonenums) !important;
    background: color-mix(in srgb, var(--phonenumber-base-color), black 70%);

    padding-left: 4px;
    padding-right: 4px;
    width: fit-content;
}

@media (prefers-color-scheme: dark) {
    a[href^="tel:"] {
        outline: 1px solid var(--phonenumber-base-color) !important;
    }
}

`;
    document.getElementsByTagName('head')[0].appendChild(style);

    // END DATA BLOCK

    if (global_debugActive) {
        document.body.prepend(element_debugWindow)
    }

    async function fetchGitHubFile() {
        try {
            const response = await fetch(global_scriptFileUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const textData = await response.text();
            global_asyncScriptVer = textData;
            global_asyncScriptVer = global_asyncScriptVer.replace("\n", "");
            global_asyncScriptVer = Number(global_asyncScriptVer);

            //window.alert(textData);
        } catch (error) {
            //window.alert('Failed to fetch the file:', error);
        }
    }

    fetchGitHubFile();

    var element_wspSelectList = /*html*/`
    <select iswsptaglist='true' name='wspChatTag'>
    `
    Settings.WspTagList[global_USER_PROFILE].forEach((element, index) => {
        let fIndex = index + 1;
        element_wspSelectList += `\n` + `<option value='${fIndex}'>${element}</option>`
    })
    element_wspSelectList += `\n` + `</select>`

    // INITIAL SETUP

    // function: toggle console logs
    if (Settings.EnableConsoleLogs[global_USER_PROFILE] == false) {
        console.log("ScriptLog: Disabling console logs (Settings)")
        console.log = function () { };
    }


    // function: 100trips
    setInterval(() => {
        if (!Settings.AlwaysShow100Trips[global_USER_PROFILE]) return;
        if (window.location.href !== global_URL_Dashboard) return;

        var dropdown = document.querySelector('[data-pc-name="dropdown"]:not(.p-dropdown-clearable)');

        if (!dropdown) return;

        const dropLabel = dropdown.querySelector(".p-dropdown-label")

        if (dropLabel && dropLabel.textContent.trim() !== "100") {
            const trigger = dropdown.querySelector('.p-dropdown-trigger');

            if (trigger) {
                trigger.click();

                setTimeout(() => {
                    const options = document.querySelectorAll('.p-dropdown-item');
                    const targetOption = Array.from(options).find(opt => opt.textContent.trim() === "100");

                    if (targetOption) {
                        targetOption.click();
                        console.log("ScriptLog: Forced dashboard trips to render 100 trips");
                    } else {
                        trigger.click();
                    }
                }, 10);
            }
        }
    }, 100);

    if (Settings.CopyNumbersRightClick[global_USER_PROFILE]) {
        document.addEventListener('contextmenu', function (event) {
            if (Settings.CopyNumbersRightClick[global_USER_PROFILE]) {
                const anchor = event.target.closest('a[href^="tel:"]');

                if (anchor) {
                    event.preventDefault();
                    var phoneNumber = anchor.getAttribute('href').replace('tel:', '');
                    phoneNumber = phoneNumber.replace('+', '')

                    highlightText(anchor);

                    navigator.clipboard.writeText(phoneNumber).then(() => {
                        console.log('ScriptLog: Copied Phone Number [' + phoneNumber + ']');
                    }).catch(err => {
                        console.error('ScriptError: Error Copying Phone Number', err);
                    });
                }
            }
        }, false);
    }

    // END OF SETUP

    /* TICK FUNCTION !!!!!!!!!!!!!!  */

    setInterval(newTickFunction, Settings.MasterLoopInterval[global_USER_PROFILE])
    function newTickFunction() {
        // OUTER LOOP

        global_toAlertAccepted = false;
        global_toAlertArrived = false;

        global_DriverChatTabs = [];
        global_DriverChatBadges = null;

        global_busyDrivers = [];
        global_objectSelectedDrivers = {};

        // new - new app - accepted - arrived - started - finishing - total
        global_statistics = [0, 0, 0, 0, 0, 0, 0]

        const loop_urlData = window.location.href;
        switch (loop_urlData) {
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
                if (global_DriverUnreadChats >= 1) {
                    document.title = `(${global_DriverUnreadChats}) Drivers Chat`
                } else {
                    document.title = `Drivers Chat`
                }
                break;
            case "https://nubeli-cash.firebaseapp.com/wallethistory":
                document.title = "Wallet History"
                break;
            default:
                document.title = "NubeLi"
                break;
        }

        // READ ALL DRIVER CHATS BUTTON

        if (loop_urlData == global_URL_DriverChat) {
            global_DriverChatBadges = document.querySelectorAll(query_DriverUnreadBadge);

            if (global_DriverChatBadges) {
                global_DriverUnreadChats = global_DriverChatBadges.length;
            }

            if (global_DriverChatBadges.length >= 1) {
                global_DriverChatBadges.forEach((element, index) => {
                    global_DriverChatTabs[index] = element.closest(query_DriverChatTab);
                });
            }

            if (!document.getElementById("newReadAllButton")) {
                const readAllButton = document.createElement("button")
                readAllButton.id = "newReadAllButton";
                updateReadButton(readAllButton, global_DriverChatBadges.length)

                readAllButton.addEventListener("click", () => {
                    global_DriverChatTabs.forEach(btn => btn.click());
                    updateReadButton(readAllButton, global_DriverChatBadges.length);
                });

                const scrollContainer = document.querySelector(".p-scrollpanel-content");
                scrollContainer.prepend(readAllButton);
            } else {
                const readAllButton = document.getElementById("newReadAllButton");
                updateReadButton(readAllButton, global_DriverChatBadges.length);
            }
        }

        // REMOVE THE REFRESH SHORTCUT IF NOT ON DASHBOARD

        if (loop_urlData !== global_URL_Dashboard && document.getElementById("shortcutRefresh")) {
            document.getElementById("shortcutRefresh").remove();
        }


        // DASHBOARD LOOP

        if (loop_urlData == global_URL_Dashboard) {
            element_debugWindow.textContent = JSON.stringify(global_wspTextboxData);
            const loop_tabActive = !!document.querySelector('button[aria-label="Active"].p-button.p-component.p-disabled.p-button-secondary')
            const loop_tabDoubleTrip = !!document.querySelector('button[aria-label="Double trip"].p-button.p-component.p-disabled.p-button-secondary')
            const loop_tabBookLater = !!document.querySelector('button[aria-label="Book Later"].p-button.p-component.p-disabled.p-button-secondary')


            // OUTERBOOKING LOOP
            if (loop_tabActive) {
                global_activeTripsTable = []
            }

            if (loop_tabDoubleTrip) {
                global_doubleTripsTable = []
            }

            if (loop_tabBookLater) {
                global_bookLaterTable = []
            }

            global_currentTripsTable = [];


            var loopTripCounter = 1;

            global_playAcceptedAlert = false;
            global_playArrivedAlert = false;

            global_playNewPing = false;
            global_playNewAppPing = false;
            global_playArrivedPing = false;
            global_playArrivedWspPing = false;
            global_playStartedPing = false;



            // FOREACH BOOKING LOOP
            document.querySelectorAll(query_ButtonCancel).forEach(button => {
                const row = button.closest('tr[role="row"]');
                var reviewingApp = false;
                var reviewingOwn = false;

                if (row) {
                    const cells = row.querySelectorAll('td[role="cell"]');
                    const raw1 = cells[2]?.textContent.trim(); // "MM/DD/YYYY, 2:02:00 PM"
                    const bookingDate = raw1?.split(',')[0].trim()           // "3/12/2026"
                    const bookingHour = raw1?.split(',')[1].trim()           // "2:02:00 PM"
                    var tripBookedT = bookingHour.trim().replace(/^\[\d+m\]\s*/, '');
                    var tripPhonenum = cells[6]?.querySelector(`a[href^="tel:"]`);
                    tripPhonenum = formatPhoneNum(tripPhonenum.getAttribute('href'), true);
                    const driversName = cells[7]?.querySelector('span')?.textContent.trim()
                    //const carType = cells[8]?.textContent.trim()
                    const pickupAddress = cells[9]?.querySelector('span')?.textContent.trim()
                    const dropoffAddress = cells[11]?.querySelector('span')?.textContent.trim()
                    const tripFrom = cells[13]?.textContent.trim()
                    var tripAcceptedT = cells[14]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
                    var tripArrivedT = cells[15]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
                    //const tripStartedT = cells[16]?.textContent.trim().replace(/^\[\d+m\]\s*/, '');
                    const paymentType = cells[18]?.textContent.trim()
                    const paysZelle = cells[19]?.textContent.trim()
                    const isBookLater = !!cells[36]?.querySelector(query_CellCheckSymbol);
                    const selectedDriver = cells[40]?.querySelector('span')?.textContent.trim()
                    const isWhatsapp = !!cells[3]?.querySelector(".pi-whatsapp");
                    const isGuest = !!cells[37]?.querySelector(query_CellCheckSymbol);
                    const penalty = cells[38]?.querySelector("span");

                    const tripTag = row.querySelector(query_tripTag);
                    const tripStatus = tripTag.textContent;

                    tripBookedT = tripBookedT.replaceAll("[NaNm] ", "")
                    tripAcceptedT = tripAcceptedT.replaceAll("[NaNm] ", "")
                    tripArrivedT = tripArrivedT.replaceAll("[NaNm] ", "")

                    var dataTimeBooked = null;
                    var dataTimeAccepted = null;
                    var dataTimeArrived = null;

                    var tripLateAccepted = false;
                    var tripLateArrived = false;

                    if (global_userLoopIgnore.includes(tripPhonenum)) return;
                    if (global_driverLoopIgnore.includes(driversName)) return;

                    if (driversName) {
                        global_busyDrivers.push(driversName)
                    }

                    if (selectedDriver) {
                        global_objectSelectedDrivers[selectedDriver] = (global_objectSelectedDrivers[selectedDriver] || 0) + 1;
                    }

                    if (!Settings.HighlightAppTrips[global_USER_PROFILE] && row.classList.contains("alt-owntrip")) {
                        row.classList.remove("alt-owntrip")
                    }


                    // function: show user info
                    const userCell = cells[5];
                    if (Settings.ShowUserDetails[global_USER_PROFILE] && !userCell.querySelector(`span[isUserDetails]`)) {
                        userCell.insertAdjacentHTML("beforeend", "<br>")
                        const t_user = isGuest ? "Guest" : "User";
                        var t_penalty = "";
                        var t_payment = paymentType;

                        if (penalty) {
                            t_penalty = `- Debt ${penalty.textContent}`
                        }

                        if (paysZelle !== "--") {
                            t_payment = paysZelle;
                        }

                        const spanElem = document.createElement("span")
                        spanElem.classList.add("userDetails")
                        spanElem.textContent = `[${t_user}] ${t_payment} ${t_penalty}`

                        userCell.prepend(spanElem);
                        spanElem.setAttribute("isUserDetails", "true")
                    } else if (!Settings.ShowUserDetails[global_USER_PROFILE] && !!cells[5].querySelector('span[isUserDetails]')) {
                        const elem = row.querySelector('span[isUserDetails]')
                        elem.remove();
                    }

                    // function: Highlighting Trips
                    if (Settings.HighlightTripsFrom[global_USER_PROFILE].includes(tripFrom)) {
                        row.classList.add("owntrip");
                        reviewingOwn = true;
                    } else if (Settings.HighlightAppTrips[global_USER_PROFILE] && tripFrom == "App Passenger") {
                        row.classList.add("alt-owntrip");
                        reviewingApp = true;
                    }

                    if (row.classList.contains("whatsapp-highlight")) {
                        reviewingOwn = true;
                    }

                    if (row.classList.contains("owntrip") && !reviewingOwn) {
                        row.classList.remove("owntrip")
                    }


                    // function: add barebone driver tag

                    if (Settings.DriverTagOnLeftSide[global_USER_PROFILE] && selectedDriver) {
                        var driverTagElement = cells[3].querySelector(`span[driverTag="true"]`)

                        if (!driverTagElement) {
                            driverTagElement = document.createElement("span")
                            driverTagElement.innerHTML = /*html*/
                                `
                            <img
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im01IDExbDEuNS00LjVoMTFMMTkgMTFtLTEuNSA1YTEuNSAxLjUgMCAwIDEtMS41LTEuNWExLjUgMS41IDAgMCAxIDEuNS0xLjVhMS41IDEuNSAwIDAgMSAxLjUgMS41YTEuNSAxLjUgMCAwIDEtMS41IDEuNW0tMTEgMEExLjUgMS41IDAgMCAxIDUgMTQuNUExLjUgMS41IDAgMCAxIDYuNSAxM0ExLjUgMS41IDAgMCAxIDggMTQuNUExLjUgMS41IDAgMCAxIDYuNSAxNk0xOC45MiA2Yy0uMi0uNTgtLjc2LTEtMS40Mi0xSDE1VjNIOXYySDYuNWMtLjY2IDAtMS4yMi40Mi0xLjQyIDFMMyAxMnY4YTEgMSAwIDAgMCAxIDFoMWExIDEgMCAwIDAgMS0xdi0xaDEydjFhMSAxIDAgMCAwIDEgMWgxYTEgMSAwIDAgMCAxLTF2LTh6Ii8+PC9zdmc+"
                            width="20px" height="20px"
                            >
                            ${selectedDriver}
                            `
                            driverTagElement.setAttribute("driverTag", "true")
                            driverTagElement.classList.add("driverTagBase")

                            if (cells[3].querySelector('span[istimedtxt="true"]')) {
                                const temp_bookTag = cells[3].querySelector('span[istimedtxt="true"]');
                                temp_bookTag.after(driverTagElement);
                            } else {
                                cells[3].prepend(driverTagElement)
                            }
                        }
                    } else if (!Settings.DriverTagOnLeftSide[global_USER_PROFILE] && !!cells[3].querySelector('span[driverTag="true"]')) {
                        const tag = row.querySelector('span[driverTag="true"]');
                        tag.remove();
                    }

                    // function: count trip for statistics + ping new
                    global_statistics[6]++; // total count
                    if (tripStatus == "NEW") {
                        if (reviewingApp) {
                            global_statistics[1]++;

                            if (loop_tabActive && Settings.PingNewAppTrips[global_USER_PROFILE]) {
                                global_playNewAppPing = true;
                            }

                        } else {
                            global_statistics[0]++

                            if (loop_tabActive && reviewingOwn && Settings.PingNewTrips[global_USER_PROFILE]) {
                                global_playNewPing = true;
                            }
                        }
                    } else {
                        const idx = global_stats_index[tripStatus];
                        if (idx !== undefined) global_statistics[idx]++;
                    }

                    // function: show booking icon if trip is a booking
                    if (Settings.ShowBookLaterIcon[global_USER_PROFILE]) {
                        if (!(cells[3].querySelector('img[isbookingicon="true"]')) && isBookLater) {
                            cells[3].prepend(element_bookingIcon.cloneNode(true))
                        }
                    }

                    // functions: elapsed time elements [booked, accepted, arrived]
                    if (Settings.ElapsedTimeBooked[global_USER_PROFILE]) {
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
                        }
                    } else if (!Settings.ElapsedTimeBooked[global_USER_PROFILE] && cells[3].querySelector('span[istimedtxt="true"]')) {
                        const temp_bookTag = cells[3].querySelector('span[istimedtxt="true"]');
                        temp_bookTag.remove();
                    }

                    if (Settings.ElapsedTimeAccepted[global_USER_PROFILE]) {
                        if (tripStatus == "ACCEPTED" || tripStatus == "ARRIVED") {
                            if (!(cells[14].querySelector('span[istimedtxt="true"]'))) {
                                if (tripAcceptedT !== "--") {
                                    const nyTime = getNYTime();
                                    let acceptedTimeDiff = minuteDiff(tripAcceptedT, nyTime);
                                    dataTimeAccepted = acceptedTimeDiff;

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

                                textGet.textContent = "[" + acceptedTimeDiff + "m] ";
                            }
                        }

                        if (tripStatus == "ACCEPTED") {
                            if (dataTimeAccepted >= Settings.AlertAcceptedTime_Value[global_USER_PROFILE]) {
                                var accAlertConditions = [false, false]

                                if (reviewingOwn) {
                                    accAlertConditions[0] = true;
                                }

                                if (reviewingApp && Settings.AlertsForAppTrips[global_USER_PROFILE]) {
                                    accAlertConditions[1] = true;
                                }

                                if (accAlertConditions.some(Boolean)) {
                                    tripLateAccepted = true;
                                    global_playAcceptedAlert = true;
                                }
                            }
                        }
                    } else if (!Settings.ElapsedTimeAccepted[global_USER_PROFILE] && cells[14].querySelector('span[istimedtxt="true"]')) {
                        const temp_accTag = cells[14].querySelector('span[istimedtxt="true"]');
                        temp_accTag.remove();
                    }

                    if (Settings.ElapsedTimeArrived[global_USER_PROFILE]) {
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
                            }

                            if (dataTimeArrived >= Settings.AlertArrivedTime_Value[global_USER_PROFILE]) {
                                if (isBookLater) {
                                    var arrval = Settings.AlertArrivedTime_Value[global_USER_PROFILE];
                                    if (dataTimeBooked >= arrval && dataTimeArrived >= arrval) {
                                        if (reviewingOwn) {
                                            tripLateArrived = true;
                                            global_playArrivedAlert = true;
                                        }

                                        if (reviewingApp && Settings.AlertsForAppTrips[global_USER_PROFILE]) {
                                            tripLateArrived = true;
                                            global_playArrivedAlert = true;
                                        }
                                    }
                                } else {
                                    var arrAlertConditions = [false, false]

                                    if (reviewingOwn) {
                                        arrAlertConditions[0] = true;
                                    }

                                    if (reviewingApp && Settings.AlertsForAppTrips[global_USER_PROFILE]) {
                                        arrAlertConditions[1] = true;
                                    }

                                    if (arrAlertConditions.some(Boolean)) {
                                        tripLateArrived = true;
                                        global_playArrivedAlert = true;
                                    }
                                }
                            }
                        } else {
                            row.classList.remove("arrivedWarn-highlight")
                        }
                    } else if (Settings.ElapsedTimeArrived[global_USER_PROFILE] && cells[15].querySelector('span[istimedtxt="true"]')) {
                        const temp_arrTag = cells[15].querySelector('span[istimedtxt="true"]');
                        temp_arrTag.remove();
                    }

                    // function: darken other day trips
                    if (Settings.HideOtherDayTrips[global_USER_PROFILE]) {
                        row.classList.toggle("filterHide", bookingDate !== global_todayDate)
                    } else {
                        row.classList.remove("filterHide")
                    }


                    // END OF ROW LOOP
                    var current_tripStorage = {
                        tempId: `trip_${loopTripCounter}`,
                        tripStatus: tripStatus,
                        userPhonenum: tripPhonenum,
                        assignedDriver: driversName,
                        selectedDriver: selectedDriver,
                        tripFrom: tripFrom,
                        isWhatsapp: !!isWhatsapp,
                        isBookLater: !!isBookLater,
                        ownTrip: reviewingOwn,
                        appTrip: reviewingApp,
                        lateAccepted: tripLateAccepted,
                        lateArrived: tripLateArrived,
                        pickupAddress: pickupAddress,
                        dropoffAddress: dropoffAddress,
                    }

                    row.id = current_tripStorage.tempId;

                    if (loop_tabActive) {
                        global_activeTripsTable.push(current_tripStorage);
                    } else if (loop_tabDoubleTrip) {
                        global_doubleTripsTable.push(current_tripStorage);
                    } else if (loop_tabBookLater) {
                        global_bookLaterTable.push(current_tripStorage);
                    }

                    global_currentTripsTable.push(current_tripStorage);

                    loopTripCounter++;
                }
            })

            // OUTERBOOKING LOOP (END)


            // last time
            // function: statistics
            if (Settings.TopBookingStats[global_USER_PROFILE]) {
                const actBookSpan = document.querySelector(query_ActiveBookSpan);
                const wrapper = document.getElementById(statElem_wrapper.id);

                if (actBookSpan) {
                    if (!wrapper) {
                        const parentCont = actBookSpan.parentElement;
                        parentCont.append(statElem_wrapper);
                    }

                    statElem_newTrips.textContent = "New: " + global_statistics[0]
                    statElem_newAppTrips.textContent = "App New: " + global_statistics[1]
                    statElem_accTrips.textContent = "Accepted: " + global_statistics[2]
                    statElem_arrTrips.textContent = "Arrived: " + global_statistics[3]
                    statElem_staTrips.textContent = "Started: " + global_statistics[4]
                    statElem_finTrips.textContent = "Finishing: " + global_statistics[5]
                    statElem_totalTrips.textContent = "Total: " + global_statistics[6]
                }
            }

            // function: refresh button + keybind

            if (Settings.UseRefreshShortcut[global_USER_PROFILE]) {
                const list = document.querySelectorAll(
                    ".p-button.p-component.p-button-icon-only.p-button-secondary:has(.p-button-icon.p-c.pi.pi-refresh)"
                );

                if (list.length >= 2) {
                    element_realRefreshButton = list[1];

                    if (!document.getElementById("shortcutRefresh")) {
                        document.body.append(element_buttonRefresh);
                    }
                } else {
                    element_realRefreshButton = null;
                }
            }


            // function: assigned driver

            if (Settings.DriverTagOnLeftSide[global_USER_PROFILE]) {
                // accepted -> taken -> dupe -> ignored

                if (loop_tabActive) {
                    //dupe
                    var filter_mainTrips = global_activeTripsTable.filter(
                        trip => trip.selectedDriver && trip.tripStatus == "NEW" && global_objectSelectedDrivers[trip.selectedDriver] > 1
                    )
                    driverTagAssemble(filter_mainTrips, "driverTagDupe")

                    // accepted
                    filter_mainTrips = global_activeTripsTable.filter(
                        trip => trip.selectedDriver && trip.selectedDriver == trip.assignedDriver
                    )
                    driverTagAssemble(filter_mainTrips, "driverTagAccepted")

                    // taken
                    filter_mainTrips = global_activeTripsTable.filter(
                        trip => trip.selectedDriver && global_busyDrivers.includes(trip.selectedDriver) && trip.selectedDriver !== trip.assignedDriver
                    )
                    driverTagAssemble(filter_mainTrips, "driverTagTaken")

                    //ignored
                    filter_mainTrips = global_activeTripsTable.filter(
                        trip => trip.selectedDriver && trip.assignedDriver && !global_busyDrivers.includes(trip.selectedDriver) && trip.selectedDriver !== trip.assignedDriver
                    )
                    driverTagAssemble(filter_mainTrips, "driverTagIgnored")
                }

                if (loop_tabDoubleTrip) {
                    if (global_doubleTripsTable.length > 0) {
                        global_doubleTripsTable.forEach((doubleTrip, index) => {
                            const activeTrip = global_activeTripsTable.find(
                                trip => trip.assignedDriver === doubleTrip.selectedDriver
                            );

                            if (!activeTrip) {
                                console.warn(
                                    "No matching active trip for:",
                                    doubleTrip.selectedDriver
                                );
                                return;
                            }

                            const row = document.getElementById(doubleTrip.tempId);
                            const cell = row?.querySelectorAll('td[role="cell"]')[8];
                            const span = cell?.querySelector("span");

                            if (span && !span.getAttribute("hasData")) {
                                span.innerHTML = /*html*/
                                    `
                                <b>[${activeTrip.tripStatus}] Pick Up:</b><br>
                                ${activeTrip.pickupAddress}<br><br>
                                <b>Ends service on:</b><br>
                                ${activeTrip.dropoffAddress}
                                `;

                                span.setAttribute("hasData", "true")
                            }
                        });
                    }
                }
            }


            // functions: whatsapp

            var tempSettings = [
                Settings.WspTagsSystem[global_USER_PROFILE],
                Settings.WspHighlightTrip[global_USER_PROFILE],
                Settings.WspRememberTextbox[global_USER_PROFILE],
                Settings.WspArrivedSound[global_USER_PROFILE]
            ]

            if (tempSettings.some(Boolean)) {
                const wspMasterCont = document.querySelector(query_WspContainer)
                var didNOTHING = true; // chud ass variable

                if (wspMasterCont && global_currentTripsTable.length > 0) {
                    const wspHeader = wspMasterCont.querySelector(query_WspHeader)
                    const chatTabs = wspMasterCont.querySelectorAll(query_WspChatTab);

                    if (chatTabs.length > 0) {
                        // clean wsp highlights in case u just exited a chat
                        didNOTHING = false;
                        var potLeftovers = document.querySelectorAll(`.whatsapp-highlight:not([wsp_Processed="true"])`)
                        if (potLeftovers.length > 0) {
                            potLeftovers.forEach(element => {
                                element.classList.remove("whatsapp-highlight")
                            });
                        }

                        removeClassesObject(global_wspClasses, wspMasterCont)

                        chatTabs.forEach(element => {
                            var chatNumber = element.querySelector(`a[href^="tel:"]`);
                            chatNumber = formatPhoneNum(chatNumber.getAttribute('href'), true);

                            if (Settings.WspTagsSystem[global_USER_PROFILE]) {
                                var selectList = null;
                                if (!element.getAttribute("hasTaglist")) {
                                    element.insertAdjacentHTML("beforeend", element_wspSelectList)
                                    selectList = element.querySelector("select")

                                    if (chatNumber in global_wspTagsNumbers) {
                                        selectList.value = global_wspTagsNumbers[chatNumber];
                                    }

                                    selectList.addEventListener("change", function () {
                                        global_wspTagsNumbers[chatNumber] = this.value;
                                    })

                                    selectList.addEventListener("click", function (e) {
                                        e.stopPropagation();
                                    });

                                    selectList.classList.add("wspSelectList")
                                    element.style.flexWrap = "wrap";
                                    element.setAttribute("hasTaglist", "true");
                                }

                                selectList = selectList ? selectList : element.querySelector("select")

                                if (selectList.value !== global_wspTagsNumbers[chatNumber]) {
                                    selectList.value = global_wspTagsNumbers[chatNumber];
                                }
                            }

                            if (loop_tabActive) {
                                var filter_wspMatches = global_activeTripsTable.filter(trip => trip.userPhonenum == chatNumber)
                            } else if (loop_tabDoubleTrip) {
                                var filter_wspMatches = global_doubleTripsTable.filter(trip => trip.userPhonenum == chatNumber)
                            } else if (loop_tabBookLater) {
                                var filter_wspMatches = global_bookLaterTable.filter(trip => trip.userPhonenum == chatNumber)
                            }

                            // if theres duplicates, only first trip is needed (most recent)
                            if (filter_wspMatches.length > 0) {
                                if (Object.keys(global_wspClasses).includes(filter_wspMatches[0].tripStatus)) {
                                    Object.values(global_wspClasses).forEach(cls => {
                                        if (cls !== global_wspClasses[filter_wspMatches[0].tripStatus] && element.classList.contains(cls)) {
                                            element.classList.remove(cls);
                                        }
                                    })

                                    element.classList.add(global_wspClasses[filter_wspMatches[0].tripStatus])
                                }

                                filter_wspMatches.forEach(trip => {
                                    trip.ownTrip = true; // if it was alr true, wont change nothing
                                    trip.isWhatsapp = true; // just in case so custom whatsapp arrived works too

                                    if (trip.tripStatus == "NEW" && trip.isBookLater !== true) {
                                        global_playNewPing = true;
                                    }
                                });
                            } else {
                                removeClassesObject(global_wspClasses, element)
                            }
                        });
                    } else if (wspHeader) {
                        didNOTHING = false;
                        var chatNumber = wspMasterCont.querySelector(`a[href^="tel:"]`);
                        chatNumber = formatPhoneNum(chatNumber.getAttribute('href'), true);

                        if (Settings.WspTagsSystem[global_USER_PROFILE]) {
                            var selectList = null;
                            if (!wspHeader.getAttribute("hasTaglist")) {
                                wspHeader.insertAdjacentHTML("beforeend", element_wspSelectList)
                                selectList = wspHeader.querySelector("select")

                                if (chatNumber in global_wspTagsNumbers) {
                                    selectList.value = global_wspTagsNumbers[chatNumber];
                                }

                                selectList.addEventListener("change", function () {
                                    global_wspTagsNumbers[chatNumber] = this.value;
                                })

                                selectList.addEventListener("click", function (e) {
                                    e.stopPropagation();
                                });

                                selectList.classList.add("wspSelectList")
                                selectList.style.margin = "15px";
                                selectList.style.marginTop = "0";
                                wspHeader.style.flexWrap = "wrap";
                                wspHeader.setAttribute("hasTaglist", "true");
                            }

                            selectList = selectList ? selectList : wspHeader.querySelector("select")

                            if (selectList.value !== global_wspTagsNumbers[chatNumber]) {
                                selectList.value = global_wspTagsNumbers[chatNumber];
                            }
                        }

                        if (Settings.WspRememberTextbox[global_USER_PROFILE]) {
                            for (const key in global_wspTextboxData) {
                                if (!global_wspTextboxData[key].trim()) {
                                    delete global_wspTextboxData[key];
                                }
                            }

                            const wspTextbox = wspMasterCont.querySelector(query_WspTextbox);

                            if (wspTextbox && !wspTextbox.getAttribute("hasListener")) {
                                if (chatNumber in global_wspTextboxData) {
                                    wspTextbox.value = global_wspTextboxData[chatNumber];

                                    var prevStyle = wspTextbox.style.border;
                                    wspTextbox.style.border = "1px solid white";

                                    setTimeout(() => {
                                        wspTextbox.style.border = prevStyle;
                                    }, 100);
                                }

                                wspTextbox.addEventListener("change", () => {
                                    global_wspTextboxData[chatNumber] = wspTextbox.disabled
                                        ? ""
                                        : wspTextbox.value;
                                });

                                const observer = new MutationObserver(() => {
                                    if (wspTextbox.disabled) {
                                        global_wspTextboxData[chatNumber] = "";
                                    }
                                });

                                observer.observe(wspTextbox, {
                                    attributes: true,
                                    attributeFilter: ["disabled"]
                                });

                                wspTextbox.setAttribute("hasListener", "true");
                            }
                        }


                        var activeElems = [];

                        if (loop_tabActive) {
                            var filter_wspMatches = global_activeTripsTable.filter(trip => trip.userPhonenum == chatNumber)
                        } else if (loop_tabDoubleTrip) {
                            var filter_wspMatches = global_doubleTripsTable.filter(trip => trip.userPhonenum == chatNumber)
                        } else if (loop_tabBookLater) {
                            var filter_wspMatches = global_bookLaterTable.filter(trip => trip.userPhonenum == chatNumber)
                        }

                        if (filter_wspMatches.length > 0) {
                            if (Settings.WspHighlightTrip[global_USER_PROFILE]) {
                                filter_wspMatches.forEach(element => {
                                    var row = document.getElementById(element.tempId);
                                    row.classList.add("whatsapp-highlight")
                                    row.setAttribute("wsp_Processed", "true");
                                    activeElems.push(row);

                                    element.ownTrip = true;
                                    element.isWhatsapp = true;

                                    if (element.tripStatus == "NEW" && element.isBookLater !== true) {
                                        global_playNewPing = true;
                                    }
                                });

                                var potLeftovers = document.querySelectorAll(`.whatsapp-highlight:not([wsp_Processed="true"])`)
                                if (potLeftovers.length > 0) {
                                    potLeftovers.forEach(element => {
                                        element.classList.remove("whatsapp-highlight")
                                    });
                                }
                            }

                            if (Object.keys(global_wspClasses).includes(filter_wspMatches[0].tripStatus)) {
                                Object.values(global_wspClasses).forEach(cls => {
                                    if (cls !== global_wspClasses[filter_wspMatches[0].tripStatus] && wspMasterCont.classList.contains(cls)) {
                                        wspMasterCont.classList.remove(cls);
                                    }
                                })

                                wspMasterCont.classList.add(global_wspClasses[filter_wspMatches[0].tripStatus])
                            }
                        } else {
                            if (Settings.WspHighlightTrip[global_USER_PROFILE]) {
                                var leftovers = document.querySelectorAll(".whatsapp-highlight");

                                if (leftovers.length > 0) {
                                    leftovers.forEach(element => {
                                        element.classList.remove("whatsapp-highlight")
                                    });
                                }
                            }
                            removeClassesObject(global_wspClasses, wspMasterCont)
                        }

                        // after process, remove tag so if its leftover on next loop, remove it
                        if (activeElems.length > 0) {
                            activeElems.forEach(element => {
                                element.removeAttribute("wsp_Processed");
                            });
                        }
                    }

                    if (didNOTHING) {
                        removeClassesObject(global_wspClasses, wspMasterCont);
                    }
                }
            }

            // function: alert accepted/arriveds styles

            if (Settings.AlertAcceptedTime[global_USER_PROFILE] && loop_tabActive) {
                var processedRows = []
                const cur_alertAcceptTrips = global_activeTripsTable.filter(trip => trip.lateAccepted)

                if (cur_alertAcceptTrips.length > 0) {
                    cur_alertAcceptTrips.forEach(element => {
                        var row = document.getElementById(element.tempId);
                        row.classList.add("acceptedWarn-highlight")
                        row.setAttribute("warn_Processed", "true")

                        processedRows.push(row)
                    });
                }

                clearClasses("acceptedWarn-highlight", `[warn_Processed="true"]`)
                processedRows.forEach(element => {
                    element.removeAttribute("warn_Processed");
                });
            }

            if (Settings.AlertArrivedTime[global_USER_PROFILE] && loop_tabActive) {
                var processedRows = []
                const cur_alertArrivedTrips = global_activeTripsTable.filter(trip => trip.lateArrived)

                if (cur_alertArrivedTrips.length > 0) {
                    cur_alertArrivedTrips.forEach(element => {
                        var row = document.getElementById(element.tempId);
                        row.classList.add("arrivedWarn-highlight")
                        row.setAttribute("warn_Processed", "true")

                        processedRows.push(row)
                    });
                }

                clearClasses("arrivedWarn-highlight", `[warn_Processed="true"]`)
                processedRows.forEach(element => {
                    element.removeAttribute("warn_Processed");
                });
            }

            //function: arrived ping

            if (Settings.PingArrivedTrips[global_USER_PROFILE]) {
                const cur_ownArrivedTrips = global_activeTripsTable.filter(trip => trip.tripStatus == "ARRIVED" && trip.ownTrip);
                const prev_ownArrivedTrips = global_activeTripsTable_Dupe.filter(trip => trip.tripStatus == "ACCEPTED" && trip.ownTrip);

                cur_ownArrivedTrips.forEach((element, index) => {
                    var compareTrip = prev_ownArrivedTrips.filter(trip => trip.userPhonenum == element.userPhonenum && trip.assignedDriver == element.assignedDriver);

                    if (compareTrip.length == 0) return;

                    if (compareTrip[0].tripStatus == "ACCEPTED") {
                        //trip went from accepted -> arrived, ping arrived
                        if (Settings.WspArrivedSound[global_USER_PROFILE] && element.isWhatsapp) {
                            global_playArrivedWspPing = true;
                        } else {
                            global_playArrivedPing = true;
                        }
                    }
                });
            }

            // function: started ping

            if (Settings.PingStartedTrips[global_USER_PROFILE]) {
                const cur_ownStartedTrips = global_activeTripsTable.filter(trip => trip.tripStatus == "STARTED" && trip.ownTrip);
                const prev_ownStartedTrips = global_activeTripsTable_Dupe.filter(trip => trip.tripStatus == "ARRIVED" && trip.ownTrip);

                cur_ownStartedTrips.forEach((element, index) => {
                    var compareTrip = prev_ownStartedTrips.filter(trip => trip.userPhonenum == element.userPhonenum && trip.assignedDriver == element.assignedDriver);

                    if (compareTrip.length == 0) return;

                    if (compareTrip[0].tripStatus == "ARRIVED") {
                        //trip went from arrived -> started, ping started
                        global_playStartedPing = true;
                    }
                });
            }

            // functions: play audios
            playAudio(audio_Arrived, global_playArrivedPing);
            playAudio(audio_ArrivedWsp, global_playArrivedWspPing);
            playAudio(audio_Started, global_playStartedPing);




            // wrap up

            if (loop_tabActive) {
                global_activeTripsTable_Dupe = global_activeTripsTable;
            }

            if (loop_tabDoubleTrip) {
                global_doubleTripsTable_Dupe = global_doubleTripsTable;
            }

            if (loop_tabBookLater) {
                global_bookLaterTable_Dupe = global_bookLaterTable;
            }

            global_currentTripsTable_Dupe = global_currentTripsTable
        }

        // OUTER DASHBOARD LOOP

    }






    // FUNCTIONS


    function driverTagAssemble(array, tagClass) {
        if (array.length > 0) {
            array.forEach(element => {
                var row = document.getElementById(element.tempId);
                var driverTag = row.querySelector('span[drivertag="true"]')

                removeClassesList(global_driverTagClasses, driverTag);
                driverTag.classList.add(tagClass)
            });
        }
    }

    function clearClasses(className, exclude = "") {
        var elements = document.querySelectorAll(
            exclude ? `.${className}:not(${exclude})` : `.${className}`
        );

        elements.forEach(element => {
            element.classList.remove(className);
        });
    }

    function removeClassesList(classesList, elementToCheck) {
        classesList.forEach(cls => {
            elementToCheck.classList.remove(cls);
        });
    }

    function removeClassesObject(classesList, elementToCheck) {
        Object.values(classesList).forEach(cls => {
            elementToCheck.classList.remove(cls);
        });
    }

    function highlightText(element) {
        element.classList.add('cust_phonecopy');

        setTimeout(() => {
            element.classList.remove('cust_phonecopy');
        }, 300);
    }

    function playAudio(audio, condition) {
        if (condition) {
            audio.play();
        }
    }

    function formatPhoneNum(number, plus) {
        var formatted = number.replace('tel:', '');
        if (plus) {
            formatted = formatted.replace('+', '');
        }

        return formatted;
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

    function getNYTime() {
        return new Date().toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }

    function updateReadButton(button, length) {
        if (length < 1) {
            button.classList.remove("newReadButton-active");
            button.classList.add("newReadButton-disabled");

            button.innerText = "No unread chats"
        } else if (length >= 1) {
            button.classList.remove("newReadButton-disabled");
            button.classList.add("newReadButton-active");

            button.innerText = "Read all chats"
        }
    }

    setInterval(tickSeconds, 1000);
    function tickSeconds() {
        if (global_AlertsCounter < Settings.AlertsSoundsInterval[global_USER_PROFILE]) {
            global_AlertsCounter++;
        } else if (global_AlertsCounter >= Settings.AlertsSoundsInterval[global_USER_PROFILE]) {
            if (global_playAcceptedAlert) {
                playAudio(audio_AlertAccept, true)
                global_AlertsCounter = 0;
            }

            if (global_playArrivedAlert) {
                playAudio(audio_AlertArrived, true)
                global_AlertsCounter = 0;
            }
        }

        if (global_PingsCounter < Settings.PingTimeIntervals[global_USER_PROFILE]) {
            global_PingsCounter++;
        } else if (global_PingsCounter >= Settings.PingTimeIntervals[global_USER_PROFILE]) {
            if (global_playNewPing) {
                playAudio(audio_New, true);
                global_PingsCounter = 0;
            }

            if (global_playNewAppPing) {
                playAudio(audio_NewApp, true);
                global_PingsCounter = 0;
            }
        }
    }

    function restoreMemoryColours() {
        if (localStorage.getItem("DATA_CSS_EXISTS")) {
            const root = document.documentElement;
            root.style.setProperty('--own-booking-color', localStorage.getItem("DATA_CSS_COLOUROWN"));
            root.style.setProperty('--app-booking-color', localStorage.getItem("DATA_CSS_COLOURAPP"));
            root.style.setProperty('--phonenumber-base-color', localStorage.getItem("DATA_CSS_COLOURPHONE"));
            root.style.setProperty('--phonenumber-click-color', localStorage.getItem("DATA_CSS_COLOURPHONECOPY"));
            root.style.setProperty('--duplicate-booking-color', localStorage.getItem("DATA_CSS_COLOURDUPLICATES"));
        }
    }

    function hasDuplicates(arr, value) {
        return arr.filter(item => item === value).length > 1;
    }
})();

/*
>> v1.11
[tweaks]
- changed css of Mui switches so theyre visible on dark mode

>> v1.1
[bugfixes]
- arrived/accepted warnings error when on doubletrip/booklater tab
- fixed statistics not counting new trips properly
- fixed issues related to the "FINISHING" trips status (e.g whatsapp, stats)

[tweaks]
- settings save files now loads regardless of script version

>> v1.0
first release NubeScript 2

[removal]
- removed lookup, it sucked


*/
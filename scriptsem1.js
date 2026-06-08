document.getElementById("calculationMode").addEventListener("change", updatePlaceholders);

function updatePlaceholders() {

    let mode = document.getElementById("calculationMode").value;

    let eseInputs = document.querySelectorAll(".ese-input");

    eseInputs.forEach(input => {

        if(mode === "verification") {
            input.placeholder = "Scaled Marks Obtained in ESE";
        }
        else {
            input.placeholder = "Marks Obtained in ESE";
        }

    });
}

function updateMaxLimits() {

    let mode = document.getElementById("calculationMode").value;

    document.querySelectorAll(".ese-input").forEach(input => {

        if (mode === "verification") {
            input.max = input.dataset.verificationMax;
        } else {
            input.max = input.dataset.predictionMax;
        }

    });
}

document.getElementById("calculationMode").addEventListener("change", updateMode);

function updateMode() {
    updatePlaceholders();
    updateMaxLimits();
}

updateMode();

function validateInput(id, min, max) {

    let el = document.getElementById(id);
    let value = Number(el.value);

    if (value < min || value > max) {
        alert(`Enter value between ${min} and ${max}`);
        el.focus();
        return false;
    }

    return true;
}

function validateAll(mode) {

    // theory internal
    if (!validateInput("am1isemsemrksobt", 0, 40)) return false;
    if (!validateInput("apisemsemrksobt", 0, 40)) return false;
    if (!validateInput("beeeisemsemrksobt", 0, 30)) return false;
    if (!validateInput("cpisemsemrksobt", 0, 30)) return false;
    if (!validateInput("amrdisemsemrksobt", 0, 30)) return false;

    // labs
    if (!validateInput("aplciapmrksobt", 0, 25)) return false;
    if (!validateInput("beeelciapmrksobt", 0, 25)) return false;
    if (!validateInput("cplciapmrksobt", 0, 25)) return false;
    if (!validateInput("amrdlciapmrksobt", 0, 25)) return false;
    if (!validateInput("ew1ciapmrksobt", 0, 25)) return false;
    if (!validateInput("hwmciapmrksobt", 0, 25)) return false;
    if (!validateInput("uhvciapmrksobt", 0, 25)) return false;

    if (!validateInput("beeelesepmrksobt", 0, 25)) return false;
    if (!validateInput("cplesepmrksobt", 0, 25)) return false;
    if (!validateInput("amrdlesepmrksobt", 0, 25)) return false;

    // ESE based on mode
    let eseMax = mode === "verification" ? 60 : 80;

    if (!validateInput("am1esemrksobt", 0, eseMax)) return false;
    if (!validateInput("apesemrksobt", 0, eseMax)) return false;
    if (!validateInput("beeeesemrksobt", 0, mode === "verification" ? 45 : 60)) return false;
    if (!validateInput("cpesemrksobt", 0, mode === "verification" ? 45 : 60)) return false;
    if (!validateInput("amrdesemrksobt", 0, mode === "verification" ? 45 : 60)) return false;

    return true;
}

function calculateSGPA() {
    let mode = document.getElementById("calculationMode").value;

    if (!validateAll(mode)) return;

    document.querySelector(".Theorysubjects").style.display = "none";
    document.querySelector(".labsubjects").style.display = "none";
    document.querySelector(".calculatebutton").style.display = "none";

    document.getElementById("resultSection").style.display = "block";

    const AM1_Credits = 3;
    const AP_Credits = 3;
    const BEEE_Credits = 2;
    const CP_Credits = 2;
    const AMRD_Credits = 2;
    const APL_Credits = 0.5;
    const BEEEL_Credits = 1;
    const CPL_Credits = 1;
    const AMRDL_Credits = 1;
    const EW1_Credits = 1;
    const HWM_Credits = 2;
    const UHV_Credits = 2.5;
    const TotalCredits = AM1_Credits + AP_Credits + BEEE_Credits + CP_Credits + AMRD_Credits + APL_Credits + BEEEL_Credits + CPL_Credits + AMRDL_Credits + EW1_Credits + HWM_Credits + UHV_Credits;

    const APL_TotalMarks = 25;
    const BEEEL_TotalMarks = 50;
    const CPL_TotalMarks = 50;
    const AMRDL_TotalMarks = 50;
    const EW1_TotalMarks = 25;
    const HWM_TotalMarks = 25;
    const UHV_TotalMarks = 25;

    let AM1_ISE_MSE_Marks = parseFloat(document.getElementById("am1isemsemrksobt").value);
    let AP_ISE_MSE_Marks = parseFloat(document.getElementById("apisemsemrksobt").value);
    let BEEE_ISE_MSE_Marks = parseFloat(document.getElementById("beeeisemsemrksobt").value);
    let CP_ISE_MSE_Marks = parseFloat(document.getElementById("cpisemsemrksobt").value);
    let AMRD_ISE_MSE_Marks = parseFloat(document.getElementById("amrdisemsemrksobt").value);

    let APL_CIAP_Marks = parseFloat(document.getElementById("aplciapmrksobt").value);
    let BEEEL_CIAP_Marks = parseFloat(document.getElementById("beeelciapmrksobt").value);
    let CPL_CIAP_Marks = parseFloat(document.getElementById("cplciapmrksobt").value);
    let AMRDL_CIAP_Marks = parseFloat(document.getElementById("amrdlciapmrksobt").value);
    let EW1_CIAP_Marks = parseFloat(document.getElementById("ew1ciapmrksobt").value);
    let HWM_CIAP_Marks = parseFloat(document.getElementById("hwmciapmrksobt").value);
    let UHV_CIAP_Marks = parseFloat(document.getElementById("uhvciapmrksobt").value);

    let BEEEL_ESEP_Marks = parseFloat(document.getElementById("beeelesepmrksobt").value);
    let CPL_ESEP_Marks = parseFloat(document.getElementById("cplesepmrksobt").value);
    let AMRDL_ESEP_Marks = parseFloat(document.getElementById("amrdlesepmrksobt").value);

    const AM1_TotalMarks = 100;
    const AP_TotalMarks = 100;
    const BEEE_TotalMarks = 75;
    const CP_TotalMarks = 75;
    const AMRD_TotalMarks = 75;

    const AM1_ESETotalMarks = 80;
    const AP_ESETotalMarks = 80;
    const BEEE_ESETotalMarks = 60;
    const CP_ESETotalMarks = 60;
    const AMRD_ESETotalMarks = 60;

    let AM1_ScaledMarks = 60;
    let AP_ScaledMarks = 60;
    let BEEE_ScaledMarks = 45;
    let CP_ScaledMarks = 45;
    let AMRD_ScaledMarks = 45;

    let AM1_ESE_Marks = parseFloat(document.getElementById("am1esemrksobt").value);
    let AP_ESE_Marks = parseFloat(document.getElementById("apesemrksobt").value);
    let BEEE_ESE_Marks = parseFloat(document.getElementById("beeeesemrksobt").value);
    let CP_ESE_Marks = parseFloat(document.getElementById("cpesemrksobt").value);
    let AMRD_ESE_Marks = parseFloat(document.getElementById("amrdesemrksobt").value);

    let AM1_ScalingFactor = AM1_ScaledMarks / AM1_ESETotalMarks;
    let AP_ScalingFactor = AP_ScaledMarks / AP_ESETotalMarks;
    let BEEE_ScalingFactor = BEEE_ScaledMarks / BEEE_ESETotalMarks;
    let CP_ScalingFactor = CP_ScaledMarks / CP_ESETotalMarks;
    let AMRD_ScalingFactor = AMRD_ScaledMarks / AMRD_ESETotalMarks;

    let AM1_ScaledESE_Marks = AM1_ESE_Marks * AM1_ScalingFactor;
    let AP_ScaledESE_Marks = AP_ESE_Marks * AP_ScalingFactor;
    let BEEE_ScaledESE_Marks = BEEE_ESE_Marks * BEEE_ScalingFactor;
    let CP_ScaledESE_Marks = CP_ESE_Marks * CP_ScalingFactor;
    let AMRD_ScaledESE_Marks = AMRD_ESE_Marks * AMRD_ScalingFactor;

    if(mode === "verification") {

    AM1_ScaledMarks = 60;
    AP_ScaledMarks = 60;
    BEEE_ScaledMarks = 45;
    CP_ScaledMarks = 45;
    AMRD_ScaledMarks = 45;

    AM1_ESE_Marks = parseFloat(document.getElementById("am1esemrksobt").value);
    AP_ESE_Marks = parseFloat(document.getElementById("apesemrksobt").value);
    BEEE_ESE_Marks = parseFloat(document.getElementById("beeeesemrksobt").value);
    CP_ESE_Marks = parseFloat(document.getElementById("cpesemrksobt").value);
    AMRD_ESE_Marks = parseFloat(document.getElementById("amrdesemrksobt").value);

    AM1_ScaledESE_Marks = AM1_ESE_Marks;
    AP_ScaledESE_Marks = AP_ESE_Marks;
    BEEE_ScaledESE_Marks = BEEE_ESE_Marks;
    CP_ScaledESE_Marks = CP_ESE_Marks;
    AMRD_ScaledESE_Marks = AMRD_ESE_Marks;

    }

    let AM1_FinalMarks = AM1_ISE_MSE_Marks + AM1_ScaledESE_Marks;
    let AP_FinalMarks = AP_ISE_MSE_Marks + AP_ScaledESE_Marks;
    let BEEE_FinalMarks = BEEE_ISE_MSE_Marks + BEEE_ScaledESE_Marks;
    let CP_FinalMarks = CP_ISE_MSE_Marks + CP_ScaledESE_Marks;
    let AMRD_FinalMarks = AMRD_ISE_MSE_Marks + AMRD_ScaledESE_Marks;

    let AM1_ObtainedPercentage = (AM1_FinalMarks / AM1_TotalMarks) * 100;
    let AP_ObtainedPercentage = (AP_FinalMarks / AP_TotalMarks) * 100;
    let BEEE_ObtainedPercentage = (BEEE_FinalMarks / BEEE_TotalMarks) * 100;
    let CP_ObtainedPercentage = (CP_FinalMarks / CP_TotalMarks) * 100;
    let AMRD_ObtainedPercentage = (AMRD_FinalMarks / AMRD_TotalMarks) * 100;

    let AM1_GradePoint = getGradePoint(AM1_ObtainedPercentage);
    let AP_GradePoint = getGradePoint(AP_ObtainedPercentage);
    let BEEE_GradePoint = getGradePoint(BEEE_ObtainedPercentage);
    let CP_GradePoint = getGradePoint(CP_ObtainedPercentage);
    let AMRD_GradePoint = getGradePoint(AMRD_ObtainedPercentage);

    let AM1_Pointer = getPointer(AM1_ObtainedPercentage);
    let AP_Pointer = getPointer(AP_ObtainedPercentage);
    let BEEE_Pointer = getPointer(BEEE_ObtainedPercentage);
    let CP_Pointer = getPointer(CP_ObtainedPercentage);
    let AMRD_Pointer = getPointer(AMRD_ObtainedPercentage);

    let AM1_CreditsEarned = (AM1_Pointer * AM1_Credits);
    let AP_CreditsEarned = (AP_Pointer * AP_Credits);
    let BEEE_CreditsEarned = (BEEE_Pointer * BEEE_Credits);
    let CP_CreditsEarned = (CP_Pointer * CP_Credits);
    let AMRD_CreditsEarned = (AMRD_Pointer * AMRD_Credits);

    let APL_MarksObtained = APL_CIAP_Marks;
    let BEEEL_MarksObtained = BEEEL_CIAP_Marks + BEEEL_ESEP_Marks;
    let CPL_MarksObtained = CPL_CIAP_Marks + CPL_ESEP_Marks;
    let AMRDL_MarksObtained = AMRDL_CIAP_Marks + AMRDL_ESEP_Marks;
    let EW1_MarksObtained = EW1_CIAP_Marks;
    let HWM_MarksObtained = HWM_CIAP_Marks;
    let UHV_MarksObtained = UHV_CIAP_Marks;

    let APL_Percentage = (APL_MarksObtained / APL_TotalMarks) * 100;
    let BEEEL_Percentage = (BEEEL_MarksObtained / BEEEL_TotalMarks) * 100;
    let CPL_Percentage = (CPL_MarksObtained / CPL_TotalMarks) * 100;
    let AMRDL_Percentage = (AMRDL_MarksObtained / AMRDL_TotalMarks) * 100;
    let EW1_Percentage = (EW1_MarksObtained / EW1_TotalMarks) * 100;
    let HWM_Percentage = (HWM_MarksObtained / HWM_TotalMarks) * 100;
    let UHV_Percentage = (UHV_MarksObtained / UHV_TotalMarks) * 100;

    let APL_GradePoint = getGradePoint(APL_Percentage);
    let BEEEL_GradePoint = getGradePoint(BEEEL_Percentage);
    let CPL_GradePoint = getGradePoint(CPL_Percentage);
    let AMRDL_GradePoint = getGradePoint(AMRDL_Percentage);
    let EW1_GradePoint = getGradePoint(EW1_Percentage);
    let HWM_GradePoint = getGradePoint(HWM_Percentage);
    let UHV_GradePoint = getGradePoint(UHV_Percentage);

    let APL_Pointer = getPointer(APL_Percentage);
    let BEEEL_Pointer = getPointer(BEEEL_Percentage);
    let CPL_Pointer = getPointer(CPL_Percentage);
    let AMRDL_Pointer = getPointer(AMRDL_Percentage);
    let EW1_Pointer = getPointer(EW1_Percentage);
    let HWM_Pointer = getPointer(HWM_Percentage);
    let UHV_Pointer = getPointer(UHV_Percentage);

    let APL_CreditsEarned = (APL_Pointer * APL_Credits);
    let BEEEL_CreditsEarned = (BEEEL_Pointer * BEEEL_Credits);
    let CPL_CreditsEarned = (CPL_Pointer * CPL_Credits);
    let AMRDL_CreditsEarned = (AMRDL_Pointer * AMRDL_Credits);
    let EW1_CreditsEarned = (EW1_Pointer * EW1_Credits);
    let HWM_CreditsEarned = (HWM_Pointer * HWM_Credits);
    let UHV_CreditsEarned = (UHV_Pointer * UHV_Credits);

    let TotalCreditsEarned = AM1_CreditsEarned + AP_CreditsEarned + BEEE_CreditsEarned + CP_CreditsEarned + AMRD_CreditsEarned + APL_CreditsEarned + BEEEL_CreditsEarned + CPL_CreditsEarned + AMRDL_CreditsEarned + EW1_CreditsEarned + HWM_CreditsEarned + UHV_CreditsEarned;

    let SGPA = TotalCreditsEarned / TotalCredits;

    document.getElementById("resultTableBody").innerHTML = "";

    addResultRow(
        "Applied Mathematics I",
        AM1_Credits,
        AM1_GradePoint,
        AM1_Pointer,
        AM1_CreditsEarned
    );

    addResultRow(
        "Applied Physics/Chemistry",
        AP_Credits,
        AP_GradePoint,
        AP_Pointer,
        AP_CreditsEarned
    );

    addResultRow(
        "Basic Electrical & Electronics Engineering",
        BEEE_Credits,
        BEEE_GradePoint,
        BEEE_Pointer,
        BEEE_CreditsEarned
    );

    addResultRow(
        "C-Programming ",
        CP_Credits,
        CP_GradePoint,
        CP_Pointer,
        CP_CreditsEarned
    );

    addResultRow(
        "Applied Mechanics and Robot Dynamics",
        AMRD_Credits,
        AMRD_GradePoint,
        AMRD_Pointer,
        AMRD_CreditsEarned
    );

    addResultRow(
        "Applied Physics/Chemistry Lab",
        APL_Credits,
        APL_GradePoint,
        APL_Pointer,
        APL_CreditsEarned
    );

    addResultRow(
        "Basic Electrical & Electronics Engineering Lab ",
        BEEEL_Credits,
        BEEEL_GradePoint,
        BEEEL_Pointer,
        BEEEL_CreditsEarned
    );

    addResultRow(
        "C-Programming Lab",
        CPL_Credits,
        CPL_GradePoint,
        CPL_Pointer,
        CPL_CreditsEarned
    );

    addResultRow(
        "Applied Mechanics and Robot Dynamics Lab ",
        AMRDL_Credits,
        AMRDL_GradePoint,
        AMRDL_Pointer,
        AMRDL_CreditsEarned
    );

    addResultRow(
        "Engineering Workshop-I",
        EW1_Credits,
        EW1_GradePoint,
        EW1_Pointer,
        EW1_CreditsEarned
    );

    addResultRow(
        "Health, Wellness and Mindfulness ",
        HWM_Credits,
        HWM_GradePoint,
        HWM_Pointer,
        HWM_CreditsEarned
    );

    addResultRow(
        "Induction Cum Universal Human Values",
        UHV_Credits,
        UHV_GradePoint,
        UHV_Pointer,
        UHV_CreditsEarned
    );

    document.getElementById("totalCreditsDisplay").innerText =
        TotalCredits;

    document.getElementById("creditPointsDisplay").innerText =
        TotalCreditsEarned.toFixed(2);

    document.getElementById("finalSGPA").innerText =
        SGPA.toFixed(2);
}

function getGradePoint(percentage) 
{
            
        if (percentage >=80) {
            return "O";
        }

        else if (percentage >=75) {
            return "A+";
        }

        else if (percentage >=70) {
            return "A";
        }

        else if (percentage >=60) {
            return "B+";
        }

        else if (percentage >=50) {
            return "B";
        }

        else if (percentage >=40) {
            return "C";
        }

        else   {
            return "F";

        }
}

function getPointer(percentage) {
    if (percentage >= 80)
        return 10;
    else if (percentage >= 75)
        return 9;
    else if (percentage >= 70)
        return 8;
    else if (percentage >= 60)
        return 7;
    else if (percentage >= 50)
        return 6;
    else if (percentage >= 40)
        return 5;
    else
        return 0;
}

function addResultRow(
    subject,
    credits,
    grade,
    pointer,
    creditPoints
){

    document.getElementById("resultTableBody").innerHTML += `
        <tr>
            <td>${subject}</td>
            <td>${credits}</td>
            <td>${grade}</td>
            <td>${pointer}</td>
            <td>${creditPoints.toFixed(2)}</td>
        </tr>
    `;
}

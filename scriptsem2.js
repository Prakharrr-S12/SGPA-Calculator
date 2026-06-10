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
        el.classList.add("error");
        alert(`Enter value between ${min} and ${max}`);
        el.focus();
        return false;
    }

    el.classList.remove("error");
    return true;
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        this.classList.remove("error");
    });
});

function validateAll(mode) {

    // theory internal
    if (!validateInput("am2isemsemrksobt", 0, 40)) return false;
    if (!validateInput("apisemsemrksobt", 0, 40)) return false;
    if (!validateInput("egisemsemrksobt", 0, 30)) return false;
    if (!validateInput("dsdisemsemrksobt", 0, 40)) return false;
    if (!validateInput("pctisemsemrksobt", 0, 30)) return false;

    // labs
    if (!validateInput("aplciapmrksobt", 0, 25)) return false;
    if (!validateInput("eglciapmrksobt", 0, 25)) return false;
    if (!validateInput("dsdlciapmrksobt", 0, 25)) return false;
    if (!validateInput("pctlciapmrksobt", 0, 25)) return false;
    if (!validateInput("oopmlciapmrksobt", 0, 25)) return false;
    if (!validateInput("ew2ciapmrksobt", 0, 25)) return false;
    if (!validateInput("iksciapmrksobt", 0, 25)) return false;

    if (!validateInput("eglesepmrksobt", 0, 25)) return false;
    if (!validateInput("dsdlesepmrksobt", 0, 25)) return false;
    if (!validateInput("oopmlesepmrksobt", 0, 25)) return false;

    // ESE based on mode
    let eseMax = mode === "verification" ? 60 : 80;

    if (!validateInput("am2esemrksobt", 0, eseMax)) return false;
    if (!validateInput("apesemrksobt", 0, eseMax)) return false;
    if (!validateInput("egesemrksobt", 0, mode === "verification" ? 45 : 60)) return false;
    if (!validateInput("dsdesemrksobt", 0, eseMax)) return false;
    if (!validateInput("pctesemrksobt", 0, mode === "verification" ? 45 : 60)) return false;

    return true;
}

function calculateSGPA() {
    let mode = document.getElementById("calculationMode").value;

    if (!validateAll(mode)) return;

    document.querySelector(".Theorysubjects").style.display = "none";
    document.querySelector(".labsubjects").style.display = "none";
    document.querySelector(".calculatebutton").style.display = "none";

    document.getElementById("resultSection").style.display = "block";

    const AM2_Credits = 3;
    const AP_Credits = 3;
    const EG_Credits = 2;
    const DSD_Credits = 3;
    const PCT_Credits = 2;
    const APL_Credits = 0.5;
    const EGL_Credits = 1;
    const DSDL_Credits = 1;
    const PCTL_Credits = 0.5;
    const OOPML_Credits = 2;
    const EW2_Credits = 1;
    const IKS_Credits = 2;
    const TotalCredits = AM2_Credits + AP_Credits + EG_Credits + DSD_Credits + PCT_Credits + APL_Credits + EGL_Credits + DSDL_Credits + PCTL_Credits + OOPML_Credits + EW2_Credits + IKS_Credits;

    const APL_TotalMarks = 25;
    const EGL_TotalMarks = 50;
    const DSDL_TotalMarks = 50;
    const PCTL_TotalMarks = 25;
    const OOPML_TotalMarks = 50;
    const EW2_TotalMarks = 25;
    const IKS_TotalMarks = 25;

    let AM2_ISE_MSE_Marks = parseFloat(document.getElementById("am2isemsemrksobt").value);
    let AP_ISE_MSE_Marks = parseFloat(document.getElementById("apisemsemrksobt").value);
    let EG_ISE_MSE_Marks = parseFloat(document.getElementById("egisemsemrksobt").value);
    let DSD_ISE_MSE_Marks = parseFloat(document.getElementById("dsdisemsemrksobt").value);
    let PCT_ISE_MSE_Marks = parseFloat(document.getElementById("pctisemsemrksobt").value);

    let APL_CIAP_Marks = parseFloat(document.getElementById("aplciapmrksobt").value);
    let EGL_CIAP_Marks = parseFloat(document.getElementById("eglciapmrksobt").value);
    let DSDL_CIAP_Marks = parseFloat(document.getElementById("dsdlciapmrksobt").value);
    let PCTL_CIAP_Marks = parseFloat(document.getElementById("pctlciapmrksobt").value);
    let OOPML_CIAP_Marks = parseFloat(document.getElementById("oopmlciapmrksobt").value);
    let EW2_CIAP_Marks = parseFloat(document.getElementById("ew2ciapmrksobt").value);
    let IKS_CIAP_Marks = parseFloat(document.getElementById("iksciapmrksobt").value);

    let EGL_ESEP_Marks = parseFloat(document.getElementById("eglesepmrksobt").value);
    let DSD_ESEP_Marks = parseFloat(document.getElementById("dsdlesepmrksobt").value);
    let OOPML_ESEP_Marks = parseFloat(document.getElementById("oopmlesepmrksobt").value);

    const AM2_TotalMarks = 100;
    const AP_TotalMarks = 100;
    const EG_TotalMarks = 75;
    const DSD_TotalMarks = 100;
    const PCT_TotalMarks = 75;

    const AM2_ESETotalMarks = 80;
    const AP_ESETotalMarks = 80;
    const EG_ESETotalMarks = 60;
    const DSD_ESETotalMarks = 80;
    const PCT_ESETotalMarks = 60;

    let AM2_ScaledMarks = 60;
    let AP_ScaledMarks = 60;
    let EG_ScaledMarks = 45;
    let DSD_ScaledMarks = 60;
    let PCT_ScaledMarks = 45;

    let AM2_ESE_Marks = parseFloat(document.getElementById("am2esemrksobt").value);
    let AP_ESE_Marks = parseFloat(document.getElementById("apesemrksobt").value);
    let EG_ESE_Marks = parseFloat(document.getElementById("egesemrksobt").value);
    let DSD_ESE_Marks = parseFloat(document.getElementById("dsdesemrksobt").value);
    let PCT_ESE_Marks = parseFloat(document.getElementById("pctesemrksobt").value);

    let AM2_ScalingFactor = AM2_ScaledMarks / AM2_ESETotalMarks;
    let AP_ScalingFactor = AP_ScaledMarks / AP_ESETotalMarks;
    let EG_ScalingFactor = EG_ScaledMarks / EG_ESETotalMarks;
    let DSD_ScalingFactor = DSD_ScaledMarks / DSD_ESETotalMarks;
    let PCT_ScalingFactor = PCT_ScaledMarks / PCT_ESETotalMarks;

    let AM2_ScaledESE_Marks = AM2_ESE_Marks * AM2_ScalingFactor;
    let AP_ScaledESE_Marks = AP_ESE_Marks * AP_ScalingFactor;
    let EG_ScaledESE_Marks = EG_ESE_Marks * EG_ScalingFactor;
    let DSD_ScaledESE_Marks = DSD_ESE_Marks * DSD_ScalingFactor;
    let PCT_ScaledESE_Marks = PCT_ESE_Marks * PCT_ScalingFactor;

    if(mode === "verification") {

    AM2_ScaledMarks = 60;
    AP_ScaledMarks = 60;
    EG_ScaledMarks = 45;
    DSD_ScaledMarks = 60;
    PCT_ScaledMarks = 45;

    AM2_ESE_Marks = parseFloat(document.getElementById("am2esemrksobt").value);
    AP_ESE_Marks = parseFloat(document.getElementById("apesemrksobt").value);
    EG_ESE_Marks = parseFloat(document.getElementById("egesemrksobt").value);
    DSD_ESE_Marks = parseFloat(document.getElementById("dsdesemrksobt").value);
    PCT_ESE_Marks = parseFloat(document.getElementById("pctesemrksobt").value);

    AM2_ScaledESE_Marks = AM2_ESE_Marks;
    AP_ScaledESE_Marks = AP_ESE_Marks;
    EG_ScaledESE_Marks = EG_ESE_Marks;
    DSD_ScaledESE_Marks = DSD_ESE_Marks;
    PCT_ScaledESE_Marks = PCT_ESE_Marks;

    }

    let AM2_FinalMarks = AM2_ISE_MSE_Marks + AM2_ScaledESE_Marks;
    let AP_FinalMarks = AP_ISE_MSE_Marks + AP_ScaledESE_Marks;
    let EG_FinalMarks = EG_ISE_MSE_Marks + EG_ScaledESE_Marks;
    let DSD_FinalMarks = DSD_ISE_MSE_Marks + DSD_ScaledESE_Marks;
    let PCT_FinalMarks = PCT_ISE_MSE_Marks + PCT_ScaledESE_Marks;

    let AM2_ObtainedPercentage = (AM2_FinalMarks / AM2_TotalMarks) * 100;
    let AP_ObtainedPercentage = (AP_FinalMarks / AP_TotalMarks) * 100;
    let EG_ObtainedPercentage = (EG_FinalMarks / EG_TotalMarks) * 100;
    let DSD_ObtainedPercentage = (DSD_FinalMarks / DSD_TotalMarks) * 100;
    let PCT_ObtainedPercentage = (PCT_FinalMarks / PCT_TotalMarks) * 100;

    let AM2_GradePoint = getGradePoint(AM2_ObtainedPercentage);
    let AP_GradePoint = getGradePoint(AP_ObtainedPercentage);
    let EG_GradePoint = getGradePoint(EG_ObtainedPercentage);
    let DSD_GradePoint = getGradePoint(DSD_ObtainedPercentage);
    let PCT_GradePoint = getGradePoint(PCT_ObtainedPercentage);

    let AM2_Pointer = getPointer(AM2_ObtainedPercentage);
    let AP_Pointer = getPointer(AP_ObtainedPercentage);
    let EG_Pointer = getPointer(EG_ObtainedPercentage);
    let DSD_Pointer = getPointer(DSD_ObtainedPercentage);
    let PCT_Pointer = getPointer(PCT_ObtainedPercentage);

    let AM2_CreditsEarned = (AM2_Pointer * AM2_Credits);
    let AP_CreditsEarned = (AP_Pointer * AP_Credits);
    let EG_CreditsEarned = (EG_Pointer * EG_Credits);
    let DSD_CreditsEarned = (DSD_Pointer * DSD_Credits);
    let PCT_CreditsEarned = (PCT_Pointer * PCT_Credits);

    let APL_MarksObtained = APL_CIAP_Marks;
    let EGL_MarksObtained = EGL_CIAP_Marks + EGL_ESEP_Marks;
    let DSDL_MarksObtained = DSDL_CIAP_Marks + DSD_ESEP_Marks;
    let PCTL_MarksObtained = PCTL_CIAP_Marks;
    let OOPML_MarksObtained = OOPML_CIAP_Marks + OOPML_ESEP_Marks;
    let EW2_MarksObtained = EW2_CIAP_Marks;
    let IKS_MarksObtained = IKS_CIAP_Marks;

    let APL_Percentage = (APL_MarksObtained / APL_TotalMarks) * 100;
    let EGL_Percentage = (EGL_MarksObtained / EGL_TotalMarks) * 100;
    let DSDL_Percentage = (DSDL_MarksObtained / DSDL_TotalMarks) * 100;
    let PCTL_Percentage = (PCTL_MarksObtained / PCTL_TotalMarks) * 100;
    let OOPML_Percentage = (OOPML_MarksObtained / OOPML_TotalMarks) * 100;
    let EW2_Percentage = (EW2_MarksObtained / EW2_TotalMarks) * 100;
    let IKS_Percentage = (IKS_MarksObtained / IKS_TotalMarks) * 100;

    let APL_GradePoint = getGradePoint(APL_Percentage);
    let EGL_GradePoint = getGradePoint(EGL_Percentage);
    let DSDL_GradePoint = getGradePoint(DSDL_Percentage);
    let PCTL_GradePoint = getGradePoint(PCTL_Percentage);
    let OOPML_GradePoint = getGradePoint(OOPML_Percentage);
    let EW2_GradePoint = getGradePoint(EW2_Percentage);
    let IKS_GradePoint = getGradePoint(IKS_Percentage);

    let APL_Pointer = getPointer(APL_Percentage);
    let EGL_Pointer = getPointer(EGL_Percentage);
    let DSDL_Pointer = getPointer(DSDL_Percentage);
    let PCTL_Pointer = getPointer(PCTL_Percentage);
    let OOPML_Pointer = getPointer(OOPML_Percentage);
    let EW2_Pointer = getPointer(EW2_Percentage);
    let IKS_Pointer = getPointer(IKS_Percentage);

    let APL_CreditsEarned = (APL_Pointer * APL_Credits);
    let EGL_CreditsEarned = (EGL_Pointer * EGL_Credits);
    let DSDL_CreditsEarned = (DSDL_Pointer * DSDL_Credits);
    let PCTL_CreditsEarned = (PCTL_Pointer * PCTL_Credits);
    let OOPML_CreditsEarned = (OOPML_Pointer * OOPML_Credits);
    let EW2_CreditsEarned = (EW2_Pointer * EW2_Credits);
    let IKS_CreditsEarned = (IKS_Pointer * IKS_Credits);

    let TotalCreditsEarned = AM2_CreditsEarned + AP_CreditsEarned + EG_CreditsEarned + DSD_CreditsEarned + PCT_CreditsEarned + APL_CreditsEarned + EGL_CreditsEarned + DSDL_CreditsEarned + PCTL_CreditsEarned + OOPML_CreditsEarned + EW2_CreditsEarned + IKS_CreditsEarned;

    let SGPA = TotalCreditsEarned / TotalCredits;

    document.getElementById("resultTableBody").innerHTML = "";

    addResultRow(
        "Applied Mathematics II",
        AM2_Credits,
        AM2_GradePoint,
        AM2_Pointer,
        AM2_CreditsEarned
    );

    addResultRow(
        "Applied Physics/Chemistry",
        AP_Credits,
        AP_GradePoint,
        AP_Pointer,
        AP_CreditsEarned
    );

    addResultRow(
        "Engineering Graphics",
        EG_Credits,
        EG_GradePoint,
        EG_Pointer,
        EG_CreditsEarned
    );

    addResultRow(
        "Digital System Design",
        DSD_Credits,
        DSD_GradePoint,
        DSD_Pointer,
        DSD_CreditsEarned
    );

    addResultRow(
        "Professional Communication & Technology",
        PCT_Credits,
        PCT_GradePoint,
        PCT_Pointer,
        PCT_CreditsEarned
    );

    addResultRow(
        "Applied Physics/Chemistry Lab",
        APL_Credits,
        APL_GradePoint,
        APL_Pointer,
        APL_CreditsEarned
    );

    addResultRow(
        "Engineering Graphics Lab",
        EGL_Credits,
        EGL_GradePoint,
        EGL_Pointer,
        EGL_CreditsEarned
    );

    addResultRow(
        "Digital System Design Lab",
        DSDL_Credits,
        DSDL_GradePoint,
        DSDL_Pointer,
        DSDL_CreditsEarned
    );

    addResultRow(
        "Professional Communication & Technology Lab",
        PCTL_Credits,
        PCTL_GradePoint,
        PCTL_Pointer,
        PCTL_CreditsEarned
    );

    addResultRow(
        "Object Oriented Programming Methodology Lab",
        OOPML_Credits,
        OOPML_GradePoint,
        OOPML_Pointer,
        OOPML_CreditsEarned
    );

    addResultRow(
        "Engineering Workshop II",
        EW2_Credits,
        EW2_GradePoint,
        EW2_Pointer,
        EW2_CreditsEarned
    );

    addResultRow(
        "Indian Knowledge System",
        IKS_Credits,
        IKS_GradePoint,
        IKS_Pointer,
        IKS_CreditsEarned
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

const getQueryVariable = (variable) => {
    const query = window.location.search.substring(1);
    const pairs = query.split("&");
    for (const pair of pairs) {
        const [key, value] = pair.split("=")
        if (key === variable) {
            return value;
        }
    }
    return "";
}

const getBadgeColor = (compliance) => {
    const colors = ["red","red","orange","orange","yellow", "green"];
    const count = compliance.filter((elem) => {return elem === "1"}).length;
    return colors[count];
};

const getBadgeSymbols = (elem) => {
    const symbol_compliant = "%E2%97%8F";
    const symbol_noncompliant = "%E2%97%8B";
    if (elem === "1") {
        return symbol_compliant;
    }
    return symbol_noncompliant;
};

const setBadge = (compliance) => {
    const state = compliance.map(getBadgeSymbols).join("%20%20");
    const color = getBadgeColor(compliance);
    const src = "https:\/\/img.shields.io\/badge\/fair--software.eu-" + state + "-" + color;
    document.getElementById("badge").getElementsByTagName("img")[0].src = src;
}

const setVisibility = (compliance) => {
    const recommendations = ["repository", "license", "registry", "citation", "checklist"];
    
    for (const [i, recommendation] of recommendations.entries()) {
        if (compliance[i] === "1") {
            document.getElementById(recommendation)
                    .getElementsByClassName("compliant")[0].classList.remove("hidden")
            document.getElementById(recommendation)
                    .getElementsByClassName("noncompliant")[0].classList.add("hidden")
        } else {
            document.getElementById(recommendation)
                    .getElementsByClassName("compliant")[0].classList.add("hidden")
            document.getElementById(recommendation)
                    .getElementsByClassName("noncompliant")[0].classList.remove("hidden")
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const compliance = (getQueryVariable("compliance") + "00000").split("").slice(0, 5);
    setBadge(compliance)
    setVisibility(compliance)
})


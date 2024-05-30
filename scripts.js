document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("jewelleryForm");
    const formSteps = Array.from(form.getElementsByClassName("form-step"));
    let currentStep = 0;

    form.addEventListener("click", function (e) {
        if (e.target.classList.contains("next")) {
            if (validateStep(currentStep)) {
                goToNextStep();
            }
        } else if (e.target.classList.contains("prev")) {
            goToPreviousStep();
        }
    });

    document.getElementById("occasion").addEventListener("change", function () {
        if (this.value === "custom") {
            document.getElementById("custom-occasion").style.display = "block";
        } else {
            document.getElementById("custom-occasion").style.display = "none";
        }
    });

    document.querySelectorAll('input[name="outfitMatch"]').forEach((input) => {
        input.addEventListener("change", function () {
            if (this.value === "yes") {
                document.getElementById("outfitUpload").style.display = "block";
            } else {
                document.getElementById("outfitUpload").style.display = "none";
            }
        });
    });

    document.getElementById("outfitImage").addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("imagePreview").innerHTML = `<img src="${e.target.result}" alt="Outfit Image">`;
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            alert("Form submitted successfully!");
        }
    });

    function goToNextStep() {
        formSteps[currentStep].classList.remove("active");
        currentStep++;
        formSteps[currentStep].classList.add("active");
    }

    function goToPreviousStep() {
        formSteps[currentStep].classList.remove("active");
        currentStep--;
        formSteps[currentStep].classList.add("active");
    }

    function validateStep(stepIndex) {
        const inputs = formSteps[stepIndex].querySelectorAll("input, select");
        let valid = true;
        inputs.forEach((input) => {
            if (input.hasAttribute("required") && !input.value) {
                valid = false;
                alert("Please fill out all required fields.");
            }
        });
        return valid;
    }
});

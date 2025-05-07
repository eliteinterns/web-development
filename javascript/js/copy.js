export function setupCopyHandler() {
    const copyBtn = document.getElementById("copyInput");
    const inputCode = document.getElementById("inputCode");

    copyBtn?.addEventListener("click", () => {
        navigator.clipboard
            .writeText(inputCode.textContent)
            .then(showToast)
            .catch(console.error);
    });
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}
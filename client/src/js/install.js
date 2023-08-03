const butInstall = document.getElementById('buttonInstall');
let deferredPrompt

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block'
});

// Event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
            console.log('PWA installation accepted by the user.');
        } else {
            console.log('PWA installation dismissed by the user.');
        }

        deferredPrompt = null;

        butInstall.style.display = 'none';
    }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully on the user device.');
});
